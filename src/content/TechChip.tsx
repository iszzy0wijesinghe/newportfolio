
import { useEffect, useState } from "react";
import { Cloud, Code2, Database, Wrench } from "lucide-react";
import { getTechIconUrls } from "./techIcons";

type TechChipProps = {
  label: string;
};

type AdobeIcon = {
  letters: string;
  background: string;
  foreground: string;
};

const ADOBE_ICONS: Record<string, AdobeIcon> = {
  "Adobe Photoshop": {
    letters: "Ps",
    background: "#001E36",
    foreground: "#31A8FF",
  },
  "Adobe Illustrator": {
    letters: "Ai",
    background: "#330000",
    foreground: "#FF9A00",
  },
  "Adobe InDesign": {
    letters: "Id",
    background: "#49021F",
    foreground: "#FF3366",
  },
  "Adobe Premiere Pro": {
    letters: "Pr",
    background: "#1E1F53",
    foreground: "#9999FF",
  },
  "Adobe After Effects": {
    letters: "Ae",
    background: "#1F1F4D",
    foreground: "#D291FF",
  },
  "Adobe Media Encoder": {
    letters: "Me",
    background: "#1A204B",
    foreground: "#A5A9FF",
  },
  "Adobe Firefly": {
    letters: "Fi",
    background: "#281438",
    foreground: "#FF72E1",
  },
  "Adobe Creative Cloud": {
    letters: "Cc",
    background: "#EB1000",
    foreground: "#FFFFFF",
  },
};

function AdobeFallback({ label }: { label: string }) {
  const icon = ADOBE_ICONS[label];

  if (!icon) return null;

  return (
    <span
      aria-hidden="true"
      className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[4px] text-[10px] font-bold leading-none tracking-tight"
      style={{
        backgroundColor: icon.background,
        color: icon.foreground,
      }}
    >
      {icon.letters}
    </span>
  );
}

function GenericFallback({ label }: { label: string }) {
  const name = label.toLowerCase();
  const props = { size: 16, strokeWidth: 1.8 };

  if (
    name.includes("cloud") ||
    name.includes("aws") ||
    name.includes("azure")
  ) {
    return <Cloud {...props} />;
  }

  if (
    name.includes("sql") ||
    name.includes("database") ||
    name.includes("redis") ||
    name.includes("mongodb") ||
    name.includes("dbeaver")
  ) {
    return <Database {...props} />;
  }

  if (
    name.includes("studio") ||
    name.includes("git") ||
    name.includes("postman")
  ) {
    return <Wrench {...props} />;
  }

  return <Code2 {...props} />;
}

export default function TechChip({ label }: TechChipProps) {
  const sources = getTechIconUrls(label);
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex];
  const isAdobe = Object.prototype.hasOwnProperty.call(ADOBE_ICONS, label);

  useEffect(() => {
    setSourceIndex(0);
  }, [label]);

  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-2.5 py-1.5 text-xs">
      {source ? (
        <img
          src={source}
          alt=""
          aria-hidden="true"
          className="h-[19px] w-[19px] shrink-0 object-contain"
          loading="lazy"
          decoding="async"
          onError={() => {
            setSourceIndex((previous) => previous + 1);
          }}
        />
      ) : isAdobe ? (
        <AdobeFallback label={label} />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-[19px] w-[19px] shrink-0 items-center justify-center text-[rgb(var(--muted))]"
        >
          <GenericFallback label={label} />
        </span>
      )}

      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}