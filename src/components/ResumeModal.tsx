import { useEffect, useRef } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import PdfViewer from "./PdfViewer";

type Props = {
  open: boolean;
  onClose: () => void;
  pdfUrl: string; // "/resume.pdf"
  title?: string;
};

export default function ResumeModal({
  open,
  onClose,
  pdfUrl,
  title = "Resume",
}: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastActiveEl.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastActiveEl.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close resume preview"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="
    relative w-full
    max-w-5xl
    h-[92vh] sm:h-auto
    sm:max-h-[92vh]
    rounded-2xl sm:rounded-3xl
    border border-[rgb(var(--border))]
    bg-[rgb(var(--bg))] shadow-soft overflow-hidden
  "
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
          <div className="min-w-0">
           
            
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] px-3 py-2 text-sm hover:opacity-90"
            >
              <Download size={16} />
              Download
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--bg))]"
            >
              <ExternalLink size={16} />
              New tab
            </a>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] w-10 h-10 hover:bg-[rgb(var(--bg))]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-[rgb(var(--bg))] h-[calc(92vh-64px)] sm:h-auto">
          <PdfViewer url={pdfUrl} />
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useRef } from "react";
// import { Download, ExternalLink, X } from "lucide-react";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   pdfUrl: string;      // "/resume.pdf"
//   title?: string;
// };

// export default function ResumeModal({ open, onClose, pdfUrl, title = "Resume" }: Props) {
//   const closeBtnRef = useRef<HTMLButtonElement | null>(null);
//   const lastActiveEl = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     if (!open) return;

//     lastActiveEl.current = document.activeElement as HTMLElement | null;
//     document.body.style.overflow = "hidden";
//     closeBtnRef.current?.focus();

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKeyDown);

//     return () => {
//       window.removeEventListener("keydown", onKeyDown);
//       document.body.style.overflow = "";
//       lastActiveEl.current?.focus?.();
//     };
//   }, [open, onClose]);

//   if (!open) return null;

//   const reduceMotion = document.documentElement.dataset.reduceMotion === "true";

//   return (
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center px-4"
//       aria-hidden={!open}
//     >
//       {/* Backdrop */}
//       <button
//         className={[
//           "absolute inset-0 bg-black/60",
//           reduceMotion ? "" : "transition-opacity duration-200",
//         ].join(" ")}
//         onClick={onClose}
//         aria-label="Close resume preview"
//       />

//       {/* Modal */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-label={title}
//         className={[
//           "relative w-full max-w-4xl rounded-3xl border border-[rgb(var(--border))]",
//           "bg-[rgb(var(--bg))] shadow-soft overflow-hidden",
//           reduceMotion ? "" : "transition-transform duration-200",
//         ].join(" ")}
//         style={{ transform: reduceMotion ? undefined : "translateY(0)" }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
//           <div className="min-w-0">
//             <div className="text-sm font-semibold truncate">{title}</div>
//             <div className="text-xs text-[rgb(var(--muted))] truncate">
//               Preview + download (matches {`iszzy.`} theme)
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <a
//               href={pdfUrl}
//               download
//               className="inline-flex items-center gap-2 rounded-xl bg-[rgb(var(--fg))] text-[rgb(var(--bg))] px-3 py-2 text-sm hover:opacity-90"
//             >
//               <Download size={16} />
//               Download
//             </a>

//             <a
//               href={pdfUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] px-3 py-2 text-sm hover:bg-[rgb(var(--card))]"
//             >
//               <ExternalLink size={16} />
//               New tab
//             </a>

//             <button
//               ref={closeBtnRef}
//               onClick={onClose}
//               className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] w-10 h-10 hover:bg-[rgb(var(--card))]"
//               aria-label="Close"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="bg-[rgb(var(--bg))]">
//           <div className="h-[70vh] w-full">
//             <iframe
//               title="Resume PDF"
//               src={`${pdfUrl}#view=FitH`}
//               className="w-full h-full"
//             />
//           </div>

//           {/* Footer hint */}
//           <div className="px-5 py-3 text-xs text-[rgb(var(--muted))] border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
//             Tip: Use the Accessible Option button (font/contrast/reduce motion). PDF preview depends on browser PDF support.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
