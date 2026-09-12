const targets = [
  { name: 'catalogue', url: 'https://api.meridianapi.io/v1/catalog/coverage', status: 200 },
  { name: 'reference-page', url: 'https://meridianapi.io/catalog/UNRATE', status: 200 },
  { name: 'public-observations', url: 'https://api.meridianapi.io/v1/series/UNRATE', status: 200 },
  { name: 'mcp-auth-required', url: 'https://api.meridianapi.io/mcp', method: 'POST', status: 401 },
  { name: 'official-registry', url: 'https://registry.modelcontextprotocol.io/v0.1/servers?search=io.meridianapi%2Fmeridian', status: 200 },
];
const checks = [];
for (const target of targets) {
  const start = performance.now();
  try {
    const response = await fetch(target.url, { method: target.method ?? 'GET', signal: AbortSignal.timeout(20000) });
    let valid = response.status === target.status;
    if (target.name === 'official-registry' && valid) {
      const body = await response.json();
      valid = Array.isArray(body.servers) && body.servers.some(entry => entry.server?.name === 'io.meridianapi/meridian');
    }
    if (target.name === 'reference-page' && valid) {
      const body = await response.text();
      valid = body.includes('US unemployment rate') && body.includes('Dataset') && body.includes('Observation date');
    }
    checks.push({ name: target.name, status: response.status, expectedStatus: target.status, valid, elapsedMs: Math.round(performance.now() - start) });
  } catch (error) {
    checks.push({ name: target.name, valid: false, error: error instanceof Error ? error.name : 'RequestError', elapsedMs: Math.round(performance.now() - start) });
  }
}
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checks, note: 'Availability samples, not traffic, conversion or an SLA.' }, null, 2));
if (checks.some(check => !check.valid)) process.exitCode = 1;
