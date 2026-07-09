import React from "react";

const carouselCards = [
  {
    key: "brand-16",
    number: "01",
    image: "/assets/brand-carousel-16.png",
    alt: "Chudao Xiang cuisine brand design",
    title: "厨道·湘菜",
    subtitle: "品牌设计",
    badge: "餐饮"
  },
  {
    key: "brand-32",
    number: "02",
    image: "/assets/brand-carousel-32.png",
    alt: "Yi Ji Liang Fang brand design",
    title: "一剂良方",
    subtitle: "品牌设计",
    badge: "中医养生"
  },
  {
    key: "brand-44",
    number: "03",
    image: "/assets/brand-carousel-44-detail.png",
    alt: "Jointown Aesthetics brand design",
    title: "九州通·九州美学",
    subtitle: "品牌设计",
    badge: "轻医美"
  },
  {
    key: "brand-58",
    number: "04",
    image: "/assets/brand-carousel-58.png",
    alt: "Ming Ji Tang brand design",
    title: "名济堂",
    subtitle: "品牌设计",
    badge: "中药养生"
  },
  {
    key: "brand-83",
    number: "05",
    image: "/assets/brand-carousel-83.png",
    alt: "WOW YEAH brand design",
    title: "WOW YEAH",
    subtitle: "品牌设计",
    badge: "餐饮"
  },
  {
    key: "brand-05",
    number: "06",
    image: "/assets/brand-carousel-05.png",
    alt: "668 spicy shrimp brand design",
    title: "668麻辣虾",
    subtitle: "品牌设计",
    badge: "餐饮"
  },
  {
    key: "brand-71",
    number: "07",
    image: "/assets/brand-carousel-71.png",
    alt: "Feng Tang Tang brand design",
    title: "冯堂堂",
    subtitle: "品牌设计",
    badge: "餐饮"
  }
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

function getWrappedCard(index) {
  return carouselCards[((index % carouselCards.length) + carouselCards.length) % carouselCards.length];
}

function getSlotForVirtualIndex(virtualIndex, activeIndex) {
  return fanSlots[virtualIndex - activeIndex + 3];
}

function CenterFanFrame({ card, isClickable, onOpen }) {
  const handleKeyDown = (event) => {
    if (!isClickable || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onOpen?.();
  };

  return (
    <div className="brand-detail__center-frame">
      <div className="brand-detail__center-frame-base" aria-hidden="true">
        <svg
          className="brand-detail__center-frame-svg"
          viewBox="0 0 380 470"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M342,0H38C17,0,0,17,0,38v394c0,21,17,38,38,38h304c21,0,38-17,38-38V38C380,17,363,0,342,0z M368,336.4c0,17.5-14.2,31.6-31.6,31.6H43.6C26.2,368,12,353.8,12,336.4V43.6C12,26.2,26.2,12,43.6,12h292.7c17.5,0,31.6,14.2,31.6,31.6V336.4z" />
        </svg>
      </div>
      <div className="brand-detail__center-frame-caption">
        <div className="brand-detail__center-frame-text">
          <span>{card.title}</span>
          <span>{card.subtitle}</span>
        </div>
        <div className="brand-detail__center-frame-action" aria-hidden="true">
          <svg viewBox="0 -960 880 880">
            <path d="M252.087-492.499l134.75 134.75q8.25 8.25 7.793 19.25t-8.709 19.25q-8.25 8.25-19.25 8.25t-19.25-8.25L165.921-500.749q-8.25-8.25-8.25-19.25t8.25-19.25l182.416-182.416q8.25-8.25 19.25-8.25t19.25 8.25q8.25 8.25 8.25 19.707t-8.25 19.709L252.087-547.499h454.668q11.916 0 19.707 7.791T734.255-519.999q0 11.916-7.793 19.709T706.755-492.499H252.087Z" />
          </svg>
        </div>
      </div>
      {card.badge ? <div className="brand-detail__center-frame-badge">{card.badge}</div> : null}
      {isClickable ? (
        <button
          className="brand-detail__center-frame-hit"
          type="button"
          aria-label="Open Chudao Xiang cuisine project detail"
          onClick={onOpen}
          onKeyDown={handleKeyDown}
        />
      ) : null}
    </div>
  );
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
  const [activeIndex, setActiveIndex] = React.useState(2);
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
    setActiveIndex(2);
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
      <div className="brand-detail__veil" />
      <section className="brand-detail__content" aria-label={detailCopy.title}>
        <FanCards
          activeIndex={activeIndex}
          carouselDirection={carouselDirection}
          isInteractionDisabled={isInteractionDisabled}
          onChudaoOpen={onChudaoOpen}
        />
        <CenterFanFrame
          card={centerCard}
          isClickable={isChudaoActive && !isInteractionDisabled}
          onOpen={onChudaoOpen}
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
