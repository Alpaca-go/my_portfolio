import React from "react";

const fengTangTiles = [
  { key: "hero", src: "/assets/feng-tang-detail/hero-poster.png", alt: "Chudao hero poster", x: 0, y: 0, width: 276, height: 570 },
  { key: "identity", src: "/assets/feng-tang-detail/brand-identity.png", alt: "Chudao brand identity", x: 286, y: 290, width: 174, height: 280 },
  { key: "overview", src: "/assets/feng-tang-detail/brand-overview.png", alt: "Chudao brand overview", x: 286, y: 0, width: 644, height: 280 },
  { key: "dish", src: "/assets/feng-tang-detail/dish-logo.png", alt: "Chudao dish logo", x: 470, y: 290, width: 460, height: 280 },
  { key: "type", src: "/assets/feng-tang-detail/typography.png", alt: "Chudao typography", x: 0, y: 580, width: 276, height: 280 },
  { key: "posters", src: "/assets/feng-tang-detail/poster-series.png", alt: "Chudao poster series", x: 286, y: 580, width: 594, height: 280 },
  { key: "graphics", src: "/assets/feng-tang-detail/auxiliary-graphics.png", alt: "Chudao auxiliary graphics", x: 940, y: 0, width: 460, height: 280 },
  { key: "boxes", src: "/assets/feng-tang-detail/package-boxes.png", alt: "Chudao package boxes", x: 940, y: 290, width: 460, height: 135 },
  { key: "labels", src: "/assets/feng-tang-detail/package-labels.png", alt: "Chudao package labels", x: 940, y: 435, width: 460, height: 135 },
  { key: "storefront", src: "/assets/feng-tang-detail/storefront.png", alt: "Chudao storefront", x: 890, y: 580, width: 510, height: 280 }
];

export default function FengTangGrid({ className = "", hidden = false }) {
  const classes = ["feng-grid", className].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden={hidden}>
      {fengTangTiles.map((tile) => (
        <div
          className="feng-grid__tile"
          key={tile.key}
          style={{
            left: `${tile.x}px`,
            top: `${tile.y}px`,
            width: `${tile.width}px`,
            height: `${tile.height}px`
          }}
        >
          <img
            className="feng-grid__image"
            src={tile.src}
            alt={hidden ? "" : tile.alt}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>
      ))}
    </div>
  );
}
