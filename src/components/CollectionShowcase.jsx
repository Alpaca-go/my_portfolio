import React from "react";
import CollectionCard from "./CollectionCard";

const cards = [
  {
    key: "packaging",
    titleCn: "包装设计",
    titleEn: "Packaging Design",
    tabColor: "#FFBE46",
    panelGradient: "linear-gradient(121.8deg, #ffc95d 4.71%, #ffb928 92.19%)",
    style: {
      left: "50%",
      bottom: 0,
      rotate: "-15deg",
      transformOrigin: "0% 0%",
      translate: "calc(-50% - 384px) -8px"
    }
  },
  {
    key: "brand",
    titleCn: "品牌设计",
    titleEn: "Brand Design",
    tabColor: "#AB9AFB",
    panelGradient: "linear-gradient(121.8deg, #9f8cf0 4.71%, #7a65dd 92.19%)",
    sheetImages: [
      { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/ed7b1c40-3332-43d8-a9eb-4615ef341b00/w=800", alt: "Lucas Martin" },
      { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/7d4d2641-d6a8-4fef-e85c-b12ed100d500/w=800", alt: "James Walker" },
      { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/933a7615-f4b6-4eae-8ed1-705fa0e24400/w=800", alt: "Olivia Carter" }
    ],
    style: {
      left: "50%",
      bottom: 152,
      translate: "-50%",
      zIndex: 2
    }
  },
  {
    key: "ip",
    titleCn: "IP 设计",
    titleEn: "IP Design",
    tabColor: "#FF7A4D",
    panelGradient: "linear-gradient(121.8deg, #ff8c5e 4.71%, #ff6f45 92.19%)",
    style: {
      left: "50%",
      bottom: 0,
      rotate: "15deg",
      transformOrigin: "0% 0%",
      translate: "calc(-50% + 402px) -108px"
    }
  }
];

export default function CollectionShowcase({ onCardOpen, openingKey, closingKey, hideOpeningSheets = false }) {
  const introStartDelay = 480;
  const introDuration = 760;
  const introStepDelay = 180;
  const introDelayOrder = {
    brand: 0,
    packaging: 1,
    ip: 2
  };
  const [isIntroActive, setIsIntroActive] = React.useState(true);

  React.useEffect(() => {
    if (openingKey || closingKey) {
      setIsIntroActive(false);
      return undefined;
    }

    const totalIntroTime = introStartDelay + introDuration + introStepDelay * 2;
    const timer = window.setTimeout(() => {
      setIsIntroActive(false);
    }, totalIntroTime);

    return () => window.clearTimeout(timer);
  }, [openingKey, closingKey]);

  const classes = [
    "collection-showcase",
    openingKey ? "is-opening" : "",
    closingKey ? "is-closing" : ""
  ].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-label="Collection cards">
      {cards.map((card) => (
        <CollectionCard
          key={card.key}
          titleCn={card.titleCn}
          titleEn={card.titleEn}
          tabColor={card.tabColor}
          panelGradient={card.panelGradient}
          sheetImages={card.sheetImages}
          style={card.style}
          isIntroActive={isIntroActive}
          introDelay={introStartDelay + introDelayOrder[card.key] * 180}
          isOpening={openingKey === card.key}
          isClosing={closingKey === card.key}
          hideSheets={hideOpeningSheets && openingKey === card.key}
          isDimmed={(openingKey && openingKey !== card.key) || (closingKey && closingKey !== card.key)}
          onOpen={() => onCardOpen(card.key, card.titleEn)}
        />
      ))}
    </section>
  );
}
