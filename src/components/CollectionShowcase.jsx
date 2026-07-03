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
      rotate: "345deg",
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

export default function CollectionShowcase() {
  return (
    <section className="collection-showcase" aria-label="Collection cards">
      {cards.map((card) => (
        <CollectionCard key={card.key} {...card} />
      ))}
    </section>
  );
}
