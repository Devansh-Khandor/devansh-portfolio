import React from "react";
import { Project } from "../data";

const ProjectImage: React.FC<{ project: Project }> = ({ project }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 9",
      background: project.imageBackground ?? "#f3f4f6",
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.15)",
    }}
  >
    <img
      src={`/images/${project.img}`}
      alt={project.title}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        clipPath: project.imageClipPath,
        transform: project.imageScale ? `scale(${project.imageScale})` : undefined,
        padding: project.imagePadding ?? "6%",
        boxSizing: "border-box",
        display: "block",
        margin: 0,
        borderRadius: 0,
        background: "transparent",
      }}
    />
  </div>
);

export default ProjectImage;
