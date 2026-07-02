# Design QA

- source visual truth path: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-ffd64e8f-e256-4f17-8679-aa2a14ca0e13.png`
- implementation screenshot path: `F:/my_portfolio/iteration-2.png`
- viewport: `2560x1280`
- state: `default static first screen`
- full-view comparison evidence: compared the provided PNG against `iteration-1.png`, then against `iteration-2.png` after patching component geometry and assets.
- focused region comparison evidence: checked three regions separately during the pass: top header, central wordmark plus four badges, and bottom folder card. No extra crop files were needed because those regions are clearly readable in the full screenshot.

**Findings**
- [P3] Font fallback differs slightly from the source export
  Location: header small caps, badge captions, folder card English subtitle.
  Evidence: the PNG appears to use Zona Pro and HarmonyOS Sans SC; the implementation uses `Montserrat`, `Outfit`, and `Noto Sans SC` as closest available web fonts.
  Impact: letter shape and spacing are slightly different, but layout hierarchy and spacing remain aligned.
  Fix: if the exact commercial fonts are available later, swap them in without changing geometry tokens.

**Open Questions**
- The provided materials included one source PNG and the Paper-exported React/CSS with remote image URLs. I localized those four Paper badge assets into `public/assets` and used the exported vector paths for the wordmark and folder shape because no separate SVG cut files were provided.

**Implementation Checklist**
- Localize Paper badge images and remove remote runtime dependency.
- Rebuild the page as components: `Header`, `FeatureBadge`, `PortfolioWordmark`, `FolderCard`.
- Lock the canvas to `2560x1280` and keep absolute composition.
- Run screenshot pass 1, compare against source, patch typography scale and card geometry.
- Run screenshot pass 2, compare again, patch SVG folder/arrow assets and exact export dimensions.

**Follow-up Polish**
- If you provide the exact exported font files, I can remove the remaining P3 typography drift.

## Patches made since the previous QA pass

- Pass 1 to Pass 2:
  - reduced header and badge caption typography to the export scale
  - aligned badge positions to the Paper export geometry
  - replaced CSS-drawn folder silhouette with the exported SVG path
  - replaced the text arrow with the exported vector arrow
  - matched folder sheets, shadows, and tag sizing to the export values

final result: passed
