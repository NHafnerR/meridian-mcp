# Meridian MCP Server

Curated macroeconomic and market context for AI agents through a remote MCP server and REST API.

This public repository contains connection metadata and runnable examples, not the private backend. Inspect the [live catalogue](https://meridianapi.io/catalog) for stored series, sources, dates and operational health. Coverage spans FRED, ECB, Eurostat, OECD, IMF, World Bank, Treasury, EIA and selected Yahoo Finance market series.

## Connect

Create a free API key in [Account](https://meridianapi.io/account). For remote MCP clients that support Authorization headers:

```json
{
  "mcpServers": {
    "meridian": {
      "url": "https://api.meridianapi.io/mcp",
      "headers": { "Authorization": "Bearer <MERIDIAN_API_KEY>" }
    }
  }
}
```

Streamable HTTP is the preferred transport. Legacy SSE remains at https://api.meridianapi.io/sse.
Client configuration formats vary; OAuth-only clients cannot use this API-key configuration.
Never commit a real key or put it in a URL.

Free keys can call `get_macro_snapshot` and `ask_meridian`. Paid plans also include:
`explain_macro_change`, `compare_macro_regimes`, `search_series`, `get_series_history`,
`compare_indicators`, `get_dashboard_summary`, `get_data_health`,
`get_series_metadata` and `build_chart_spec`.

## Runnable Examples

No Meridian npm or PyPI package is required or currently advertised as published.

```bash
node examples/macro-briefing.mjs
python3 examples/macro_briefing.py
```

Both examples retrieve recent unemployment, CPI and policy-rate observations from public endpoints.
They print observation dates and units, not an invented forecast or investment recommendation.
Public detail endpoints return up to 20 recent observations; authenticated deeper-history tools require a paid plan.

```bash
npm test
```

## Pricing

| Plan | Monthly price | Monthly requests |
| --- | --- | --- |
| Free | $0 | 1,000 |
| Pro | $49 | 50,000 |
| Enterprise | $299 | 500,000 |

The plan name Enterprise does not certify an SLA or redistribution rights. See [current pricing](https://meridianapi.io/pricing) and [documentation](https://meridianapi.io/docs).

## Data Trust

Observation date is not publication date. Source values may be revised.
IMF DataMapper values do not include a reliable actual/estimate boundary in the current connector.
Future periods are labelled forecasts; historical IMF values remain explicitly unclassified.
Redistribution rights depend on the original source; MIT licensing of these examples does not license the underlying data.

## Discovery

The canonical remote-server metadata is [server.json](server.json), with registry identity `io.meridianapi/meridian`.
A previous Glama badge link returned 404 on 2026-09-13 and has been removed; this repository does not claim an accepted directory listing without verification.

## License

The examples and connection metadata in this repository use the existing MIT licensing designation.
Underlying datasets retain their own source terms.
