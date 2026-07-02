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
      <svg viewBox="0 0 854 230" role="img" aria-hidden="true">
        <g fill="#070706">
          <path d="M163.8 61.3c6.6-31.1-13.3-56.4-44.4-56.4H41.2L40 10.4l0 0L23.8 86.7l0 0l-2.6 12.4L3.7 181h31l13.4-63.3h47.1c31.2 0 61.9-25.3 68.6-56.4ZM65.6 35.8h47.1c14 0 23 11.4 20 25.4-3 14-16.8 25.4-30.8 25.4H54.8l10.8-50.8Z" />
          <path d="M213.5 60.7c-33.2 0-65.9 27-72.9 60.2-7.1 33.2 14.2 60.2 47.4 60.2s65.9-27 72.9-60.2c7-33.3-14.2-60.2-47.4-60.2Zm16.4 60.1c-3.4 16.1-19.3 29.1-35.3 29.1s-26.4-13.1-23-29.1c3.4-16.1 19.3-29.1 35.3-29.1s26.4 13 23 29.1Z" />
          <path d="M316.7 68.1c-2.9 2.1-5.7 4.5-8.3 6.9l2.3-10.6h-31L254.9 181h31l13.7-64.3c7-14.2 16.2-22.3 25.3-25.6 13.5-5 26.5 1.2 26.5 1.2l5.9-27.9c-2.4-3.1-24.4-8.1-40.6 3.7Z" />
          <path d="m438.9 169.8 3.1-34.7s-11.2 18-26.2 18.6c-16.9.7-18.1-11.2-16.1-20.5l8.8-41.6h19.8l6.6-31h-19.8l3.8-18h-31l-3.8 18h-19.8l-6.6 31h19.8l-8.8 41.6c-5 23.6 3.4 39.7 21.7 46.5 25.9 9.7 49.5-9.5 49.5-9.5Z" />
          <path d="M587.5 60.7c-33.2 0-65.9 27-72.9 60.2-7.1 33.2 14.2 60.2 47.4 60.2 33.2 0 65.9-27 72.9-60.2s-14.3-60.2-47.4-60.2Zm16.3 60.1c-3.4 16.1-19.3 29.1-35.3 29.1-16.1 0-26.4-13.1-23-29.1 3.4-16.1 19.3-29.1 35.3-29.1s26.5 13 23 29.1Z" />
          <path d="M525.9 84.7l1.3-6h-19.5c3.1-7.9 6-14.4 8.4-18 8.7-13.5 31.8-9.3 38.7-7.8l13.1-30.3c-33.2-7.7-62.2 2-77.6 25.7-4.4 6.8-9 17.2-14 30.4h-28.5l-6.6 31h24.2c-3.2 9.5-6.4 19.8-9.9 30.6-2.8 8.7-5.4 17-7.5 23.3-8.7 26-15.8 28.2-21.5 30-6.6 2.1-10.2-2.2-10.8-3.1.1.2.2.2.2.2l-27.8 20.2c3.9 6.1 13.6 14.3 28.3 14.3 4.2 0 8.7-.7 13.7-2.2 28.7-8.9 40.3-33.1 47.9-55.6 2.2-6.6 4.9-15 7.7-23.8 3.1-9.7 6.9-21.8 11-33.9h14.6c7.9-9 12.9-17.5 19.3-25Z" />
          <path d="M801.4 60.7c-33.2 0-65.9 27-72.9 60.2-2.4 11.3-1.5 21.9 2 30.9-2.2 2.2-5.5 3.8-10 3.8-8.1 0-6.7-9.5-5.7-14.3l8.6-40.3h-31l-8.6 40.3c-1 4.8-3.7 14.3-11.7 14.3s-6.7-9.5-5.7-14.3L695.6 4.4h-31l-29.1 136.9c-4.7 21.9 9.4 39.7 31.3 39.7 9.1 0 18.1-3.1 25.9-8.3 5.6 5.2 13.3 8.3 22.4 8.3 10.4 0 20.6-4 29.1-10.5 8.3 6.6 19.1 10.5 31.7 10.5 33.2 0 65.9-27 72.9-60.2S834.6 60.7 801.4 60.7Zm16.4 60.1c-3.4 16.1-19.3 29.1-35.3 29.1s-26.4-13.1-23-29.1c3.4-16.1 19.3-29.1 35.3-29.1s26.4 13 23 29.1Z" />
          <ellipse transform="matrix(0.744 -0.669 0.669 0.744 133.327 496.221)" cx="713.6" cy="74.3" rx="22.1" ry="17.8" />
        </g>
      </svg>
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
