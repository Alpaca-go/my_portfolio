import React from "react";
import { profile, selectedProjects } from "../data/portfolioData";
import { ArrowIcon, SiteFooter } from "./SiteChrome";

function SelectedProjectCard({ project, index, onOpen }) {
  return (
    <button className={`selected-project selected-project--${index + 1}`} type="button" onClick={() => onOpen(project.action)}>
      <span className="selected-project__media">
        <img src={project.cover} alt={`${project.title}${project.description}`} loading="lazy" />
      </span>
      <span className="selected-project__meta">
        <span><small>0{index + 1}</small><strong>{project.title}</strong></span>
        <span><small>{project.category}{project.year ? ` · ${project.year}` : ""}</small><span className="selected-project__arrow"><ArrowIcon /></span></span>
      </span>
    </button>
  );
}

const mobileCategories = [
  { key: "brand", label: "品牌设计", english: "Brand Design", cardLabel: "Brand Design" },
  { key: "packaging", label: "包装设计", english: "Packaging Design", cardLabel: "Packaging Design" },
  { key: "ip", label: "IP 设计", english: "IP Design", cardLabel: "IP Design" }
];

export default function HomeSections({ onProjectOpen, onCategoryOpen }) {
  return (
    <div className="home-sections">
      <section className="mobile-home-intro" aria-labelledby="mobile-home-title">
        <span className="mobile-home-intro__name">KYRIES / 王琦</span>
        <h1 id="mobile-home-title">{profile.role}</h1>
        <p>{profile.roleCn}</p>
        <img src="/assets/Portfolio-04.svg" alt="Portfolio" />
        <div className="mobile-category-list" aria-label="作品分类">
          {mobileCategories.map((item) => (
            <button type="button" onClick={() => onCategoryOpen(item.key, item.cardLabel)} data-category={item.key} key={item.key}>
              <span><strong>{item.label}</strong><small>{item.english}</small></span>
              <span><strong>05</strong><small>Projects</small></span>
            </button>
          ))}
        </div>
      </section>
      <section className="selected-projects page-container-wide" id="works" aria-labelledby="selected-projects-title">
        <header className="section-heading">
          <div><span>02</span><h2 id="selected-projects-title">Selected Projects</h2></div>
          <p>精选项目</p>
        </header>
        <div className="selected-projects__grid">
          {selectedProjects.map((project, index) => (
            <SelectedProjectCard project={project} index={index} onOpen={onProjectOpen} key={project.id} />
          ))}
        </div>
      </section>

      <section className="about-section page-container" id="about" aria-labelledby="about-title">
        <div className="section-heading section-heading--compact"><div><span>03</span><h2 id="about-title">About Kyries</h2></div><p>个人简介</p></div>
        <div className="about-section__content">
          <p>{profile.about}</p>
          <dl>
            <div><dt>擅长领域</dt><dd>Brand Identity<br />Packaging Design<br />IP Design<br />Illustration</dd></div>
            <div><dt>工作方式</dt><dd>Research<br />Concept<br />Visual System<br />Application</dd></div>
            <div><dt>Tools</dt><dd>Adobe Illustrator<br />Photoshop<br />Blender<br />Figma / Paper</dd></div>
          </dl>
        </div>
      </section>

      <section className="contact-section page-container" id="contact" aria-labelledby="contact-title">
        <span>04 · CONTACT</span>
        <h2 id="contact-title">Let’s make something<br />clear &amp; memorable.</h2>
        <p>{profile.availability}</p>
        {!profile.email ? <p className="contact-section__todo">联系邮箱与社交账号待补充</p> : <a href={`mailto:${profile.email}`}>{profile.email}</a>}
      </section>

      <SiteFooter />
    </div>
  );
}
