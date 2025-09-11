import React from "react";
// reuse the same styles so it looks identical
import styles from "../Achievement/Achievement.module.css";

type Props = {
  image?: string;             // "paper1.png" or "/images/research/paper1.png"
  title: string;              // card title
  content: React.ReactNode;   // bullets/paragraphs
  date: string;               // e.g., "Jun 2024 – Present"
  link?: string;              // optional external link
  ctaLabel?: string;          // optional button text (defaults below)
};

const ResearchProject: React.FC<Props> = ({
  image,
  title,
  content,
  date,
  link,
  ctaLabel,
}) => {
  // default relative images to /images/research/
  const src = image
    ? image.startsWith("/")
      ? image
      : `/images/research/${image.replace(/^\//, "")}`
    : undefined;

  return (
    <div className={styles.notePage}>
      {src && (
        <div className={styles.imageSection}>
          <img src={src} alt={title} className={styles.noteImage} />
        </div>
      )}

      <div className={styles.noteContent}>
        <h2 className={styles.noteTitle}>{title}</h2>
        {date && <div className={styles.noteDate}>{date}</div>}
        <div>{content}</div>

        {link && (
          <a className={styles.linkText} href={link} target="_blank" rel="noreferrer">
            {ctaLabel ?? "View Research"}
          </a>
        )}
      </div>
    </div>
  );
};

export default ResearchProject;
