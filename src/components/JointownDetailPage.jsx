import React from "react";
import { projectCases } from "../data/portfolioData";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function JointownDetailPage({ onBack, onPrevious, onNext, isClosing = false, isEntering = false }) {
  return (
    <ProjectCaseStudy
      project={projectCases.jointown}
      className="jointown-detail"
      heroClassName="jointown-detail__hero"
      onBack={onBack}
      onPrevious={onPrevious}
      onNext={onNext}
      isEntering={isEntering}
      isClosing={isClosing}
    />
  );
}
