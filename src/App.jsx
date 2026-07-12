import React from "react";
import BrandDetailPage from "./components/BrandDetailPage";
import CollectionShowcase from "./components/CollectionShowcase";
import ChudaoDetailPage from "./components/FengTangDetailPage";
import JointownDetailPage from "./components/JointownDetailPage";
import HomeSections from "./components/HomeSections";
import { GlobalHeader } from "./components/SiteChrome";

const criticalImages = [
  "/assets/brand-carousel-44-light.png",
  "/assets/brand-carousel-16.png",
  "/assets/brand-carousel-71.png"
];

const HERO_MAX_WIDTH = 1440;
const HERO_MAX_LIFT = 72;
const HERO_CONTENT_SCALE = 1.5;

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

function FeatureBadge({ className, icon, caption, text, delay }) {
  return (
    <section className={className} style={{ "--badge-delay": `${delay}ms` }}>
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
    <div className="portfolio-wordmark" aria-hidden="true">
      <img src="/assets/Portfolio-04.svg" alt="" draggable="false" />
    </div>
  );
}

function Hero({ onCardOpen, openingKey, closingKey, hideOpeningSheets }) {
  const badgeDelayOrder = {
    vision: 0,
    brand: 1,
    packaging: 2,
    illustration: 3
  };

  return (
    <main className="hero">
      {badgeData.map((item) => (
        <FeatureBadge
          key={item.key}
          className={item.className}
          icon={item.icon}
          caption={item.caption}
          text={item.text}
          delay={badgeDelayOrder[item.key] * 220}
        />
      ))}
      <PortfolioWordmark />
      <CollectionShowcase
        onCardOpen={onCardOpen}
        openingKey={openingKey}
        closingKey={closingKey}
        hideOpeningSheets={hideOpeningSheets}
      />
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

function parseTransformRotate(value) {
  if (!value || value === "none") {
    return null;
  }

  const match = value.match(/^matrix(?:3d)?\((.+)\)$/);

  if (!match) {
    return null;
  }

  const values = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  const a = values[0];
  const b = values[1];

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return null;
  }

  return parseRotate(`${Math.atan2(b, a) * 180 / Math.PI}deg`);
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

function getCanvasScale(canvasRect) {
  const scale = canvasRect.width / 2560;
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

function normalizeRectToCanvas(rect, canvasRect) {
  const scale = getCanvasScale(canvasRect);
  return {
    left: (rect.left - canvasRect.left) / scale,
    top: (rect.top - canvasRect.top) / scale,
    width: rect.width / scale,
    height: rect.height / scale,
    right: (rect.right - canvasRect.left) / scale,
    bottom: (rect.bottom - canvasRect.top) / scale
  };
}

function readMotionBox(element, canvasRect, fallbackRotate = 0) {
  const rect = normalizeRectToCanvas(element.getBoundingClientRect(), canvasRect);
  const styles = window.getComputedStyle(element);
  const width = Number.parseFloat(styles.width) || rect.width;
  const height = Number.parseFloat(styles.height) || rect.height;
  const rotate = styles.rotate && styles.rotate !== "none"
    ? parseRotate(styles.rotate)
    : parseTransformRotate(styles.transform) ?? fallbackRotate;
  const origin = getOriginFromBoundingBox(rect, width, height, rotate);

  return {
    left: origin.left,
    top: origin.top,
    width,
    height,
    rotate
  };
}

function readElementImage(element) {
  const image = element.querySelector("img");

  if (!image) {
    return null;
  }

  return {
    src: image.getAttribute("src"),
    alt: image.getAttribute("alt") ?? ""
  };
}

function measureFolderSheets(cardLabel) {
  const canvas = document.querySelector(".page-canvas");
  const sourceCard = [...document.querySelectorAll(".collection-card")]
    .find((card) => card.getAttribute("data-card-key") === cardLabel);

  if (!canvas || !sourceCard) return [];

  const canvasRect = canvas.getBoundingClientRect();
  return ["left", "center", "right"].flatMap((position) => {
    const source = sourceCard.querySelector(`.collection-card__sheet-${position}`);
    return source ? [{ ...readMotionBox(source, canvasRect), image: readElementImage(source) }] : [];
  });
}

function measureFanCards() {
  const canvas = document.querySelector(".page-canvas");

  if (!canvas) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const readLayoutAnchor = (element) => {
    let left = 0;
    let top = 0;
    let current = element;

    while (current && current !== canvas) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }

    return current === canvas ? { left, top } : null;
  };
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

    const motionTarget = target.getAttribute("data-fan-slot") === "center"
      ? target.querySelector(".brand-detail__fan-card-media") ?? target
      : target;

    const isCoverflowCard = target.classList.contains("coverflow-gallery__card");
    const projectedRect = normalizeRectToCanvas(motionTarget.getBoundingClientRect(), canvasRect);
    const targetStyles = window.getComputedStyle(motionTarget);
    const layoutAnchor = isCoverflowCard ? readLayoutAnchor(motionTarget) : null;
    const recordedWidth = Number.parseFloat(target.dataset.cardWidth);
    const recordedHeight = Number.parseFloat(target.dataset.cardHeight);
    const motionBox = isCoverflowCard && layoutAnchor
      ? {
          left: layoutAnchor.left,
          top: layoutAnchor.top,
          width: recordedWidth,
          height: recordedHeight,
          rotate: 0,
          targetTransform: targetStyles.transform,
          targetTransformOrigin: targetStyles.transformOrigin,
          recordedScale: Number.parseFloat(target.dataset.cardScale),
          recordedRotateY: Number.parseFloat(target.dataset.cardRotateY),
          recordedRotateZ: Number.parseFloat(target.dataset.cardRotateZ),
          recordedRadius: Number.parseFloat(target.dataset.cardRadius),
          recordedDepth: Number.parseFloat(target.dataset.cardDepth),
          recordedOffsetX: Number.parseFloat(target.dataset.cardOffsetX),
          projectedRect
        }
      : readMotionBox(motionTarget, canvasRect);

    return [{
      ...motionBox,
      image: readElementImage(motionTarget),
      title: motionTarget.querySelector(".coverflow-gallery__title")?.textContent ?? "",
      cardKey: target.getAttribute("data-card-key") ?? "",
      background: window.getComputedStyle(target).backgroundColor,
      dimOpacity: window.getComputedStyle(target.querySelector(".coverflow-gallery__dim")).opacity,
      isProjectedCoverflowCard: isCoverflowCard,
      returnBox: isCoverflowCard ? { ...projectedRect, rotate: 0 } : null
    }];
  });
}

function measureCenterFolderStack() {
  const canvas = document.querySelector(".page-canvas");
  const showcase = document.querySelector(".collection-showcase");

  if (!canvas || !showcase) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const showcaseRect = normalizeRectToCanvas(showcase.getBoundingClientRect(), canvasRect);
  const showcaseLeft = showcaseRect.left;
  const showcaseTop = showcaseRect.top;
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

  return sourceBoxes.flatMap((sourceBox, index) => {
    const targetBox = targetBoxes[index];
    if (!targetBox) return [];

    return [{
      from: sourceBox,
      to: targetBox,
      image: targetBox.image ?? sourceBox.image,
      cardKey: targetBox.cardKey,
      title: targetBox.title,
      targetBackground: targetBox.background,
      targetOverlay: targetBox.dimOpacity,
      targetOverlayColor: "0, 0, 0",
      targetImageFilter: "grayscale(0) contrast(1)",
      fromBorderWidth: "0px",
      targetBorderWidth: "0px",
      targetRadius: `${targetBox.recordedRadius}px`,
      targetShadow: "none",
      targetTransform: targetBox.targetTransform,
      targetTransformOrigin: targetBox.targetTransformOrigin
    }];
  });
}

function measureChudaoProjectTransition() {
  const canvas = document.querySelector(".page-canvas");
  const source = document.querySelector("[data-card-key='brand-16'][data-fan-slot='center']");

  if (!canvas || !source) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();

  return [{
    from: readMotionBox(source, canvasRect),
    to: {
      left: 1050,
      top: 360,
      width: 460,
      height: 280,
      rotate: 0
    },
    image: readElementImage(source),
    cardKey: source.getAttribute("data-card-key") ?? "",
    fromBackground: window.getComputedStyle(source).backgroundColor,
    fromOverlay: "0",
    fromBorderWidth: "2px",
    fromRadius: "32px",
    fromShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
    targetBackground: "#ddd",
    targetOverlay: "0",
    targetBorderWidth: "0px",
    targetRadius: "20px",
    targetShadow: "none"
  }];
}

function measureJointownProjectTransition() {
  const canvas = document.querySelector(".page-canvas");
  const source = document.querySelector("[data-card-key='brand-44'][data-fan-slot='center']");
  const sourceImage = source?.querySelector("img");

  if (!canvas || !source || !sourceImage) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const sourceRect = normalizeRectToCanvas(source.getBoundingClientRect(), canvasRect);
  const sourceImageRect = normalizeRectToCanvas(sourceImage.getBoundingClientRect(), canvasRect);
  const sourceBorder = Number.parseFloat(window.getComputedStyle(source).borderLeftWidth) || 0;

  return [{
    from: readMotionBox(source, canvasRect),
    to: {
      left: 380,
      top: 0,
      width: 1800,
      height: 1280,
      rotate: 0
    },
    image: readElementImage(source),
    cardKey: "brand-44",
    transitionKind: "jointown-hero",
    motionDuration: "760ms",
    fromImage: {
      left: sourceImageRect.left - sourceRect.left - sourceBorder,
      top: sourceImageRect.top - sourceRect.top - sourceBorder,
      width: sourceImageRect.width,
      height: sourceImageRect.height
    },
    targetImage: {
      left: 0,
      top: 0,
      width: 1800,
      height: 1280
    },
    fromBackground: "#fbf9ff",
    fromOverlay: "0",
    fromBorderWidth: "2px",
    fromRadius: "32px",
    fromShadow: "none",
    targetBackground: "#fbf9ff",
    targetOverlay: "0",
    targetBorderWidth: "0px",
    targetRadius: "0px",
    targetShadow: "none"
  }];
}

function measureJointownReturnTransition() {
  const canvas = document.querySelector(".page-canvas");
  const hero = document.querySelector(".jointown-detail__hero");
  const target = document.querySelector("[data-card-key='brand-44'][data-fan-slot='center']");
  const targetImage = target?.querySelector("img");

  if (!canvas || !hero || !target || !targetImage) {
    return [];
  }

  const canvasRect = canvas.getBoundingClientRect();
  const targetRect = normalizeRectToCanvas(target.getBoundingClientRect(), canvasRect);
  const targetImageRect = normalizeRectToCanvas(targetImage.getBoundingClientRect(), canvasRect);
  const targetBorder = Number.parseFloat(window.getComputedStyle(target).borderLeftWidth) || 0;

  return [{
    from: readMotionBox(hero, canvasRect),
    to: readMotionBox(target, canvasRect),
    image: {
      src: "/assets/jointown-detail/hero.png",
      alt: "Jointown Aesthetics brand design"
    },
    cardKey: "brand-44",
    transitionKind: "jointown-return",
    motionDuration: "760ms",
    fromImage: {
      left: 0,
      top: 0,
      width: normalizeRectToCanvas(hero.getBoundingClientRect(), canvasRect).width,
      height: normalizeRectToCanvas(hero.getBoundingClientRect(), canvasRect).height
    },
    targetImage: {
      left: targetImageRect.left - targetRect.left - targetBorder,
      top: targetImageRect.top - targetRect.top - targetBorder,
      width: targetImageRect.width,
      height: targetImageRect.height
    },
    fromBackground: "#fbf9ff",
    fromOverlay: "0",
    fromBorderWidth: "0px",
    fromRadius: "0px",
    fromShadow: "none",
    targetBackground: "#fbf9ff",
    targetOverlay: "0",
    targetBorderWidth: "2px",
    targetRadius: "32px",
    targetShadow: "none"
  }];
}

function CardTransitionLayer({ cards, isActive, onMotionEnd, onComplete }) {
  if (!cards.length) {
    return null;
  }

  const isProjectTransition = cards.some((card) => Boolean(card.transitionKind));
  const classes = [
    "card-transition-layer",
    isProjectTransition ? "card-transition-layer--project" : "",
    isActive ? "is-active" : ""
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {cards.map((card, index) => {
        const usesTransformMotion = Boolean(
          card.transitionKind?.startsWith("jointown-")
          && card.from.width > 0
          && card.from.height > 0
          && card.to.width > 0
          && card.to.height > 0
        );
        const scaleX = usesTransformMotion ? card.from.width / card.to.width : 1;
        const scaleY = usesTransformMotion ? card.from.height / card.to.height : 1;
        const translateX = usesTransformMotion ? card.from.left - card.to.left : 0;
        const translateY = usesTransformMotion ? card.from.top - card.to.top : 0;
        const hasImageMotion = Boolean(usesTransformMotion && card.fromImage && card.targetImage);
        const initialImageLeft = hasImageMotion ? card.fromImage.left / scaleX : 0;
        const initialImageTop = hasImageMotion ? card.fromImage.top / scaleY : 0;
        const initialImageWidth = hasImageMotion ? card.fromImage.width / scaleX : 0;
        const initialImageHeight = hasImageMotion ? card.fromImage.height / scaleY : 0;
        const cropAlignmentOffsetX = card.transitionKind === "jointown-hero"
          ? 8 / scaleX
          : card.transitionKind === "jointown-return"
            ? -8 / scaleX
            : 0;
        const imageTranslateX = hasImageMotion
          ? initialImageLeft - card.targetImage.left + cropAlignmentOffsetX
          : 0;
        const imageTranslateY = hasImageMotion ? initialImageTop - card.targetImage.top : 0;
        const imageScaleX = hasImageMotion ? initialImageWidth / card.targetImage.width : 1;
        const imageScaleY = hasImageMotion ? initialImageHeight / card.targetImage.height : 1;
        const fromRadius = Number.parseFloat(card.fromRadius);
        const compensatedFromRadius = usesTransformMotion && Number.isFinite(fromRadius)
          ? `${fromRadius / scaleX}px / ${fromRadius / scaleY}px`
          : card.fromRadius ?? "18px";

        return <div
          className="card-transition-layer__card"
          key={index}
          data-card-key={card.cardKey || undefined}
          data-transition-kind={card.transitionKind || undefined}
          data-motion-mode={usesTransformMotion ? "transform" : undefined}
          onTransitionEnd={(event) => {
            if (
              !card.transitionKind
              && index === cards.length - 1
              && event.target === event.currentTarget
              && event.propertyName === "transform"
            ) {
              onComplete?.();
              return;
            }

            if (
              !card.transitionKind
              || usesTransformMotion
              || event.target !== event.currentTarget
              || event.propertyName !== "width"
            ) {
              return;
            }

            onMotionEnd?.(card.transitionKind);
          }}
          style={{
            left: `${usesTransformMotion ? card.to.left : card.from.left}px`,
            top: `${usesTransformMotion ? card.to.top : card.from.top}px`,
            width: `${usesTransformMotion ? card.to.width : card.from.width}px`,
            height: `${usesTransformMotion ? card.to.height : card.from.height}px`,
            transform: usesTransformMotion
              ? `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`
              : `translateZ(0) rotate(${card.from.rotate}deg)`,
            zIndex: index === 1 ? 3 : 1,
            "--from-opacity": card.fromOpacity ?? "1",
            "--from-background": card.fromBackground ?? "#fff",
            "--from-overlay": card.fromOverlay ?? "0",
            "--from-border-width": card.fromBorderWidth ?? "5px",
            "--from-radius": compensatedFromRadius,
            "--from-shadow": card.fromShadow ?? "0 -2px 7px rgba(0, 0, 0, 0.18)",
            "--target-left": `${card.to.left}px`,
            "--target-top": `${card.to.top}px`,
            "--target-width": `${card.to.width}px`,
            "--target-height": `${card.to.height}px`,
            "--target-rotate": `${card.to.rotate}deg`,
            "--target-transform": card.targetTransform,
            "--target-transform-origin": card.targetTransformOrigin ?? "0 0",
            "--target-background": card.targetBackground ?? (index === 1 ? "#f6f6f6" : "#ddd"),
            "--target-overlay": card.targetOverlay ?? "0",
            "--target-overlay-color": card.targetOverlayColor ?? "255, 255, 255",
            "--from-image-filter": card.fromImageFilter ?? "grayscale(0) contrast(1)",
            "--target-image-filter": card.targetImageFilter ?? "grayscale(0) contrast(1)",
            "--from-image-left": card.fromImage ? `${card.fromImage.left}px` : undefined,
            "--from-image-top": card.fromImage ? `${card.fromImage.top}px` : undefined,
            "--from-image-width": card.fromImage ? `${card.fromImage.width}px` : undefined,
            "--from-image-height": card.fromImage ? `${card.fromImage.height}px` : undefined,
            "--target-image-left": card.targetImage ? `${card.targetImage.left}px` : undefined,
            "--target-image-top": card.targetImage ? `${card.targetImage.top}px` : undefined,
            "--target-image-width": card.targetImage ? `${card.targetImage.width}px` : undefined,
            "--target-image-height": card.targetImage ? `${card.targetImage.height}px` : undefined,
            "--from-image-transform": hasImageMotion
              ? `translate3d(${imageTranslateX}px, ${imageTranslateY}px, 0) scale(${imageScaleX}, ${imageScaleY})`
              : undefined,
            "--motion-object-position": card.transitionKind === "jointown-return"
              ? "50% 50%"
              : "calc(50% - 8px) 50%",
            "--target-border-width": card.targetBorderWidth ?? "2px",
            "--target-radius": card.targetRadius ?? "32px",
            "--target-shadow": card.targetShadow ?? "0 2px 10px rgba(0, 0, 0, 0.35)",
            "--target-opacity": card.targetOpacity ?? "1",
            "--opacity-duration": card.opacityDuration ?? "0ms",
            "--opacity-delay-extra": card.opacityDelayExtra ?? "220ms",
            "--motion-duration": card.motionDuration ?? "860ms",
            "--transition-delay": `${index * 35}ms`
          }}
        >
          {card.image ? (
            <img
              className="card-transition-layer__card-image"
              src={card.image.src}
              alt={card.image.alt}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              onTransitionEnd={(event) => {
                if (
                  !usesTransformMotion
                  || !card.transitionKind
                  || event.target !== event.currentTarget
                  || event.propertyName !== "transform"
                ) {
                  return;
                }

                onMotionEnd?.(card.transitionKind);
              }}
            />
          ) : null}
          {!card.transitionKind && card.title ? <div className="coverflow-gallery__title">{card.title}</div> : null}
        </div>
      })}
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
  const [hideOpeningSheets, setHideOpeningSheets] = React.useState(false);
  const [projectDetail, setProjectDetail] = React.useState(null);
  const [projectTransitioning, setProjectTransitioning] = React.useState(false);
  const [jointownClosing, setJointownClosing] = React.useState(false);
  const [stageStyle, setStageStyle] = React.useState({
    "--stage-scale": 1,
    "--stage-left": "0px",
    "--stage-top": "0px",
    "--hero-scale": 1,
    "--hero-translate-y": "0px"
  });
  const timersRef = React.useRef([]);

  React.useLayoutEffect(() => {
    const updateStage = () => {
      const availableHeight = Math.max(640, Math.min(window.innerHeight - 80, 980));
      const scale = Math.min(window.innerWidth / 2560, availableHeight / 1280);
      const renderedCanvasWidth = 2560 * scale;
      const responsiveHeroScale = Math.min(1, HERO_MAX_WIDTH / renderedCanvasWidth);
      const heroScale = responsiveHeroScale * HERO_CONTENT_SCALE;
      const heroLift = Math.min(HERO_MAX_LIFT, Math.max(36, window.innerHeight * 0.06));
      setStageStyle({
        "--stage-scale": scale,
        "--stage-left": `${(window.innerWidth - 2560 * scale) / 2}px`,
        "--stage-top": `${(availableHeight - 1280 * scale) / 2}px`,
        "--hero-scale": heroScale,
        "--hero-translate-y": `${-heroLift / scale}px`
      });
    };

    updateStage();
    window.addEventListener("resize", updateStage);
    return () => window.removeEventListener("resize", updateStage);
  }, []);

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

  React.useEffect(() => {
    criticalImages.forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      image.decode?.().catch(() => undefined);
    });
  }, []);

  React.useEffect(() => {
    const pageMeta = projectDetail === "jointown"
      ? {
          title: "九州美学品牌设计 — KYRIES Portfolio",
          description: "九州美学品牌视觉设计案例，包含品牌标识、视觉系统、包装与空间应用。",
          image: "/assets/jointown-detail/hero.png"
        }
      : projectDetail === "chudao"
        ? {
            title: "厨道湘菜品牌设计 — KYRIES Portfolio",
            description: "厨道湘菜品牌视觉设计案例，包含品牌识别、海报、包装与门店应用。",
            image: "/assets/feng-tang-detail/hero-poster.png"
          }
        : detailVisible || openingKey
          ? {
              title: `${selectedCard?.label ?? "Selected Works"} — KYRIES Portfolio`,
              description: "KYRIES 品牌视觉、包装设计与 IP 形象设计项目分类。",
              image: "/assets/brand-carousel-44-light.png"
            }
          : {
              title: "KYRIES / 王琦 — Brand & Visual Designer",
              description: "KYRIES / 王琦的品牌视觉、包装设计与 IP 形象设计作品集。",
              image: "/assets/jointown-detail/hero.png"
            };

    document.title = pageMeta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", pageMeta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", pageMeta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", pageMeta.description);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", pageMeta.image);
  }, [projectDetail, detailVisible, openingKey, selectedCard]);

  const finishJointownTransition = React.useCallback((transitionKind) => {
    clearTimers();

    if (transitionKind === "jointown-return") {
      setProjectDetail(null);
      setJointownClosing(false);
    } else if (transitionKind === "jointown-hero") {
      setProjectDetail("jointown");
    } else {
      return;
    }

    setProjectTransitioning(false);
    setDetailCardsTransitioning(false);
    setTransitionCards([]);
    setTransitionActive(false);
  }, [clearTimers]);

  const handleCardOpen = (key, cardLabel) => {
    if (openingKey || closingKey || detailVisible || detailClosing) {
      return;
    }

    clearTimers();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    const detailPage = document.querySelector(".brand-detail");
    if (detailPage) {
      detailPage.scrollTop = 0;
      detailPage.scrollLeft = 0;
    }
    setProjectDetail(null);
    setProjectTransitioning(false);

    setSelectedCard({ key, label: cardLabel });
    setDetailClosing(false);
    setOpeningKey(key);
    setDetailCardsTransitioning(true);
    setTransitionCards([]);
    setTransitionActive(false);
    setHideOpeningSheets(false);

    const isCenteredCard = key === "brand";
    const sideCardSettleDelay = isCenteredCard ? 320 : 480;
    const detailRevealDelay = sideCardSettleDelay + 330;
    const fanRevealDelay = Math.max(sideCardSettleDelay + 1400, 1720);

    queueTimer(() => {
      if (detailPage) {
        detailPage.scrollTop = 0;
        detailPage.scrollLeft = 0;
      }
      setTransitionCards(measureCardTransition(cardLabel));

      window.requestAnimationFrame(() => {
        setHideOpeningSheets(true);
        window.requestAnimationFrame(() => setTransitionActive(true));
      });
    }, sideCardSettleDelay);

    queueTimer(() => {
      if (detailPage) {
        detailPage.scrollTop = 0;
        detailPage.scrollLeft = 0;
      }
      window.scrollTo(0, 0);
      setDetailVisible(true);
    }, detailRevealDelay);

    queueTimer(() => {
      setOpeningKey(null);
      setDetailCardsTransitioning(false);
      setTransitionCards([]);
      setTransitionActive(false);
      setHideOpeningSheets(false);
    }, fanRevealDelay);
  };

  const handleDetailBack = () => {
    if (detailClosing) {
      return;
    }

    clearTimers();
    setProjectDetail(null);
    setProjectTransitioning(false);
    const fanCards = measureFanCards();
    const returnTargets = measureCenterFolderStack();
    const reverseCards = fanCards.flatMap((fanCard, index) => {
      const returnTarget = returnTargets[index];

      if (!returnTarget) {
        return [];
      }

      return [{
        from: fanCard.returnBox ?? fanCard,
        to: returnTarget,
        image: fanCard.image,
        fromBackground: fanCard.background ?? (index === 1 ? "#f6f6f6" : "#ddd"),
        fromOverlay: index === 1 ? "0" : "0.45",
        fromImageFilter: index === 1 ? "grayscale(0) contrast(1)" : "grayscale(1) contrast(1.02)",
        targetImageFilter: "grayscale(0) contrast(1)",
        fromBorderWidth: "2px",
        fromRadius: "32px",
        fromShadow: "0 2px 10px rgba(0, 0, 0, 0.35)",
        targetBackground: "#fff",
        targetOverlay: "0",
        targetBorderWidth: "5px",
        targetRadius: "18px",
        targetShadow: "0 -2px 7px rgba(0, 0, 0, 0.18)",
        targetOpacity: "0",
        opacityDuration: "120ms",
        opacityDelayExtra: "40ms"
      }];
    });

    setOpeningKey(null);
    setClosingKey(selectedCard?.key ?? null);
    setDetailClosing(true);
    setDetailCardsTransitioning(true);
    setTransitionCards(reverseCards);
    setTransitionActive(false);
    setHideOpeningSheets(false);
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

  const handleChudaoOpen = () => {
    if (window.matchMedia("(max-width: 767px)").matches && !projectDetail && !detailClosing) {
      clearTimers();
      setOpeningKey(null);
      setDetailCardsTransitioning(false);
      setTransitionCards([]);
      setTransitionActive(false);
      setProjectTransitioning(false);
      setProjectDetail("chudao");
      return;
    }

    if (projectDetail || projectTransitioning || detailCardsTransitioning || detailClosing) {
      return;
    }

    clearTimers();

    const projectCards = measureChudaoProjectTransition();

    if (!projectCards.length) {
      setProjectDetail("chudao");
      return;
    }

    setDetailCardsTransitioning(true);
    setProjectTransitioning(true);
    setTransitionCards(projectCards);
    setTransitionActive(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionActive(true);
      });
    });

    queueTimer(() => {
      setProjectDetail("chudao");
      setProjectTransitioning(false);
      setDetailCardsTransitioning(false);
      setTransitionCards([]);
      setTransitionActive(false);
    }, 920);
  };

  const handleJointownOpen = () => {
    if (window.matchMedia("(max-width: 767px)").matches && !projectDetail && !detailClosing) {
      clearTimers();
      setOpeningKey(null);
      setDetailCardsTransitioning(false);
      setTransitionCards([]);
      setTransitionActive(false);
      setProjectTransitioning(false);
      setJointownClosing(false);
      setProjectDetail("jointown");
      return;
    }

    if (projectDetail || projectTransitioning || detailCardsTransitioning || detailClosing) {
      return;
    }

    clearTimers();
    window.scrollTo(0, 0);
    setJointownClosing(false);

    const projectCards = measureJointownProjectTransition();

    if (!projectCards.length) {
      setProjectDetail("jointown");
      return;
    }

    setDetailCardsTransitioning(true);
    setProjectTransitioning(true);
    setTransitionCards(projectCards);
    setTransitionActive(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionActive(true);
      });
    });

    queueTimer(() => {
      setProjectDetail("jointown");
    }, 520);

    // Safety fallback for browsers that suppress transitionend. Normal cleanup
    // is driven by the card's width transition so it cannot race the last frame.
    queueTimer(() => {
      finishJointownTransition("jointown-hero");
    }, 1100);
  };

  const handleJointownBack = () => {
    if (projectTransitioning || jointownClosing) {
      return;
    }

    clearTimers();
    window.scrollTo(0, 0);
    const returnCards = measureJointownReturnTransition();

    if (!returnCards.length) {
      setProjectDetail(null);
      return;
    }

    setJointownClosing(true);
    setDetailCardsTransitioning(true);
    setProjectTransitioning(true);
    setTransitionCards(returnCards);
    setTransitionActive(false);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionActive(true);
      });
    });

    queueTimer(() => {
      finishJointownTransition("jointown-return");
    }, 1100);
  };

  const resetToHome = React.useCallback((target = "top") => {
    clearTimers();
    setDetailVisible(false);
    setDetailClosing(false);
    setDetailCardsTransitioning(false);
    setOpeningKey(null);
    setClosingKey(null);
    setSelectedCard(null);
    setTransitionCards([]);
    setTransitionActive(false);
    setHideOpeningSheets(false);
    setProjectDetail(null);
    setProjectTransitioning(false);
    setJointownClosing(false);

    window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [clearTimers]);

  const finishFolderTransition = React.useCallback(() => {
    clearTimers();
    setOpeningKey(null);
    setDetailCardsTransitioning(false);
    setHideOpeningSheets(false);
  }, [clearTimers]);

  const releasePinnedCarousel = React.useCallback(() => {
    setDetailCardsTransitioning(false);
    setTransitionCards([]);
    setTransitionActive(false);
  }, []);

  const handleSelectedProjectOpen = (action) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (action === "jointown" || action === "chudao") {
      clearTimers();
      setSelectedCard({ key: "brand", label: "Brand Design" });
      setProjectDetail(action);
      return;
    }
    handleCardOpen("brand", "Brand Design");
  };

  const hasDetail = Boolean(openingKey || detailVisible || detailClosing || projectDetail || projectTransitioning);
  const activeCategory = selectedCard?.key === "packaging"
    ? "包装设计"
    : selectedCard?.key === "ip"
      ? "IP 设计"
      : "品牌设计";

  return (
    <div className={`page-shell ${hasDetail ? "has-detail" : "is-home"} ${projectDetail ? "project-detail-active" : ""}`} id="top">
      <GlobalHeader isDetail={hasDetail} activeCategory={activeCategory} onNavigateHome={resetToHome} />
      <div className="page-stage">
      <div className="page-canvas" style={stageStyle}>
        <Hero
          onCardOpen={handleCardOpen}
          openingKey={openingKey}
          closingKey={closingKey}
          hideOpeningSheets={hideOpeningSheets}
        />
        <BrandDetailPage
          activeCardKey={selectedCard?.key}
          isVisible={detailVisible}
          isClosing={detailClosing}
          isCardTransitioning={detailCardsTransitioning}
          isProjectTransitioning={projectTransitioning}
          hasProjectDetail={Boolean(projectDetail)}
          hasPinnedCarousel={Boolean(transitionCards.length && transitionActive && !detailCardsTransitioning)}
          isProjectOpening={projectTransitioning && !jointownClosing}
          isProjectClosing={jointownClosing}
          onBack={handleDetailBack}
          onChudaoOpen={handleChudaoOpen}
          onJointownOpen={handleJointownOpen}
          onCarouselInteract={releasePinnedCarousel}
        />
        <CardTransitionLayer
          cards={transitionCards}
          isActive={transitionActive}
          onMotionEnd={finishJointownTransition}
          onComplete={finishFolderTransition}
        />
        {projectDetail === "chudao" ? (
          <ChudaoDetailPage
            onBack={() => setProjectDetail(null)}
            onPrevious={() => setProjectDetail("jointown")}
            onNext={() => setProjectDetail("jointown")}
          />
        ) : null}
        {projectDetail === "jointown" ? (
          <JointownDetailPage
            isEntering={projectTransitioning && !jointownClosing}
            isClosing={jointownClosing}
            onBack={handleJointownBack}
            onPrevious={() => setProjectDetail("chudao")}
            onNext={() => setProjectDetail("chudao")}
          />
        ) : null}
      </div>
      </div>
      {!hasDetail ? (
        <HomeSections onProjectOpen={handleSelectedProjectOpen} onCategoryOpen={handleCardOpen} />
      ) : null}
    </div>
  );
}
