/** @format */

import { getTechIconUrl } from "../content/techIcons";

export default function TechChip({ label }: { label: string }) {
  const src = getTechIconUrl(label);

  return (
    <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      {src ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="w-[14px] h-[14px] shrink-0"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <span>{label}</span>
    </span>
  );
}


// /** @format */

// import { useEffect, useState } from "react";
// import { getTechIconUrl } from "../content/techIcons";

// export default function TechChip({ label }: { label: string }) {
//   const [hideIcon, setHideIcon] = useState(false);
//   const [src, setSrc] = useState<string | undefined>(() => getTechIconUrl(label));

//   // If theme toggles, recompute icon URL (because we pick readable fallback colors)
//   useEffect(() => {
//     setHideIcon(false);
//     setSrc(getTechIconUrl(label));
//   }, [label]);

//   return (
//     <span className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
//       {!hideIcon && src ? (
//         <img
//           src={src}
//           alt=""
//           aria-hidden="true"
//           className="w-[14px] h-[14px] shrink-0"
//           loading="lazy"
//           decoding="async"
//           referrerPolicy="no-referrer"
//           onError={() => setHideIcon(true)}
//         />
//       ) : null}

//       <span>{label}</span>
//     </span>
//   );
// }
