import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchSeries } from './macro-briefing.mjs';

test('preserves date and units, ignores missing values', async () => {
  const result = await fetchSeries('UNRATE', async () => ({
    ok: true, json: async () => ({ id: 'UNRATE', units: 'Percent', source: 'FRED', observations: [{date:'2026-07-01',value:4.2},{date:'2026-08-01',value:null}] }),
  }));
  assert.equal(result.date, '2026-07-01');
  assert.equal(result.units, 'Percent');
});
test('fails explicitly on errors and empty data', async () => {
  await assert.rejects(fetchSeries('UNRATE', async () => ({ ok:false, status:503 })), /503/);
  await assert.rejects(fetchSeries('UNRATE', async () => ({ ok:true, json:async()=>({id:'UNRATE',units:'Percent',observations:[]}) })), /No observations/);
});
test('does not interpolate arbitrary paths', async () => {
  await assert.rejects(fetchSeries('../private'), /Invalid series ID/);
});
