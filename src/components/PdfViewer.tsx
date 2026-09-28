import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Maximize2,
} from "lucide-react";

import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  url: string;
};

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<any>;
  destroy?: () => void | Promise<void>;
};

export default function PdfViewer({ url }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const safeUrl = useMemo(() => url, [url]);

  const reduceMotion =
    typeof document !== "undefined" &&
    document.documentElement.dataset.reduceMotion === "true";

  useEffect(() => {
    let cancelled = false;
    let loadingTask: any;
    let loadedDocument: PdfDoc | null = null;

    const loadPdf = async () => {
      try {
        setLoading(true);
        setErr(null);
        setDoc(null);
        setNumPages(0);
        setPage(1);

        const response = await fetch(safeUrl, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Could not load resume. Server returned ${response.status} ${response.statusText}.`,
          );
        }

        const arrayBuffer = await response.arrayBuffer();

        if (arrayBuffer.byteLength < 5) {
          throw new Error("The resume file is empty or invalid.");
        }

        const bytes = new Uint8Array(arrayBuffer);

        const signature = String.fromCharCode(
          bytes[0],
          bytes[1],
          bytes[2],
          bytes[3],
          bytes[4],
        );

        if (signature !== "%PDF-") {
          throw new Error(
            "The server did not return a PDF file. Check that the PDF exists inside the public folder and that the URL is correct.",
          );
        }

        loadingTask = (pdfjsLib as any).getDocument({
          data: bytes,
        });

        const pdf = (await loadingTask.promise) as PdfDoc;

        loadedDocument = pdf;

        if (cancelled) {
          await pdf.destroy?.();
          return;
        }

        setDoc(pdf);
        setNumPages(pdf.numPages);
        setPage(1);
      } catch (error: any) {
        if (cancelled) return;

        console.error("Resume PDF loading failed:", error);

        setErr(
          error?.message ||
            "The resume could not be loaded. Please try downloading it instead.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;

      try {
        loadingTask?.destroy?.();
      } catch {
        // Ignore cleanup errors.
      }

      try {
        loadedDocument?.destroy?.();
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, [safeUrl]);

  useEffect(() => {
    if (!doc || !canvasRef.current) return;

    let renderTask: any;
    let cancelled = false;

    const renderPage = async () => {
      try {
        setLoading(true);
        setErr(null);

        const pdfPage = await doc.getPage(page);

        if (cancelled) return;

        const viewport = pdfPage.getViewport({ scale });

        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas rendering is not supported.");
        }

        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);

        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
      } catch (error: any) {
        if (cancelled) return;

        if (error?.name === "RenderingCancelledException") {
          return;
        }

        console.error("Resume PDF rendering failed:", error);

        setErr(error?.message || "The resume page could not be rendered.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      cancelled = true;

      try {
        renderTask?.cancel?.();
      } catch {
        // Ignore cancelled renders.
      }
    };
  }, [doc, page, scale]);

  const previousPage = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const nextPage = () => {
    setPage((current) => Math.min(numPages || current, current + 1));
  };

  const zoomIn = () => {
    setScale((current) => Math.min(2.2, +(current + 0.1).toFixed(2)));
  };

  const zoomOut = () => {
    setScale((current) => Math.max(0.6, +(current - 0.1).toFixed(2)));
  };

  const fitWidth = async () => {
    if (!doc || !containerRef.current) return;

    try {
      const pdfPage = await doc.getPage(page);

      const defaultViewport = pdfPage.getViewport({
        scale: 1,
      });

      const availableWidth = containerRef.current.clientWidth - 16;

      const nextScale = availableWidth / defaultViewport.width;

      setScale(Math.max(0.6, Math.min(2.2, nextScale)));
    } catch (error) {
      console.error("Could not fit PDF to width:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] overflow-hidden bg-[rgb(var(--bg))]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousPage}
            disabled={page <= 1}
            aria-label="Previous page"
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] disabled:opacity-50"
          >
            <ChevronLeft className="mx-auto" size={18} />
          </button>

          <div className="text-sm text-[rgb(var(--muted))]">
            Page{" "}
            <span className="font-medium text-[rgb(var(--fg))]">{page}</span> /{" "}
            {numPages || "…"}
          </div>

          <button
            type="button"
            onClick={nextPage}
            disabled={!numPages || page >= numPages}
            aria-label="Next page"
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] disabled:opacity-50"
          >
            <ChevronRight className="mx-auto" size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))]"
          >
            <Minus className="mx-auto" size={18} />
          </button>

          <div className="w-16 text-center text-sm text-[rgb(var(--muted))]">
            {Math.round(scale * 100)}%
          </div>

          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="w-10 h-10 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))]"
          >
            <Plus className="mx-auto" size={18} />
          </button>

          <button
            type="button"
            onClick={fitWidth}
            aria-label="Fit to width"
            title="Fit to width"
            className="h-10 px-3 rounded-xl border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))] text-sm inline-flex items-center gap-2"
          >
            <Maximize2 size={16} />
            Fit
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative p-2 overflow-auto"
        style={{ height: "70vh" }}
      >
        {err ? (
          <div className="flex min-h-[300px] items-center justify-center p-6">
            <div className="max-w-md text-center">
              <p className="text-sm font-medium text-red-500">
                Resume preview unavailable
              </p>

              <p className="mt-2 text-xs leading-5 text-[rgb(var(--muted))]">
                {err}
              </p>

              <a
                href={safeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-xl border border-[rgb(var(--border))] px-4 py-2 text-sm hover:bg-[rgb(var(--card))]"
              >
                Open PDF directly
              </a>
            </div>
          </div>
        ) : (
          <div className="flex min-w-max justify-center">
            <canvas
              ref={canvasRef}
              className={[
                "rounded-xl border border-[rgb(var(--border))] bg-white shadow-sm",
                reduceMotion ? "" : "transition",
              ].join(" ")}
            />
          </div>
        )}

        {loading && !err && (
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <div className="mb-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1.5 text-xs text-[rgb(var(--muted))] shadow-sm">
              Rendering…
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
