import React from "react";

function CollectionTitle({ title }) {
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

export default function CollectionCard({
  className = "",
  style,
  isIntroActive = false,
  introDelay = 0,
  titleCn,
  titleEn,
  tagCount = "05",
  tagLabel = "tags",
  tabColor,
  panelGradient,
  sheetImages = [],
  arrow = true,
  isOpening = false,
  isClosing = false,
  isDimmed = false,
  hideSheets = false,
  onOpen
}) {
  const classes = [
    "collection-card",
    className,
    isIntroActive ? "is-intro-active" : "",
    isOpening ? "is-opening" : "",
    isClosing ? "is-closing" : "",
    isDimmed ? "is-dimmed" : "",
    hideSheets ? "is-handoff-hidden" : ""
  ].filter(Boolean).join(" ");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen?.();
    }
  };

  return (
    <section
      className={classes}
      style={{ ...style, "--card-intro-delay": `${introDelay}ms` }}
      tabIndex={0}
      role="button"
      data-card-key={titleEn}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <svg className="collection-card__tab" viewBox="0 0 400 288" aria-hidden="true">
        <path
          d="M124.07,0H20C8.95,0,0,8.95,0,20v248c0,11.05,8.95,20,20,20H380c11.05,0,20-8.95,20-20V52c0-11.05-8.95-20-20-20H160l-24.03-26.7c-3.03-3.37-7.36-5.3-11.89-5.3Z"
          fill={tabColor}
        />
      </svg>
      {["left", "center", "right"].map((position, index) => {
        const image = sheetImages[index];

        return (
          <div className={`collection-card__sheet collection-card__sheet-${position}`} key={position}>
            {image ? (
              <img
                className="collection-card__sheet-image"
                src={image.src}
                alt={image.alt}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            ) : null}
          </div>
        );
      })}
      <div className="collection-card__panel" style={{ background: panelGradient }}>
        <div className="collection-card__content">
          <div className="collection-card__titles">
            <h2 className="collection-card__title-cn">
              <CollectionTitle title={titleCn} />
            </h2>
            <div className="collection-card__title-en">{titleEn}</div>
          </div>
          <div className="collection-card__footer">
            <div className="collection-card__tags">
              <span className="collection-card__count">{tagCount}</span>
              <span className="collection-card__label">{tagLabel}</span>
            </div>
            {arrow ? (
              <div className="collection-card__arrow" aria-hidden="true">
                <svg viewBox="-80 -1120 1120 1120">
                  <path d="M683-767.668L226.833-311.501q-10.5 10.5-24.5 10.5t-24.5-10.5q-10.5-10.5-10.5-24.5t10.5-24.5l456.167-456.167H228q-14.875 0-24.932-10.127-10.068-10.115-10.068-25.083 0-14.957 10.068-24.873 10.057-9.917 24.932-9.917h490q14.875 0 24.943 10.057Q753-866.543 753-851.668v490q0 14.875-10.127 24.932-10.115 10.068-25.083 10.068-14.957 0-24.874-10.068-9.917-10.057-9.916-24.932v-406Z" fill="#FFFFFF" />
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
