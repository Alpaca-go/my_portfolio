# Design QA

- source visual truth path: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-b887f0fd-cf7b-4f33-8d73-3b05e35e4e0d.png`
- implementation screenshot path: `F:/my_portfolio/brand-center-card-pass3.png`
- viewport: browser CSS viewport `2560x1280`; captured PNG is `3200x1600` because the in-app browser reports `devicePixelRatio=0.8`
- state: home page opened, Brand Design folder clicked, expanded carousel showing `brand-44` as the center card
- full-view comparison evidence: `F:/my_portfolio/brand-center-card-pass3.png`
- focused region comparison evidence: `F:/my_portfolio/brand-center-card-comparison-pass3.png`

**Findings**

- No actionable P0/P1/P2 mismatches remain for the requested center carousel card.
- Residual P3: the full opened carousel still includes the product page context around the center card (side cards, arrows, background grid, section title). The supplied PNG is an isolated card inspection frame, so final acceptance was judged on the center-card crop.

**Required Fidelity Surfaces**

- Fonts and typography: center-card title/subtitle use `HarmonyOS Sans`, `24px`, `line-height: 1`, `letter-spacing: -0.05em`; pass 2 increased weight to `500` to better match the PNG stroke density.
- Spacing and layout rhythm: outer card renders at `380x471`, positioned at `x=1090`, `y=302`; media layer renders at `360x360`, positioned at `x=1100`, `y=312`, matching the Paper geometry.
- Colors and visual tokens: background `#f7f7f7`, media background `#f6f6f6`, white media border, lavender action circle, purple badge gradient, and lavender shadow match the supplied visual direction.
- Image quality and asset fidelity: the center artwork uses the Paper-provided PNG saved as `public/assets/brand-carousel-44-detail.png`; no placeholder imagery is used.
- Copy and content: center card copy matches the PNG: `轻医美`, `九州通·九州美学`, `品牌设计`.

**Patches Made Since Previous QA Pass**

- Pass 1: added a dedicated center-card component structure with outer card frame, media crop, badge, bottom text, and circular arrow.
- Pass 2: tuned bottom text weight and action-button lavender color after the first browser screenshot comparison.
- Pass 3: added metadata for all carousel cards so the new center-card bottom layer stays correct when users navigate the carousel.

final result: passed
