import { pathToFileURL } from 'node:url';

export async function fetchSeries(id, fetcher = fetch) {
  if (!/^[A-Z0-9:_-]{1,128}$/.test(id)) throw new Error('Invalid series ID');
  const response = await fetcher('https://api.meridianapi.io/v1/series/' + encodeURIComponent(id), {
    headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Meridian returned HTTP ' + response.status);
  const series = await response.json();
  if (series?.id !== id || typeof series.units !== 'string' || !Array.isArray(series.observations)) throw new Error('Invalid series response');
  const latest = series.observations.filter(point => typeof point.date === 'string' && Number.isFinite(point.value)).sort((a,b) => a.date.localeCompare(b.date)).at(-1);
  if (!latest) throw new Error('No observations for ' + id);
  return { id, source: series.source, units: series.units, ...latest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    for (const id of ['UNRATE', 'CPIAUCSL', 'FEDFUNDS']) console.log(JSON.stringify(await fetchSeries(id)));
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Request failed');
    process.exitCode = 1;
  }
}
