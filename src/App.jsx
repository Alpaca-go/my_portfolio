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

function FolderCard() {
  return (
    <section className="folder-card">
      <div className="folder-back">
        <svg viewBox="0 0 500 360" aria-hidden="true">
          <path d="M155.1 0H20C9 0 0 9 0 20v320c0 11 9 20 20 20h460c11 0 20-9 20-20V60c0-11-9-20-20-20H200L170 6.6C166.2 2.4 160.8 0 155.1 0Z" fill="#A494F2" />
        </svg>
      </div>
      <div className="folder-sheet folder-sheet-back" />
      <div className="folder-sheet folder-sheet-front" />
      <div className="folder-panel">
        <div className="folder-panel__content">
          <div>
            <h2 className="folder-title-cn">品牌设计</h2>
            <div className="folder-title-en">Brand Design</div>
          </div>
          <div className="folder-footer">
            <div className="folder-tags">
              <span className="folder-tags__count">05</span>
              <span className="folder-tags__label">tags</span>
            </div>
            <div className="folder-arrow" aria-hidden="true">
              <svg viewBox="-80 -1120 1120 1120">
                <path d="M683-767.668 226.833-311.501q-10.5 10.5-24.5 10.5t-24.5-10.5q-10.5-10.5-10.5-24.5t10.5-24.5L634-816.668H228q-14.875 0-24.932-10.127-10.068-10.115-10.068-25.083 0-14.957 10.068-24.873Q213.125-886.668 228-886.668h490q14.875 0 24.943 10.057Q753-866.543 753-851.668v490q0 14.875-10.127 24.932-10.115 10.068-25.083 10.068-14.957 0-24.874-10.068-9.917-10.057-9.916-24.932v-406Z" fill="#E3E3E3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <main className="hero">
      {badgeData.map((item) => (
        <FeatureBadge key={item.key} {...item} />
      ))}
      <PortfolioWordmark />
      <FolderCard />
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
