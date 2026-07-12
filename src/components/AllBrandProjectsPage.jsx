import React from "react";

export default function AllBrandProjectsPage({
  projects = [],
  onProjectSelect,
  className = ""
}) {
  const classes = ["brand-detail__grid-section", className].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-labelledby="all-brand-projects-title">
      <header>
        <span>ALL PROJECTS</span>
        <h2 id="all-brand-projects-title">全部品牌项目</h2>
      </header>
      <div className="brand-detail__project-grid">
        {projects.map((project, index) => (
          <button
            type="button"
            onClick={() => onProjectSelect?.(project, index)}
            key={project.key ?? index}
          >
            <img src={project.image} alt={project.alt ?? project.title ?? ""} loading="lazy" />
            <span>
              <strong>{project.title}</strong>
              <small>{project.subtitle} · {project.badge}</small>
            </span>
            <span>{project.number}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
