
import { useEffect, useState } from "react";

type Props = {
  src: string;
  label: string;
  index: string;
  className?: string;
  alt?: string;
};

export default function StoryVisual({
  src,
  label,
  index,
  className = "",
  alt = ""
}: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <figure className={`story-visual ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt || label}
          onError={() => setFailed(true)}
          loading={index === "01" ? "eager" : "lazy"}
        />
      )}

      {failed && (
        <div
          className="visual-placeholder"
          aria-label={`${label} image placeholder`}
          role="img"
        >
          <span className="visual-shape" />

          <span className="visual-placeholder-mark">
            i<span>.</span>
          </span>

          <span className="visual-placeholder-message">
            VISUAL STORY / {index}
            <br />
            {label}
            <br />
            BETWEEN DESIGN AND CODE
          </span>
        </div>
      )}

      <figcaption className="visual-caption">
        <span>{label}</span>
        <span>FIG. {index}</span>
      </figcaption>
    </figure>
  );
}
