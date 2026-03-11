# 🛰️ Meridian MCP Server

**Structured macroeconomic data for AI agents.**

55 U.S. economic series from FRED with z-scores, percentile ranks, regime classification, and historical comparisons. No more hallucinated economic data.

## Quick Start

Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "meridian": {
      "url": "https://api.meridianapi.io/sse"
    }
  }
}
```

Then ask: *"How's the US economy doing?"*

## Tools

| Tool | Description |
|------|------------|
| `get_macro_snapshot` | Current macro indicators with z-scores, percentiles, regime classification |
| `explain_macro_change` | What changed in an indicator over a period |
| `compare_macro_regimes` | Compare today to 2008, COVID, 1970s stagflation, etc. |

## Coverage

55 series across 12 categories: GDP, inflation, employment, interest rates, yield curves, markets (S&P 500, NASDAQ, VIX), commodities (oil, gas), FX, housing, trade, fiscal, and credit.

## Pricing

| Tier | Price | Requests/mo |
|------|-------|------------|
| Free | $0 | 1,000 |
| Pro | $49 | 50,000 |
| Enterprise | $299 | Unlimited |

## Links

- 🌐 [meridianapi.io](https://meridianapi.io)
- 📖 [Docs](https://meridianapi.io/docs)
- 💰 [Pricing](https://meridianapi.io/pricing)
- 📝 [Sign Up](https://meridianapi.io/signup)

## License

This is a hosted MCP server. Connect via the SSE endpoint above.
