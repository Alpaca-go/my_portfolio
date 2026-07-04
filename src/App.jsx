import React from "react";
import BrandDetailPage from "./components/BrandDetailPage";
import CollectionShowcase from "./components/CollectionShowcase";

const badgeData = [
  {
    key: "vision",
    className: "badge badge-vision",
    icon: "/assets/aa-badge.png",
    caption: "Turning ideas into memorable visual identities",
    text: "让品牌拥有清晰的视觉语言"
  },
  {
    key: "brand",
    className: "badge badge-brand",
    icon: "/assets/bear-badge.png",
    caption: "Designing characters that grow with brands",
    text: "创造能够持续成长的品牌角色"
  },
  {
    key: "packaging",
    className: "badge badge-packaging",
    icon: "/assets/box-badge.png",
    caption: "From concept to production-ready packaging",
    text: "从概念到落地，构建完整包装系统"
  },
  {
    key: "illustration",
    className: "badge badge-illustration",
    icon: "/assets/palette-badge.png",
    caption: "Crafting illustrations that bring stories to life",
    text: "为每个故事赋予独特的视觉表达"
  }
];

function Header() {
  return (
    <header className="header">
      <div className="designer-name">DESIGNER KYRIES</div>
      <div className="collection-pill">2026 WORK COLLECTION</div>
    </header>
  );
}

function FeatureBadge({ className, icon, caption, text }) {
  return (
    <section className={className}>
      <div className="badge-caption">{caption}</div>
      <div className="badge-row">
        <img className="badge-icon" src={icon} alt="" />
        <div className="badge-pill">
          <span>{text}</span>
        </div>
      </div>
    </section>
  );
}

function PortfolioWordmark() {
  return (
    <div className="portfolio-wordmark" aria-label="Portfolio">
      <img src="/assets/Portfolio-04.svg" alt="Portfolio" />
    </div>
  );
}

function Hero({ onCardOpen, openingKey, closingKey }) {
  return (
    <main className="hero">
      {badgeData.map((item) => (
        <FeatureBadge key={item.key} {...item} />
      ))}
      <PortfolioWordmark />
      <CollectionShowcase onCardOpen={onCardOpen} openingKey={openingKey} closingKey={closingKey} />
    </main>
  );
}

function parseRotate(value) {
  if (!value || value === "none") {
    return 0;
  }

  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) {
    return 0;
  }

  const normalized = ((numeric % 360) + 360) % 360;
  return normalized > 180 ? normalized - 360 : normalized;
}

function getOriginFromBoundingBox(rect, width, height, rotate) {
  const radians = rotate * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const corners = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height]
  ].map(([x, y]) => ({
    x: x * cos - y * sin,
    y: x * sin + y * cos
  }));
  const minX = Math.min(...corners.map((corner) => corner.x));
  const minY = Math.min(...corners.map((corner) => corner.y));

  return {
    left: rect.left - minX,
    top: rect.top - minY
  };
}

function readMotionBox(element, canvasRect, fallbackRotate = 0) {
  const rect = element.getBoundingClientRect();
  const styles = window.getComputedStyle(element);
  const width = Number.parseFloat(styles.width) || rect.width;
  const height = Number.parseFloat(styles.height) || rect.height;
  const rotate = styles.rotate && styles.rotate !== "none"
    ? parseRotate(styles.rotate)
    : fallbackRotate;
  const origin = getOriginFromBoundingBox(rect, width, height, rotate);

  return {
    left: origin.left - canvasRect.left,
    top: origin.top - canvasRect.top,
    width,
    height,
    rotate
  };
}

function measureFolderSheets(cardLabel) {
  const canvas = document.querySelector(".page-canvas");
  const sourceCard = [...document.querySelectorAll(".collection-card")]
    .find((card) => card.getAttribute("data-card-key") === cardLabel);

  if (!canvas || !sourceCard) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const selectors = [
    ".collection-card__sheet-left",
    ".collection-card__sheet-center",
    ".collection-card__sheet-right"
  ];

  return selectors.flatMap((selector) => {
    const source = sourceCard.querySelector(selector);

    if (!source) {
      return [];
    }

    return [readMotionBox(source, canvasRect)];
  });
}

function measureFanCards() {
  const canvas = document.querySelector(".page-canvas");

  if (!canvas) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const selectors = [
    "[data-fan-slot='inner-left']",
    "[data-fan-slot='center']",
    "[data-fan-slot='inner-right']"
  ];

  return selectors.flatMap((selector) => {
    const target = document.querySelector(selector);

    if (!target) {
      return [];
    }

    return [readMotionBox(target, canvasRect)];
  });
}

function measureCenterFolderStack() {
  const canvas = document.querySelector(".page-canvas");
  const showcase = document.querySelector(".collection-showcase");

  if (!canvas || !showcase) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const showcaseRect = showcase.getBoundingClientRect();
  const showcaseLeft = showcaseRect.left - canvasRect.left;
  const showcaseTop = showcaseRect.top - canvasRect.top;
  const folderWidth = 400;
  const folderHeight = 288;
  const folderBottom = 152;
  const sheetWidth = 320;
  const sheetHeight = 220;
  const sheetTop = 54;
  const folderLeft = showcaseLeft + showcaseRect.width / 2 - folderWidth / 2;
  const folderTop = showcaseTop + showcaseRect.height - folderBottom - folderHeight;
  const sheetBox = {
    left: folderLeft + (folderWidth - sheetWidth) / 2,
    top: folderTop + sheetTop,
    width: sheetWidth,
    height: sheetHeight,
    rotate: 0
  };

  return [sheetBox, sheetBox, sheetBox];
}

function measureCardTransition(cardLabel) {
  const sourceBoxes = measureFolderSheets(cardLabel);
  const targetBoxes = measureFanCards();

  return sourceBoxes.flatMap((sourceBox, index) => (
    targetBoxes[index] ? [{ from: sourceBox, to: targetBoxes[index] }] : []
  ));
}

function measureCenteredCardTransition() {
  const sourceBoxes = measureCenterFolderStack();
  const targetBoxes = measureFanCards();

  return sourceBoxes.flatMap((sourceBox, index) => (
    targetBoxes[index] ? [{
      from: sourceBox,
      to: targetBoxes[index],
      fromOpacity: "0.72",
      targetOpacity: "1",
      opacityDuration: "100ms",
      opacityDelayExtra: "20ms"
    }] : []
  ));
}

function CardTransitionLayer({ cards, isActive }) {
  if (!cards.length) {
    return null;
  }

  const classes = ["card-transition-layer", isActive ? "is-active" : ""].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {cards.map((card, index) => (
        <div
          className="card-transition-layer__card"
          key={index}
          style={{
            left: `${card.from.left}px`,
            top: `${card.from.top}px`,
            width: `${card.from.width}px`,
            height: `${card.from.height}px`,
            transform: `rotate(${card.from.rotate}deg)`,
            zIndex: index === 1 ? 3 : 1,
            "--from-opacity": card.fromOpacity ?? "1",
            "--from-background": card.fromBackground ?? "#fff",
            "--from-overlay": card.fromOverlay ?? "0",
            "--from-border-width": card.fromBorderWidth ?? "5px",
            "--from-radius": card.fromRadius ?? "18px",
            "--from-shadow": card.fromShadow ?? "0 -2px 7px rgba(0, 0, 0, 0.18)",
            "--target-left": `${card.to.left}px`,
            "--target-top": `${card.to.top}px`,
            "--target-width": `${card.to.width}px`,
            "--target-height": `${card.to.height}px`,
            "--target-rotate": `${card.to.rotate}deg`,
            "--target-background": card.targetBackground ?? (index === 1 ? "#f6f6f6" : "#ddd"),
            "--target-overlay": card.targetOverlay ?? (index === 1 ? "0" : "0.16"),
            "--target-border-width": card.targetBorderWidth ?? "4px",
            "--target-radius": card.targetRadius ?? "32px",
            "--target-shadow": card.targetShadow ?? "0 2px 10px rgba(0, 0, 0, 0.35)",
            "--target-opacity": card.targetOpacity ?? "1",
            "--opacity-duration": card.opacityDuration ?? "0ms",
            "--opacity-delay-extra": card.opacityDelayExtra ?? "220ms",
            "--transition-delay": `${index * 35}ms`
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [detailVisible, setDetailVisible] = React.useState(false);
  const [detailClosing, setDetailClosing] = React.useState(false);
  const [detailCardsTransitioning, setDetailCardsTransitioning] = React.useState(false);
  const [openingKey, setOpeningKey] = React.useState(null);
  const [closingKey, setClosingKey] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [transitionCards, setTransitionCards] = React.useState([]);
  const [transitionActive, setTransitionActive] = React.useState(false);
  const timersRef = React.useRef([]);

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const queueTimer = React.useCallback((callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  const handleCardOpen = (key, cardLabel) => {
    if (openingKey || closingKey || detailVisible || detailClosing) {
      return;
    }

    clearTimers();

    setSelectedCard({ key, label: cardLabel });
    setDetailClosing(false);
    setOpeningKey(key);
    setDetailCardsTransitioning(true);
    setTransitionCards([]);
    setTransitionActive(false);

    const isCenteredCard = key === "brand";
    const transitionStartDelay = isCenteredCard ? 0 : 430;
    const fanRevealDelay = Math.max(transitionStartDelay + 1040, 1320);
    const transitionClearDelay = fanRevealDelay + 560;

    queueTimer(() => {
      const measuredCards = measureCenteredCardTransition();
      setTransitionCards(measuredCards);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionActive(true);
        });
      });
    }, transitionStartDelay);

    queueTimer(() => {
      window.scrollTo(0, 0);
      setDetailVisible(true);
    }, 760);

    queueTimer(() => {
      setOpeningKey(null);
      setDetailCardsTransitioning(false);
    }, fanRevealDelay);

    queueTimer(() => {
      setTransitionCards([]);
      setTransitionActive(false);
    }, transitionClearDelay);
  };

  const handleDetailBack = () => {
    if (detailClosing) {
      return;
    }

    clearTimers();
    const fanCards = measureFanCards();
    const returnTargets = measureCenterFolderStack();
    const reverseCards = fanCards.flatMap((fanCard, index) => {
      const returnTarget = returnTargets[index];

      if (!returnTarget) {
        return [];
      }

      return [{
        from: fanCard,
        to: returnTarget,
        fromBackground: index === 1 ? "#f6f6f6" : "#ddd",
        fromOverlay: index === 1 ? "0" : "0.16",
        fromBorderWidth: "4px",
        fromRadius: "32px",
        fromShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
        targetBackground: "#fff",
        targetOverlay: "0",
        targetBorderWidth: "5px",
        targetRadius: "18px",
        targetShadow: "0 -2px 7px rgba(0, 0, 0, 0.18)",
        targetOpacity: "0"
      }];
    });

    setOpeningKey(null);
    setClosingKey(selectedCard?.key ?? null);
    setDetailClosing(true);
    setDetailCardsTransitioning(true);
    setTransitionCards(reverseCards);
    setTransitionActive(false);
    window.scrollTo(0, 0);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionActive(true);
      });
    });

    queueTimer(() => {
      setDetailVisible(false);
    }, 240);

    queueTimer(() => {
      setDetailClosing(false);
      setDetailCardsTransitioning(false);
      setTransitionCards([]);
      setTransitionActive(false);
      setClosingKey(null);
      setSelectedCard(null);
    }, 700);
  };

  return (
    <div className="page-shell">
      <div className="page-canvas">
        <Header />
        <Hero onCardOpen={handleCardOpen} openingKey={openingKey} closingKey={closingKey} />
        <BrandDetailPage
          isVisible={detailVisible}
          isClosing={detailClosing}
          isCardTransitioning={detailCardsTransitioning}
          onBack={handleDetailBack}
        />
        <CardTransitionLayer cards={transitionCards} isActive={transitionActive} />
      </div>
    </div>
  );
}
