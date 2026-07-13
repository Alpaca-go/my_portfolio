import React from "react";
import CoverflowGallery from "./CoverflowGallery";

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
    image: "/assets/brand-carousel-44-light.png",
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

function getWrappedCard(index) {
  return carouselCards[((index % carouselCards.length) + carouselCards.length) % carouselCards.length];
}

const detailCopyByKey = {
  packaging: {
    titleEn: "Packaging Design",
    title: "包装设计",
    pill: "从概念到落地，构建完整包装系统",
    caption: "From concept to production-ready packaging"
  },
  brand: {
    titleEn: "Brand Design",
    title: "品牌设计",
    pill: "让品牌拥有清晰的视觉语言",
    caption: "Turning ideas into memorable visual identities"
  },
  ip: {
    titleEn: "IP Design",
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

export default function BrandDetailPage({ activeCardKey = "brand", isVisible = true, isClosing = false, isCardTransitioning = false, isProjectTransitioning = false, hasProjectDetail = false, hasPinnedCarousel = false, isProjectOpening = false, isProjectClosing = false, onBack, onChudaoOpen, onJointownOpen, onCarouselInteract }) {
  const [activeIndex, setActiveIndex] = React.useState(2);
  const [carouselDirection, setCarouselDirection] = React.useState(null);
  const carouselTimerRef = React.useRef(null);
  const dragStartRef = React.useRef(null);
  const detailCopy = detailCopyByKey[activeCardKey] ?? detailCopyByKey.brand;
  const isInteractionDisabled = Boolean(carouselDirection || isCardTransitioning || isClosing);
  const classes = [
    "brand-detail",
    isVisible ? "is-visible" : "",
    isClosing ? "is-closing" : "",
    isCardTransitioning ? "is-card-transitioning" : "",
    isProjectTransitioning ? "is-project-transitioning" : "",
    hasProjectDetail ? "has-project-detail" : "",
    hasPinnedCarousel ? "has-pinned-carousel" : "",
    isProjectOpening ? "is-project-opening" : "",
    isProjectClosing ? "is-project-closing" : ""
  ].filter(Boolean).join(" ");

  React.useEffect(() => () => {
    if (carouselTimerRef.current) window.clearTimeout(carouselTimerRef.current);
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

  const moveCarousel = (offset) => {
    if (carouselDirection || isCardTransitioning || isClosing) return;
    const direction = offset > 0 ? "next" : "previous";
    setCarouselDirection(direction);
    setActiveIndex((current) => current + offset);
    if (carouselTimerRef.current) window.clearTimeout(carouselTimerRef.current);
    carouselTimerRef.current = window.setTimeout(() => {
      setCarouselDirection(null);
      carouselTimerRef.current = null;
    }, 620);
  };

  const slideCarousel = (direction) => moveCarousel(direction === "next" ? 1 : -1);

  const handlePointerDown = (event) => {
    dragStartRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (dragStartRef.current == null) return;
    const delta = event.clientX - dragStartRef.current;
    dragStartRef.current = null;
    if (Math.abs(delta) < 48) return;
    slideCarousel(delta > 0 ? "previous" : "next");
  };

  return (
    <>
      <main className={classes} data-active-card={activeCardKey} aria-hidden={!isVisible}>
        <div className="brand-detail__veil" />
        <section className="brand-detail__mobile" aria-label={`${detailCopy.title}项目列表`}>
          <button className="brand-detail__mobile-back" type="button" onClick={onBack}>Back to Works / 返回作品</button>
          <header>
            <span>{detailCopy.caption}</span>
            <h1><DetailTitle title={detailCopy.title} /></h1>
            <p>{detailCopy.pill}</p>
            <small>{String(carouselCards.length).padStart(2, "0")} PROJECTS</small>
          </header>
          <div className="brand-detail__mobile-grid">
            {carouselCards.map((card) => {
              const openProject = card.key === "brand-16" ? onChudaoOpen : card.key === "brand-44" ? onJointownOpen : null;
              return (
                <article key={card.key}>
                  <img src={card.image} alt={card.alt} loading="lazy" />
                  <div><span>{card.number}</span><strong>{card.title}</strong><small>{card.subtitle} · {card.badge}</small></div>
                  {openProject ? <button type="button" onClick={openProject}>View Project / 查看项目</button> : <span>Project Preview</span>}
                </article>
              );
            })}
          </div>
        </section>
        <section
          className="brand-detail__content"
          aria-label={detailCopy.title}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
        <CoverflowGallery
          disabled={isInteractionDisabled}
          onInteract={onCarouselInteract}
        />
        <div className="brand-detail__copy">
          <DetailTitleBlock copy={detailCopy} />
        </div>
        <button className="brand-detail__down" aria-label="返回作品" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19V5M12 5L6.5 10.5M12 5L17.5 10.5" />
          </svg>
          <span>Back to Works</span><span>返回作品</span>
        </button>
        </section>
      </main>
    </>
  );
}

function DetailTitleBlock({ copy }) {
  return (
    <div className="brand-detail__title-block">
      <h1>{copy.titleEn}</h1>
      <div className="brand-detail__title-localized">
        <h2><DetailTitle title={copy.title} /></h2>
        <div className="brand-detail__title-meta">
          <div className="brand-detail__pill">{copy.pill}</div>
          <p>{copy.caption}</p>
        </div>
      </div>
    </div>
  );
}
