import React from "react";
import FengTangGrid from "./FengTangGrid";

const carouselCards = [
  { key: "brand-16", number: "01", image: "/assets/brand-carousel-16.png", alt: "Chudao Xiang cuisine brand design" },
  { key: "brand-32", number: "02", image: "/assets/brand-carousel-32.png", alt: "Yi Ji Liang Fang brand design" },
  { key: "brand-44", number: "03", image: "/assets/brand-carousel-44.png", alt: "Jointown Aesthetics brand design" },
  { key: "brand-58", number: "04", image: "/assets/brand-carousel-58.png", alt: "Ming Ji Tang brand design" },
  { key: "brand-83", number: "05", image: "/assets/brand-carousel-83.png", alt: "WOW YEAH brand design" },
  { key: "brand-05", number: "06", image: "/assets/brand-carousel-05.png", alt: "668 spicy shrimp brand design" },
  { key: "brand-71", number: "07", image: "/assets/brand-carousel-71.png", alt: "Feng Tang Tang brand design" }
];

const fanSlots = [
  "off-left",
  "outer-left",
  "inner-left",
  "center",
  "inner-right",
  "outer-right",
  "off-right"
];

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

function getWrappedCard(index) {
  return carouselCards[((index % carouselCards.length) + carouselCards.length) % carouselCards.length];
}

function getSlotForVirtualIndex(virtualIndex, activeIndex) {
  return fanSlots[virtualIndex - activeIndex + 3];
}

function FanCard({ virtualIndex, activeIndex, onChudaoOpen, isInteractionDisabled }) {
  const card = getWrappedCard(virtualIndex);
  const slot = getSlotForVirtualIndex(virtualIndex, activeIndex);
  const isChudaoCenter = card.key === "brand-16" && slot === "center";
  const isClickable = isChudaoCenter && !isInteractionDisabled;
  const className = [
    "brand-detail__fan-card",
    slot.includes("outer") ? "brand-detail__fan-card--edge" : "brand-detail__fan-card--motion-target",
    slot.includes("off") ? "brand-detail__fan-card--hidden" : "",
    isClickable ? "brand-detail__fan-card--clickable" : "",
    `brand-detail__fan-card--${slot}`
  ].filter(Boolean).join(" ");
  const handleKeyDown = (event) => {
    if (!isClickable || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onChudaoOpen?.();
  };

  return (
    <div
      className={className}
      data-fan-slot={slot}
      data-card-key={card.key}
      data-card-number={card.number}
      role={isChudaoCenter ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isChudaoCenter ? "Open Chudao Xiang cuisine project detail" : undefined}
      onClick={isClickable ? onChudaoOpen : undefined}
      onKeyDown={handleKeyDown}
    >
      <img
        className="brand-detail__fan-card-image"
        src={card.image}
        alt={card.alt}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
      />
    </div>
  );
}

function FanCards({ activeIndex, carouselDirection, onChudaoOpen, isInteractionDisabled }) {
  const classes = [
    "brand-detail__fan",
    carouselDirection ? `is-moving-${carouselDirection}` : ""
  ].filter(Boolean).join(" ");
  const visibleRange = Array.from({ length: 7 }, (_, index) => activeIndex - 3 + index);

  return (
    <div className={classes}>
      {visibleRange.map((virtualIndex) => (
        <FanCard
          virtualIndex={virtualIndex}
          activeIndex={activeIndex}
          isInteractionDisabled={isInteractionDisabled}
          onChudaoOpen={onChudaoOpen}
          key={virtualIndex}
        />
      ))}
    </div>
  );
}

function ArrowButton({ direction, onClick, disabled = false }) {
  const path = direction === "left"
    ? "m368-480 315 315q11 11 11 27.5T683-109q-12 12-28.5 12T626-109L297-438q-9-9-13-20t-4-22q0-11 4-22t13-20l330-330q12-12 28-11.5t28 12.5q11 12 11.5 28T683-795L368-480Z"
    : "M591-482 276-797q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l329 329q9 9 13 20t4 22q0 11-4 22t-13 20L332-110q-12 12-28 11.5T276-111q-11-12-11.5-28t11.5-28l315-315Z";

  return (
    <button
      className={`brand-detail__arrow brand-detail__arrow--${direction}`}
      aria-label={direction === "left" ? "Previous card" : "Next card"}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <svg viewBox="0 -960 960 960" aria-hidden="true">
        <path d={path} fill="#fff" />
      </svg>
    </button>
  );
}

function CarouselHitZone({ direction, onClick, disabled = false }) {
  return (
    <button
      className={`brand-detail__hit-zone brand-detail__hit-zone--${direction}`}
      aria-label={direction === "left" ? "Previous card" : "Next card"}
      onClick={onClick}
      disabled={disabled}
      type="button"
    />
  );
}

const detailCopyByKey = {
  packaging: {
    title: "包装设计",
    pill: "从概念到落地，构建完整包装系统",
    caption: "From concept to production-ready packaging"
  },
  brand: {
    title: "品牌设计",
    pill: "让品牌拥有清晰的视觉语言",
    caption: "Turning ideas into memorable visual identities"
  },
  ip: {
    title: "IP 设计",
    pill: "创造能够持续成长的品牌角色",
    caption: "Designing characters that grow with brands"
  }
};

function DetailTitle({ title }) {
  if (title !== "IP 设计") {
    return title;
  }

  return (
    <>
      <span className="ip-title__mark">IP</span>
      <span>设计</span>
    </>
  );
}

export default function BrandDetailPage({ activeCardKey = "brand", isVisible = true, isClosing = false, isCardTransitioning = false, isProjectTransitioning = false, onBack, onChudaoOpen }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [carouselDirection, setCarouselDirection] = React.useState(null);
  const carouselTimerRef = React.useRef(null);
  const detailCopy = detailCopyByKey[activeCardKey] ?? detailCopyByKey.brand;
  const centerCard = getWrappedCard(activeIndex);
  const isChudaoActive = centerCard.key === "brand-16";
  const isInteractionDisabled = Boolean(carouselDirection || isCardTransitioning || isClosing);
  const classes = [
    "brand-detail",
    isVisible ? "is-visible" : "",
    isClosing ? "is-closing" : "",
    isCardTransitioning ? "is-card-transitioning" : "",
    isProjectTransitioning ? "is-project-transitioning" : ""
  ].filter(Boolean).join(" ");

  React.useEffect(() => () => {
    if (carouselTimerRef.current) {
      window.clearTimeout(carouselTimerRef.current);
    }
  }, []);

  React.useEffect(() => {
    if (!isCardTransitioning || isVisible || isClosing) {
      return;
    }

    if (carouselTimerRef.current) {
      window.clearTimeout(carouselTimerRef.current);
      carouselTimerRef.current = null;
    }

    setCarouselDirection(null);
    setActiveIndex(0);
  }, [isCardTransitioning, isVisible, isClosing]);

  const slideCarousel = (direction) => {
    if (carouselDirection || isCardTransitioning || isClosing) {
      return;
    }

    setCarouselDirection(direction);
    const step = direction === "next" ? 1 : -1;
    setActiveIndex((current) => current + step);

    if (carouselTimerRef.current) {
      window.clearTimeout(carouselTimerRef.current);
    }

    carouselTimerRef.current = window.setTimeout(() => {
      setCarouselDirection(null);
      carouselTimerRef.current = null;
    }, 780);
  };

  return (
    <main className={classes} data-active-card={activeCardKey} aria-hidden={!isVisible}>
      {isChudaoActive ? <FengTangGrid className="feng-grid--brand-background" hidden /> : <BackgroundGrid />}
      <div className="brand-detail__veil" />
      <section className="brand-detail__content" aria-label={detailCopy.title}>
        <FanCards
          activeIndex={activeIndex}
          carouselDirection={carouselDirection}
          isInteractionDisabled={isInteractionDisabled}
          onChudaoOpen={onChudaoOpen}
        />
        <CarouselHitZone direction="left" onClick={() => slideCarousel("previous")} disabled={isInteractionDisabled} />
        <CarouselHitZone direction="right" onClick={() => slideCarousel("next")} disabled={isInteractionDisabled} />
        <ArrowButton direction="left" onClick={() => slideCarousel("previous")} disabled={isInteractionDisabled} />
        <ArrowButton direction="right" onClick={() => slideCarousel("next")} disabled={isInteractionDisabled} />
        <div className="brand-detail__copy">
          <h1>
            <DetailTitle title={detailCopy.title} />
          </h1>
          <div className="brand-detail__pill">{detailCopy.pill}</div>
          <p>{detailCopy.caption}</p>
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
