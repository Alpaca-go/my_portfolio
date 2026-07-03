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

function Hero() {
  return (
    <main className="hero">
      {badgeData.map((item) => (
        <FeatureBadge key={item.key} {...item} />
      ))}
      <PortfolioWordmark />
      <CollectionShowcase />
    </main>
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <div className="page-canvas">
        <Header />
        <Hero />
      </div>
    </div>
  );
}
