import React from "react";

const galleryColumns = [
  [
    { src: "/assets/jointown-detail/gift-set.png", alt: "Jointown Aesthetics gift packaging", height: 296 },
    { pair: [
      { src: "/assets/jointown-detail/business-cards.png", alt: "Jointown Aesthetics business cards" },
      { src: "/assets/jointown-detail/handbag.png", alt: "Jointown Aesthetics handbag" }
    ] },
    { src: "/assets/jointown-detail/wayfinding.png", alt: "Jointown Aesthetics wayfinding system", height: 167 }
  ],
  [
    { src: "/assets/jointown-detail/brand-overview.png", alt: "Jointown Aesthetics brand overview", height: 171 },
    { src: "/assets/jointown-detail/logo-silk.png", alt: "Jointown Aesthetics logo on silk", height: 285 },
    { src: "/assets/jointown-detail/color-palette.png", alt: "Jointown Aesthetics color palette", height: 227 }
  ],
  [
    { src: "/assets/jointown-detail/logo-combination.png", alt: "Jointown Aesthetics logo combinations", height: 171 },
    { feature: true },
    { src: "/assets/jointown-detail/storefront.png", alt: "Jointown Aesthetics storefront", height: 227 }
  ]
];

const tileDelayBySrc = {
  "/assets/jointown-detail/gift-set.png": 760,
  "/assets/jointown-detail/business-cards.png": 1110,
  "/assets/jointown-detail/handbag.png": 850,
  "/assets/jointown-detail/wayfinding.png": 1260,
  "/assets/jointown-detail/brand-overview.png": 920,
  "/assets/jointown-detail/logo-silk.png": 1180,
  "/assets/jointown-detail/color-palette.png": 810,
  "/assets/jointown-detail/logo-combination.png": 1040,
  "/assets/jointown-detail/symbol-grid.png": 1340,
  "/assets/jointown-detail/typography.png": 970,
  "/assets/jointown-detail/peacock-violet.png": 1210,
  "/assets/jointown-detail/storefront.png": 880
};

function ArrowIcon({ direction }) {
  const path = direction === "left"
    ? "m275-450 147 147q9 9 8.5 21t-9.5 21q-9 9-21 9t-21-9L181-459q-9-9-9-21t9-21l199-199q9-9 21-9t21 9q9 9 9 21.5t-9 21.5L275-510h496q13 0 21.5 8.5T801-480q0 13-8.5 21.5T771-450H275Z"
    : "M685-452H190q-13 0-21.5-8.5T160-482q0-13 8.5-21.5T190-512h495L537-660q-9-9-8.5-21t9.5-21q9-9 21-9t21 9l199 199q5 5 7 10t2 11q0 6-2 11t-7 10L581-263q-9 9-21 9t-21-9q-9-9-9-21.5t9-21.5l146-146Z";

  return <svg viewBox="0 -960 960 960" aria-hidden="true"><path d={path} fill="currentColor" /></svg>;
}

function CloseIcon() {
  return (
    <svg viewBox="16 16 32 32" aria-hidden="true">
      <path transform="translate(20.39 -17.23) rotate(45)" d="M64.023 26.6L22.018 26.608" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path transform="translate(109.49 5.39) rotate(135)" d="M94.605 35.986L52.601 35.977" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DetailHeader({ onBack }) {
  return (
    <header className="jointown-detail__header">
      <div className="jointown-detail__header-group">
        <div className="jointown-detail__designer" aria-label="Designer Kyries"><span>Designer</span><span>Kyries.</span></div>
        <nav className="jointown-detail__categories" aria-label="Project categories">
          <button className="is-active" type="button">品牌设计</button>
          <button type="button">包装设计</button>
          <button type="button">IP 设计</button>
        </nav>
      </div>
      <button className="jointown-detail__close" type="button" aria-label="Close project detail" onClick={onBack}><CloseIcon /></button>
    </header>
  );
}

function GalleryImage({ src, alt, height, className = "" }) {
  const style = {
    "--tile-delay": `${tileDelayBySrc[src] ?? 900}ms`,
    ...(height ? { height: `${height}px` } : {})
  };

  return (
    <div className={`jointown-detail__tile ${className}`} style={style}>
      <img src={src} alt={alt} loading="eager" decoding="sync" fetchPriority="high" />
    </div>
  );
}

function FeatureGroup() {
  return (
    <div className="jointown-detail__feature-group">
      <GalleryImage className="jointown-detail__symbol" src="/assets/jointown-detail/symbol-grid.png" alt="Jointown Aesthetics symbol construction" />
      <div className="jointown-detail__feature-stack">
        <GalleryImage src="/assets/jointown-detail/typography.png" alt="Jointown Aesthetics typography" height={159} />
        <GalleryImage src="/assets/jointown-detail/peacock-violet.png" alt="Peacock Violet brand graphic" height={118} />
      </div>
    </div>
  );
}

function DetailGallery() {
  return (
    <div className="jointown-detail__gallery" aria-label="Jointown Aesthetics project gallery">
      {galleryColumns.map((column, columnIndex) => (
        <div className="jointown-detail__column" key={columnIndex}>
          {column.map((item, itemIndex) => {
            if (item.pair) {
              return <div className="jointown-detail__pair" key={itemIndex}>{item.pair.map((child) => <GalleryImage {...child} key={child.src} />)}</div>;
            }
            if (item.feature) return <FeatureGroup key={itemIndex} />;
            return <GalleryImage {...item} key={item.src} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default function JointownDetailPage({ onBack, isClosing = false, isEntering = false }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className={`jointown-detail ${isReady ? "is-ready" : ""} ${isEntering ? "is-entering" : ""} ${isClosing ? "is-closing" : ""}`} aria-label="Jointown Aesthetics brand detail">
      <div className="jointown-detail__hero" aria-hidden="true">
        <img src="/assets/brand-carousel-44-light.png" alt="" decoding="sync" fetchPriority="high" />
      </div>
      <div className="jointown-detail__inner">
        <DetailHeader onBack={onBack} />
        <section className="jointown-detail__body" aria-label="Project overview">
          <div className="jointown-detail__summary">
            <div className="jointown-detail__title-block">
              <span className="jointown-detail__pill">轻医美</span>
              <h1><span>九州通·九州美学</span><span>品牌设计</span></h1>
            </div>
            <div className="jointown-detail__description-row">
              <p>以孔雀羽翼融合数字光感，塑造精致、科技、温柔并存的轻医美品牌形象。<br />整体视觉强调高级质感与女性优雅气质，传递专业、信任与温度。</p>
              <nav className="jointown-detail__project-nav" aria-label="Project navigation">
                <button type="button" aria-label="Back to carousel" onClick={onBack}><ArrowIcon direction="left" /></button>
                <button type="button" aria-label="Next project" disabled><ArrowIcon direction="right" /></button>
              </nav>
            </div>
          </div>
          <DetailGallery />
        </section>
      </div>
    </main>
  );
}
