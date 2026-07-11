import React from "react";
import { ArrowIcon } from "./SiteChrome";

function ProjectMeta({ items }) {
  return (
    <dl className="project-case__meta">
      {items.filter(([, value]) => Boolean(value)).map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}

function ProjectSection({ section }) {
  return (
    <section className={`project-case__section project-case__section--${section.layout}`} aria-labelledby={`${section.id}-title`}>
      <header>
        <span>{section.number}</span>
        <div>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p>{section.titleCn}</p>
        </div>
        <p>{section.description}</p>
      </header>
      <div className="project-case__images">
        {section.images.map((image, index) => (
          <figure key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function ProjectCaseStudy({ project, className = "", heroClassName = "", onBack, onPrevious, onNext, isEntering = false, isClosing = false }) {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className={`project-case project-case--${project.id} ${className} ${isReady ? "is-ready" : ""} ${isEntering ? "is-entering" : ""} ${isClosing ? "is-closing" : ""}`} aria-label={`${project.title}${project.subtitle}`}>
      <div className="project-case__container">
        <button className="project-case__back" type="button" onClick={onBack}>
          <ArrowIcon direction="left" /><span>Back to Brand Design</span><span>返回品牌设计</span>
        </button>

        <section className="project-case__intro" aria-label="Project overview">
          <span className="project-case__eyebrow">{project.eyebrow}</span>
          <h1><span>{project.title}</span><span>{project.subtitle}</span></h1>
          <p>{project.description}</p>
          <ProjectMeta items={project.meta} />
        </section>

        <figure className={`project-case__hero ${heroClassName}`}>
          <img src={project.hero} alt={project.heroAlt} decoding="async" fetchPriority="high" />
          <figcaption>{project.title} · {project.subtitle}</figcaption>
        </figure>

        <div className="project-case__sections">
          {project.sections.map((section) => <ProjectSection section={section} key={section.id} />)}
        </div>

        <nav className="project-case__navigation" aria-label="Project navigation">
          <button type="button" onClick={onPrevious ?? onBack}>
            <span><ArrowIcon direction="left" /></span><small>Previous Project</small><strong>{project.id === "jointown" ? "厨道湘菜" : "九州通·九州美学"}</strong>
          </button>
          <button type="button" onClick={onNext ?? onBack}>
            <small>Next Project</small><strong>{project.id === "jointown" ? "厨道湘菜" : "九州通·九州美学"}</strong><span><ArrowIcon /></span>
          </button>
        </nav>
      </div>
    </main>
  );
}

