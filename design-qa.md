# Design QA — 九州通详情页

- source visual truth path: `F:/my_portfolio/qa-artifacts/jointown-source.png`
- implementation screenshot path: `F:/my_portfolio/qa-artifacts/jointown-final.png`
- viewport: fixed application canvas `2560x1280`; in-app browser capture normalized from its reported `devicePixelRatio=0.297`
- state: Brand Design folder expanded, `brand-44` selected, center card clicked, Jointown Aesthetics detail page visible
- full-view comparison evidence: `F:/my_portfolio/qa-artifacts/jointown-comparison-final.png`
- focused region comparison evidence: `F:/my_portfolio/qa-artifacts/jointown-top-comparison-final.png`

**Findings**

- No actionable P0/P1/P2 visual mismatches remain.
- No gallery placeholders remain; all 12 Paper-provided image assets are present and use the supplied crops.
- Residual P3: raster antialiasing differs slightly between the supplied PNG export and the in-app browser capture, but component geometry, type hierarchy, imagery, colors, radii, and spacing align.

**Required Fidelity Surfaces**

- Fonts and typography: local `Zona Pro` is used for the designer mark; local `HarmonyOS Sans` is used for Chinese navigation, the `78px/700` project title, `24px` pill, and `24px/300/1.6` description. Line wrapping and two-line title structure match the source.
- Spacing and layout rhythm: fixed `2560x1280` page; `1800px` visual field centered with `380px` side insets; `1720px` content width; three `568px` gallery columns with `8px` gaps; `12px` tile radii; header, summary, navigation, and gallery align to the Paper geometry.
- Colors and visual tokens: page fill `#FBF9FF`, pill/border `#896EEB`, black typography, 75% black description, translucent close control, and transparent outlined navigation buttons match the source.
- Image quality and asset fidelity: hero uses the user-provided `01.png`; all gallery images use Paper-provided original PNGs with their exported aspect ratios and `object-fit: cover`. No generated or placeholder imagery is used.
- Copy and content: Chinese title, category names, pill, and two-line description match the visual source.

**Interaction Verification**

- The center `brand-44` card exposes a button role, keyboard focus, and click route to the detail page.
- The separate bottom-right card arrow routes to the same detail page and has a `#5837BD` hover/focus state.
- The selected card artwork morphs from `360x360 @ (1100,312)` to the detail hero target `1800x1280 @ (380,0)`, including border-radius and crop handoff.
- Upper-page elements use ordered fade-up delays from `100ms` through `640ms`; the 12 gallery tiles use a fixed shuffled delay set from `760ms` through `1340ms`.
- The detail close control and lower-left project navigation button return to the carousel.
- Browser console errors and warnings: none.

**Comparison History**

- Pass 1 (`jointown-comparison-pass1.png`): found a P2 hero focal-point drift; the woman/peacock composition sat approximately 6–8px too far right. Fixed the hero background position from centered to `calc(50% - 8px) 50%`.
- Pass 2 (`jointown-comparison-pass2.png`): visual P0/P1/P2 issues were cleared, but interaction testing found a P1 missing callback on the center card body. Passed `onJointownOpen` through the fan-card component and raised the center frame to `z-index: 11` so its arrow owns the hover/click hit area above carousel hit zones.
- Final (`jointown-comparison-final.png`): source and implementation align across the full view and focused top region; center-card entry, arrow entry, close, and return navigation all work.

**Follow-up Polish**

- P3 only: native browser font/raster antialiasing may vary slightly by display scaling.

final result: passed
