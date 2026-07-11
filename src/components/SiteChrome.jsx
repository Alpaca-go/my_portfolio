import React from "react";
import { categoryLabels, profile } from "../data/portfolioData";

export function ArrowIcon({ direction = "right" }) {
  const path = direction === "left"
    ? "m275-450 147 147q9 9 8.5 21t-9.5 21q-9 9-21 9t-21-9L181-459q-9-9-9-21t9-21l199-199q9-9 21-9t21 9q9 9 9 21.5t-9 21.5L275-510h496q13 0 21.5 8.5T801-480q0 13-8.5 21.5T771-450H275Z"
    : "M685-452H190q-13 0-21.5-8.5T160-482q0-13 8.5-21.5T190-512h495L537-660q-9-9-8.5-21t9.5-21q9-9 21-9t21 9l199 199q5 5 7 10t2 11q0 6-2 11t-7 10L581-263q-9 9-21 9t-21-9q-9-9-9-21.5t9-21.5l146-146Z";

  return <svg viewBox="0 -960 960 960" aria-hidden="true"><path d={path} fill="currentColor" /></svg>;
}

export function GlobalHeader({ isDetail = false, activeCategory = "", onNavigateHome }) {
  const handleHomeLink = (event, target) => {
    if (!isDetail || !onNavigateHome) return;
    event.preventDefault();
    onNavigateHome(target);
  };

  return (
    <header className="global-header">
      <a className="global-header__brand" href="#top" onClick={(event) => handleHomeLink(event, "top")}>
        <span>Designer</span>
        <strong>Kyries.</strong>
      </a>
      <nav className="global-header__nav" aria-label="Primary navigation">
        <a href="#works" onClick={(event) => handleHomeLink(event, "works")}>Works</a>
        <a href="#about" onClick={(event) => handleHomeLink(event, "about")}>About</a>
        <a href="#contact" onClick={(event) => handleHomeLink(event, "contact")}>Contact</a>
      </nav>
      {isDetail ? (
        <div className="global-header__categories" aria-label="Project categories">
          {categoryLabels.map((label) => (
            <span className={activeCategory === label ? "is-active" : ""} key={label}>{label}</span>
          ))}
        </div>
      ) : (
        <span className="global-header__edition">PORTFOLIO · 2026</span>
      )}
    </header>
  );
}

export function SiteFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div>
        <strong>© 2026 KYRIES</strong>
        <span>Brand Identity · Packaging · IP Design</span>
      </div>
      <div className="site-footer__actions">
        {profile.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : null}
        {profile.socialLinks.map((item) => (
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.label} key={item.label}>{item.label}</a>
        ))}
        <button type="button" onClick={scrollToTop}>Back to top</button>
      </div>
    </footer>
  );
}

