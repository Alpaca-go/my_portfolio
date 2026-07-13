# Design QA — Brand detail title region

- Source visual truth: `C:\Users\Administrator\AppData\Local\Temp\codex-clipboard-998c8f8d-aad8-402c-b807-49c166489053.png`
- Paper reference: `C:\Users\Administrator\Desktop\title.jsx`
- Final implementation screenshot: `F:\my_portfolio\qa-title-final.png`
- Final side-by-side comparison: `F:\my_portfolio\qa-title-comparison-final.png`
- Viewport: 2560 × 1360; comparison crop is the 2560 × 650 title region below the 80px Topbar
- State: Brand Design detail page after the folder-to-carousel transition

## Full-view comparison evidence

The supplied PNG is a transparent 2560 × 1280 title-layer export. It was composited over the implementation page background and compared beside the browser-rendered title crop. The carousel was excluded from the comparison crop because the requested scope explicitly says not to change it.

## Focused-region comparison evidence

Focused pixel-bound measurements were used for all four title layers. In the final capture their visible bounds match the PNG:

- English title: 600 × 95px at x=983, y=306
- Chinese title: 202 × 51px at x=1184, y=448
- Gradient pill: 306 × 36px at x=1130, y=527
- English caption: 331 × 15px at x=1118, y=576

## Required fidelity surfaces

- Fonts and typography: Zona Pro and HarmonyOS Sans project fonts are retained. Optical width and font-metric offsets were calibrated against the PNG.
- Spacing and layout rhythm: English title, localized title, pill, and caption match the source center axis and measured vertical positions.
- Colors and visual tokens: `#111111`, `#000000`, `#6e6e6e`, and the existing purple gradient match the supplied source/Paper reference.
- Image quality and asset fidelity: no raster imagery is present in the scoped title region; the supplied PNG was used only as visual truth, not substituted into the UI.
- Copy and content: “Brand Design”, “品牌设计”, “让品牌拥有清晰的视觉语言”, and “Turning ideas into memorable visual identities” match the source.

## Comparison history

### Pass 1 — blocked

- P1: The previous implementation omitted the English “Brand Design” layer and included an unrelated project counter.
- P2: The remaining title layers used different hierarchy, widths, weights, and vertical spacing.
- Fix: introduced `DetailTitleBlock`, restored the four source layers, removed the counter, and applied the Paper layer structure.
- Evidence: `F:\my_portfolio\qa-title-comparison-pass1.png`.

### Pass 2 — blocked

- P2: English title was 13px wider and 8px lower than the PNG; Chinese title was 3px lower and 3px taller; caption was 10px wider.
- Fix: calibrated horizontal optical scales, font weight, local group offset, and individual baselines.
- Evidence: `F:\my_portfolio\qa-title-comparison-pass2.png`.

### Pass 3 — blocked

- P2: English title, pill, and caption matched; Chinese title retained a 1px baseline mismatch.
- Fix: moved only the Chinese title baseline by 1px without changing flow or the carousel.
- Evidence: `F:\my_portfolio\qa-title-pass3.png`.

### Final pass — passed

- No actionable P0, P1, or P2 differences remain in the scoped title region.
- Browser checks: title visible, carousel still visible, return-button hover still reaches `rgb(101, 28, 209)`, and no console or page errors were recorded.
- Build: `npm run build` passed.

## Findings

No actionable mismatches remain. The final side-by-side comparison and pixel-bound measurements agree on layout, typography bounds, color treatment, spacing, and copy.

## Follow-up polish

None required for the requested title-only scope.

final result: passed
