import React from "react";

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.1;
const MAX_VISIBLE = 2;
const DEPTH = 0;
const VERTICAL_STEP = 18;
const OUTER_VERTICAL_OFFSET = 18;

const DEFAULT_SLIDES = [
  { image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800", title: "James Walker" },
  { image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/933a7615-f4b6-4eae-8ed1-705fa0e24400/w=800", title: "Olivia Carter" },
  { image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/859c75ea-953e-489e-be61-91a03a35d700/w=800", title: "Amelia Foster" },
  { key: "james-walker-copy", image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800", title: "James Walker" },
  { key: "olivia-carter-copy", image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/933a7615-f4b6-4eae-8ed1-705fa0e24400/w=800", title: "Olivia Carter" },
  { image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/31afae9c-5ba3-4ec3-2534-ed8198ed1100/w=800", title: "Benjamin Harris" },
  { image: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/ed7b1c40-3332-43d8-a9eb-4615ef341b00/w=800", title: "Lucas Martin" }
];

function getSlot(relativeIndex) {
  if (relativeIndex <= -3) return "off-left";
  if (relativeIndex === -2) return "outer-left";
  if (relativeIndex === -1) return "inner-left";
  if (relativeIndex === 0) return "center";
  if (relativeIndex === 1) return "inner-right";
  if (relativeIndex === 2) return "outer-right";
  return "off-right";
}

export default function CoverflowGallery({
  slides = DEFAULT_SLIDES,
  activeIndex,
  onActiveChange,
  onActiveClick,
  onInteract,
  disabled = false,
  cardWidth = 400,
  cardHeight = 600,
  radius = 4,
  tilt = 0,
  sideTilt = 4,
  gap = 8.3,
  opacity = 100,
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  showTitle = true
}) {
  const lockRef = React.useRef(false);
  const [internalActive, setInternalActive] = React.useState(0);
  const list = slides?.length ? slides : DEFAULT_SLIDES;
  const count = list.length;
  const currentActive = Number.isInteger(activeIndex) ? activeIndex : internalActive;
  const duration = typeof transition?.duration === "number" ? transition.duration : 0.6;
  const easing = Array.isArray(transition?.ease) && transition.ease.length === 4
    ? `cubic-bezier(${transition.ease.join(",")})`
    : "cubic-bezier(0.22, 1, 0.36, 1)";
  const transitionCss = `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
  const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(cardWidth, cardHeight) / 2);
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

  const select = React.useCallback((nextIndex) => {
    if (disabled || lockRef.current || count < 2) return;
    lockRef.current = true;
    const normalizedIndex = ((nextIndex % count) + count) % count;
    setInternalActive(normalizedIndex);
    onActiveChange?.(normalizedIndex);
    window.setTimeout(() => { lockRef.current = false; }, Math.max(50, duration * 1000));
  }, [count, disabled, duration, onActiveChange]);

  const step = React.useCallback((direction) => select(currentActive + direction), [currentActive, select]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onInteract?.();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onInteract?.();
      step(-1);
    }
  };

  return (
    <div
      className="brand-detail__coverflow"
      tabIndex={0}
      role="group"
      aria-label="Brand project carousel"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      style={{ perspective: `${PERSPECTIVE}px` }}
    >
      <div className="brand-detail__coverflow-stage" style={{ width: cardWidth, height: cardHeight }}>
        {list.map((slide, index) => {
          let relativeIndex = index - currentActive;
          if (relativeIndex > count / 2) relativeIndex -= count;
          if (relativeIndex < -count / 2) relativeIndex += count;
          const distance = Math.abs(relativeIndex);
          const visible = distance <= MAX_VISIBLE;
          const isActive = relativeIndex === 0;
          const scale = Math.max(0.4, 1 - distance * SCALE_STEP);
          const verticalOffset = distance * VERTICAL_STEP + (distance === MAX_VISIBLE ? OUTER_VERTICAL_OFFSET : 0);
          const slot = getSlot(relativeIndex);
          const isClickable = visible && !disabled;

          return (
            <div
              key={slide.key ?? index}
              className={`coverflow-gallery__card brand-detail__fan-card ${slot.includes("outer") ? "brand-detail__fan-card--edge" : "brand-detail__fan-card--motion-target"} brand-detail__fan-card--${slot}`}
              data-fan-slot={slot}
              data-card-key={slide.key}
              data-card-number={slide.number}
              data-card-width={cardWidth}
              data-card-height={cardHeight}
              data-card-scale={scale}
              data-card-rotate-y={-relativeIndex * tilt}
              data-card-rotate-z={relativeIndex * sideTilt}
              data-card-radius={effectiveRadius}
              data-card-depth={-distance * DEPTH}
              data-card-offset-x={relativeIndex * gap * 30}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={isActive ? `Open ${slide.title}` : `Move ${slide.title} to the center`}
              aria-hidden={!visible}
              onClick={() => {
                if (!isClickable) return;
                onInteract?.();
                if (isActive) {
                  if (onActiveClick) onActiveClick(slide, index);
                  else step(1);
                }
                else select(index);
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                onInteract?.();
                if (isActive) {
                  if (onActiveClick) onActiveClick(slide, index);
                  else step(1);
                }
                else select(index);
              }}
              style={{
                left: "50%",
                top: "50%",
                width: cardWidth,
                height: cardHeight,
                border: 0,
                borderRadius: effectiveRadius,
                overflow: "hidden",
                contain: "none",
                isolation: "auto",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                transform: `translate(-50%, -50%) translateX(${relativeIndex * gap * 30}px) translateY(${verticalOffset}px) translateZ(${-distance * DEPTH}px) rotateY(${-relativeIndex * tilt}deg) rotateZ(${relativeIndex * sideTilt}deg) scale(${scale})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                zIndex: MAX_VISIBLE - distance + 1,
                cursor: isClickable ? "pointer" : "default",
                pointerEvents: isClickable ? "auto" : "none",
                backgroundColor: "#1a1a1a",
                boxShadow: "none"
              }}
            >
              <img className="coverflow-gallery__image" src={slide.image} alt={slide.alt ?? slide.title ?? ""} draggable={false} />
              {showTitle ? <div className="coverflow-gallery__title">{slide.title}</div> : null}
              <div className="coverflow-gallery__dim" style={{ opacity: isActive ? 0 : dim, transition: `opacity ${duration}s ${easing}` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
