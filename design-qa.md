# Design QA

- source visual truth path: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-f2b81d08-0f57-45ba-9e20-e6678190e3f3.png`
- implementation screenshot path: `F:/my_portfolio/iteration-3.png`
- viewport: `2560x1280`
- state: `default static first screen`
- comparison method: rendered the current React source through a temporary esbuild preview, captured the page at the same viewport, then compared visible regions and pixel-scanned key color/contrast bounds.

**Measured Alignment**

- Portfolio black body:
  - reference: `x=860..1705`, `y=373..497`
  - implementation: `x=860..1702`, `y=373..495`
- Top purple badge row:
  - reference: `y≈254..290`
  - implementation: `y≈254`
- Orange badge row:
  - reference: `y≈291..318`
  - implementation DOM frame starts at `y=278`, visible row aligns below caption.
- Yellow badge row:
  - reference: `y≈540..567`
  - implementation DOM frame starts at `y=527`, visible row aligns below caption.
- Green badge row:
  - reference: `y≈559..586`
  - implementation DOM frame starts at `y=546`, visible row aligns below caption.
- Folder card:
  - reference: purple folder begins at `x≈1030`, `y≈920`
  - implementation DOM frame: `x=1030`, `y=920`, `width=500`, `height=544`

**Changes Verified**

- Shifted the Portfolio wordmark down from the earlier source position to match the reference black-title body.
- Repositioned the four badge groups around the wordmark using the reference screenshot's visible color bounds.
- Moved the folder card lower so only the upper portion appears in the first viewport, matching the provided composition.
- Added `.portfolio-wordmark img` sizing so the SVG asset reliably fills the intended frame.

**Build Note**

- `vite build` could not complete in this environment because the only available shell Node runtime is `18.20.2`, while Vite 7 requires Node `20.19+` or `22.12+`. Visual verification was completed with a temporary esbuild preview using the same source files.

final result: passed
