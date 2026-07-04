import React from "react";

const topTiles = [
  { className: "brand-detail__tile", style: { width: 225, height: 280 } },
  { className: "brand-detail__tile", style: { width: 225, height: 280 } },
  { className: "brand-detail__tile", style: { width: 460, height: 280 } },
  { className: "brand-detail__tile", style: { width: 225, height: 280 } },
  { className: "brand-detail__tile-stack", children: [135, 135] }
];

const bottomTiles = [
  { width: 225 },
  { width: 303 },
  { width: 186 },
  { width: 186 },
  { width: 225 },
  { width: 225 }
];

function BackgroundGrid() {
  return (
    <div className="brand-detail__grid" aria-hidden="true">
      <div className="brand-detail__grid-row">
        {topTiles.map((tile, index) => (
          tile.children ? (
            <div className={tile.className} key={index}>
              {tile.children.map((height, childIndex) => (
                <div className="brand-detail__tile brand-detail__tile-small" style={{ height }} key={childIndex} />
              ))}
            </div>
          ) : (
            <div className={tile.className} style={tile.style} key={index} />
          )
        ))}
      </div>
      <div className="brand-detail__grid-row">
        <div className="brand-detail__tile-stack">
          <div className="brand-detail__tile brand-detail__tile-small" />
          <div className="brand-detail__tile brand-detail__tile-small" />
        </div>
        <div className="brand-detail__tile" style={{ width: 225, height: 280 }} />
        <div className="brand-detail__tile" style={{ width: 460, height: 280 }} />
        <div className="brand-detail__tile" style={{ width: 460, height: 280 }} />
      </div>
      <div className="brand-detail__grid-row">
        {bottomTiles.map((tile, index) => (
          <div className="brand-detail__tile" style={{ width: tile.width, height: 280 }} key={index} />
        ))}
      </div>
    </div>
  );
}

function FanCards() {
  return (
    <div className="brand-detail__fan" aria-hidden="true">
      <div className="brand-detail__fan-layer brand-detail__fan-layer--outer">
        <div className="brand-detail__fan-card brand-detail__fan-card--edge brand-detail__fan-card--outer-left" data-fan-slot="outer-left" />
        <div className="brand-detail__fan-card brand-detail__fan-card--edge brand-detail__fan-card--outer-right" data-fan-slot="outer-right" />
      </div>
      <div className="brand-detail__fan-layer brand-detail__fan-layer--inner">
        <div className="brand-detail__fan-card brand-detail__fan-card--motion-target brand-detail__fan-card--inner-left" data-fan-slot="inner-left" />
        <div className="brand-detail__fan-card brand-detail__fan-card--motion-target brand-detail__fan-card--inner-right" data-fan-slot="inner-right" />
      </div>
      <div className="brand-detail__fan-card brand-detail__fan-card--motion-target brand-detail__fan-card--center" data-fan-slot="center" />
    </div>
  );
}

function ArrowButton({ direction }) {
  const path = direction === "left"
    ? "m368-480 315 315q11 11 11 27.5T683-109q-12 12-28.5 12T626-109L297-438q-9-9-13-20t-4-22q0-11 4-22t13-20l330-330q12-12 28-11.5t28 12.5q11 12 11.5 28T683-795L368-480Z"
    : "M591-482 276-797q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l329 329q9 9 13 20t4 22q0 11-4 22t-13 20L332-110q-12 12-28 11.5T276-111q-11-12-11.5-28t11.5-28l315-315Z";

  return (
    <button className={`brand-detail__arrow brand-detail__arrow--${direction}`} aria-label={direction === "left" ? "Previous" : "Next"}>
      <svg viewBox="0 -960 960 960" aria-hidden="true">
        <path d={path} fill="#fff" />
      </svg>
    </button>
  );
}

export default function BrandDetailPage({ isVisible = true, isClosing = false, isCardTransitioning = false, onBack }) {
  const classes = [
    "brand-detail",
    isVisible ? "is-visible" : "",
    isClosing ? "is-closing" : "",
    isCardTransitioning ? "is-card-transitioning" : ""
  ].filter(Boolean).join(" ");

  return (
    <main className={classes} aria-hidden={!isVisible}>
      <BackgroundGrid />
      <div className="brand-detail__veil" />
      <section className="brand-detail__content" aria-label="品牌设计">
        <FanCards />
        <ArrowButton direction="left" />
        <ArrowButton direction="right" />
        <div className="brand-detail__copy">
          <h1>品牌设计</h1>
          <div className="brand-detail__pill">让品牌拥有清晰的视觉语言</div>
          <p>Turning ideas into memorable visual identities</p>
        </div>
        <button className="brand-detail__down" aria-label="Back to home" onClick={onBack}>
          <svg viewBox="0 -960 960 960" aria-hidden="true">
            <path d="M450-274v-496q0-13 8.5-21.5T480-800q13 0 21.5 8.5T510-770v496l227-227q9-9 21-9t21 9q9 9 9 21t-9 21L501-181q-5 5-10 7t-11 2q-6 0-11-2t-10-7L181-459q-9-9-9-21t9-21q9-9 21-9t21 9l227 227Z" fill="#fff" />
          </svg>
        </button>
      </section>
    </main>
  );
}
