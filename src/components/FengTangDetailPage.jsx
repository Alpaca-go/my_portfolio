import React from "react";
import FengTangGrid from "./FengTangGrid";

function DetailNavButton({ direction, onClick, disabled = false }) {
  const path = direction === "left"
    ? "m275-450 147 147q9 9 8.5 21t-9.5 21q-9 9-21 9t-21-9L181-459q-9-9-9-21t9-21l199-199q9-9 21-9t21 9q9 9 9 21.5t-9 21.5L275-510h496q13 0 21.5 8.5T801-480q0 13-8.5 21.5T771-450H275Z"
    : "M685-452H190q-13 0-21.5-8.5T160-482q0-13 8.5-21.5T190-512h495L537-660q-9-9-8.5-21t9.5-21q9-9 21-9t21 9l199 199q5 5 7 10t2 11q0 6-2 11t-7 10L581-263q-9 9-21 9t-21-9q-9-9-9-21.5t9-21.5l146-146Z";

  return (
    <button
      className={`feng-detail__nav-button feng-detail__nav-button--${direction}`}
      type="button"
      aria-label={direction === "left" ? "Back to carousel" : "Next project"}
      onClick={onClick}
      disabled={disabled}
    >
      <svg viewBox="0 -960 960 960" aria-hidden="true">
        <path d={path} fill="#000" />
      </svg>
    </button>
  );
}

export default function FengTangDetailPage({ onBack }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className={`feng-detail ${isReady ? "is-ready" : ""}`} aria-label="Chudao brand detail">
      <FengTangGrid className="feng-grid--detail" />
      <section className="feng-detail__copy" aria-label="Project summary">
        <div className="feng-detail__title-block">
          <div className="feng-detail__title-row">
            <h1 className="feng-detail__title">厨道湘菜</h1>
            <span className="feng-detail__pill">餐饮</span>
          </div>
          <h2 className="feng-detail__title">品牌设计</h2>
        </div>
        <p className="feng-detail__description">
          围绕湘菜头牌与传统技法，结合木色、辣椒与菜品影像，呈现地道浓郁的湖湘风味。
        </p>
      </section>
      <nav className="feng-detail__nav" aria-label="Project navigation">
        <DetailNavButton direction="left" onClick={onBack} />
        <DetailNavButton direction="right" disabled />
      </nav>
    </main>
  );
}
