# Design QA — Five-card carousel fan

- Source visual truth: `F:\Portfolio\765b38bffb45294a163f2a0d0f571615.jpg`
- Implementation screenshot: `F:\my_portfolio\qa-carousel-implementation.png`
- Viewport: 1772 × 1530
- State: Brand Design detail, initial five-card carousel after the folder fly-out completes
- Primary interaction tested: click the inner-right card; Olivia Carter moved to the center and the pinned fly-out layer released
- Console errors: none

## Full-view comparison evidence

The source and implementation were opened together and compared in the same review input. The implementation preserves the existing portfolio page while matching the reference carousel composition: one dominant upright center card, two overlapping inner cards, two smaller outer cards, symmetric fan rotation, descending top edges, and a shared bottom baseline.

## Focused region comparison evidence

A focused carousel-region capture was used because the reference image describes the five-card fan rather than the surrounding portfolio page. Card bounds were also measured in the rendered browser. The outer cards remain inside the carousel edges, the center card has the highest stacking level, and the two side levels use symmetric scale and rotation values.

## Required fidelity surfaces

- Fonts and typography: existing portfolio typography is intentionally retained; card titles now occupy the reference-aligned upper-left position with a readable 24px weight.
- Spacing and layout rhythm: passed. Five cards overlap in a compact fan; outer cards sit inside the layer edges; top offsets and bottom alignment follow the reference hierarchy.
- Colors and visual tokens: passed for the requested scope. Existing portrait imagery and page palette are retained while the reference's clean, borderless card treatment is preserved.
- Image quality and asset fidelity: passed. Existing full-resolution carousel images are used with cover cropping; no placeholder or generated substitute is present.
- Copy and content: passed for the requested scope. Existing carousel names remain intact and legible.

## Comparison history

1. P2 — Outer cards exceeded the carousel edge and the fan was too flat.
   - Fix: reduced horizontal step from 8.67 to 8.3 and increased scale falloff from 0.08 to 0.10.
   - Post-fix evidence: outer-left begins at 408.50px against a 401.47px layer edge; outer-right ends at 1363.50px against a 1370.53px layer edge. Both are fully visible and symmetrically inset.
2. P2 — Card titles remained at the bottom and the radius was smaller than the reference.
   - Fix: moved titles to the upper-left, added a restrained top readability fade, and increased the card radius to 40px.
   - Post-fix evidence: the final screenshot shows upper-left titles and consistent rounded corners across all five cards.

## Findings

No actionable P0, P1, or P2 mismatches remain for the requested carousel style-and-position scope.

## Follow-up polish

- P3: The reference uses illustrated game art while the portfolio intentionally retains portrait artwork; this is content-specific and not a layout mismatch.

final result: passed
