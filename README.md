# Latency IRQ Analyzer

This tool allows overlaying network latency events over normalized IRQ graphs. It allows analysis on a per-core basis.

It was specifically programmed for available tooling at the [Chair of Network Architectures and Services](https://net.in.tum.de/homepage/) at TUM.

**[live deployment](https://latency-irq-analyzer.pages.dev/)**

## Usage

1. Select an irqrecorder csv file
2. Optional: select a latency file. Can be a 5000 worst-case one, but the tool will accept any zstd compressed csv with the same table layout.

## Building/running locally

Requirements: pnpm, nodejs18+

```bash
pnpm install
pnpm run dev # starts the dev server
pnpm run build # builds the production version
```

## Contribution

I'll gladly accept any contributions. In case something's broken, let me know! There's CI in place; any commit to the main branch is automatically deployed.
