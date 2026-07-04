import React from "react";
import "./FolderCard.css";

export default function FolderCard({
  className = "",
  style,
  titleCn = "品牌设计",
  titleEn = "Brand Design",
  tagCount = "05",
  tagLabel = "tags",
  ariaLabel = "Brand Design folder"
}) {
  const classes = ["folder-card", className].filter(Boolean).join(" ");

  return (
    <section className={classes} style={style} tabIndex={0} aria-label={ariaLabel}>
      <div className="folder-back">
        <svg viewBox="0 0 500 360" aria-hidden="true">
          <path d="M155.1 0H20C9 0 0 9 0 20v320c0 11 9 20 20 20h460c11 0 20-9 20-20V60c0-11-9-20-20-20H200L170 6.6C166.2 2.4 160.8 0 155.1 0Z" fill="#A494F2" />
        </svg>
      </div>
      <div className="folder-sheet folder-sheet-back" />
      <div className="folder-sheet folder-sheet-middle" />
      <div className="folder-sheet folder-sheet-front" />
      <div className="folder-panel">
        <div className="folder-panel__content">
          <div>
            <h2 className="folder-title-cn">{titleCn}</h2>
            <div className="folder-title-en">{titleEn}</div>
          </div>
          <div className="folder-footer">
            <div className="folder-tags">
              <span className="folder-tags__count">{tagCount}</span>
              <span className="folder-tags__label">{tagLabel}</span>
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
