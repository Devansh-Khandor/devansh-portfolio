import React from "react";
// reuse the same styles so it looks identical to Achievements
import styles from "../Achievement/Achievement.module.css";

type Props = {
  image?: string;             // "nlp.png" or "/images/certificates/nlp.png"
  title: string;              // big heading
  content: React.ReactNode;   // bullets / paragraphs
  date: string;               // shown under title
  link?: string;              // "View Certificate →"
};

const Certificate: React.FC<Props> = ({ image, title, content, date, link }) => {
  // default relative images to /images/certificates/
  const src = image
    ? image.startsWith("/")
      ? image
      : `/images/certificates/${image.replace(/^\//, "")}`
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

        {/* your markdown/bullets/paragraphs */}
        <div>{content}</div>

        {link && (
          <a
            className={styles.linkText}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            View Certificate 
          </a>
        )}
      </div>
    </div>
  );
};

export default Certificate;
