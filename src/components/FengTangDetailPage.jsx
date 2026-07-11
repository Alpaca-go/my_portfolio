import React from "react";
import { projectCases } from "../data/portfolioData";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function FengTangDetailPage({ onBack, onPrevious, onNext }) {
  return (
    <ProjectCaseStudy
      project={projectCases.chudao}
      className="feng-detail"
      heroClassName="feng-detail__hero"
      onBack={onBack}
      onPrevious={onPrevious}
      onNext={onNext}
    />
  );
}
