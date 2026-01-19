import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Maximize2 } from "lucide-react";

import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Vite-friendly worker config
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  url: string; // "/resume.pdf"
};

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<any>;
  destroy?: () => void;
};

export default function PdfViewer({ url }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const reduceMotion =
    typeof document !== "undefined" &&
    document.documentElement.dataset.reduceMotion === "true";

  const safeUrl = useMemo(() => url, [url]);

  // Load PDF document
  useEffect(() => {
    let cancelled = false;
    let loadingTask: any;

    (async () => {
      try {
        setErr(null);
        setLoading(true);

        loadingTask = (pdfjsLib as any).getDocument(safeUrl);
        const loadedDoc: PdfDoc = await loadingTask.promise;

        if (cancelled) return;
        setDoc(loadedDoc);
        setNumPages(loadedDoc.numPages);
        setPage(1);
      } catch (e: any) {
        if (cancelled) return;
        setErr(e?.message || "Failed to load PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      try {
        loadingTask?.destroy?.();
      } catch {}
      try {
        (doc as any)?.destroy?.();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeUrl]);

  // Render current page into canvas
  useEffect(() => {
    if (!doc || !canvasRef.current) return;

    let renderTask: any;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const pdfPage = await doc.getPage(page);
        if (cancelled) return;

        const viewport = pdfPage.getViewport({ scale });
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);

        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        renderTask = pdfPage.render({ canvasContext: ctx, viewport });
        await renderTask.promise;
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to render PDF page.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      try {
        renderTask?.cancel?.();
      } catch {}
    };
  }, [doc, page, scale]);

  const fitWidth = async () => {
    if (!doc || !containerRef.current) return;
    const pdfPage = await doc.getPage(page);
    const v1 = pdfPage.getViewport({ scale: 1 });
    const available = containerRef.current.clientWidth - 16; // padding
    const nextScale = Math.max(0.6, Math.min(2.2, available / v1.width));
    setScale(nextScale);
  };

  const zoomIn = () => setScale((s) => Math.min(2.2, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)));

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--bg))]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="mx-auto" size={18} />
          </button>

          <div className="text-sm text-[rgb(var(--muted))]">
            Page{" "}
            <span className="text-[rgb(var(--fg))] font-medium">{page}</span>{" "}
            / {numPages || "…"}
          </div>

          <button
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(numPages || p + 1, p + 1))}
            disabled={numPages ? page >= numPages : true}
            aria-label="Next page"
          >
            <ChevronRight className="mx-auto" size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))]"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <Minus className="mx-auto" size={18} />
          </button>

          <div className="text-sm text-[rgb(var(--muted))] w-16 text-center">
            {Math.round(scale * 100)}%
          </div>

          <button
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))]"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            <Plus className="mx-auto" size={18} />
          </button>

          <button
            className="h-10 px-3 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] text-sm inline-flex items-center gap-2"
            onClick={fitWidth}
            aria-label="Fit to width"
            title="Fit to width"
          >
            <Maximize2 size={16} />
            Fit
          </button>
        </div>
      </div>

      {/* Viewer area */}
      <div
        ref={containerRef}
        className="relative p-2 overflow-auto"
        style={{ height: "70vh" }}
      >
        {err ? (
          <div className="p-4 text-sm text-red-500">
            {err}
            <div className="mt-2 text-xs text-[rgb(var(--muted))]">
              If you see a worker error, tell me the exact console message and I’ll give the exact fix.
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className={[
                "rounded-xl border border-[rgb(var(--border))] bg-white",
                reduceMotion ? "" : "transition",
              ].join(" ")}
            />
          </div>
        )}

        {loading && !err && (
          <div className="absolute inset-x-0 bottom-3 text-center text-xs text-[rgb(var(--muted))]">
            Rendering…
          </div>
        )}
      </div>
    </div>
  );
}
