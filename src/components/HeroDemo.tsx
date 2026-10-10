"use client";

import { ArrowCounterClockwise, Check, FilePdf, FilmStrip, Image as ImageIcon } from "@phosphor-icons/react";
import { AnimatePresence, animate, motion, useMotionValue, type PanInfo } from "motion/react";
import dynamic from "next/dynamic";
import { useCallback, useRef, useState, useSyncExternalStore, type RefObject } from "react";

const PhoneScene = dynamic(() => import("./PhoneScene"), {
  ssr: false,
  loading: () => <div className="demo-skeleton" />,
});

const reducedMotionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
function subscribeReducedMotion(onChange: () => void) {
  const mq = reducedMotionQuery();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type DemoFile = { id: string; name: string; size: string; seconds: number; Icon: typeof ImageIcon };

const FILES: DemoFile[] = [
  { id: "photo", name: "IMG_2041.jpg", size: "3.2 MB", seconds: 0.9, Icon: ImageIcon },
  { id: "video", name: "Beach_4K.mp4", size: "1.9 GB", seconds: 1.8, Icon: FilmStrip },
  { id: "pdf", name: "boarding-pass.pdf", size: "210 KB", seconds: 0.7, Icon: FilePdf },
];

const EASE = [0.23, 1, 0.32, 1] as const;

type Copy = { file: DemoFile; progress: number; done: boolean };

/** Drag files from the "Mac" tray onto the 3D phone, the way the app works. */
export function HeroDemo() {
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => reducedMotionQuery().matches, () => null);
  const zone = useRef<HTMLDivElement>(null);
  const [targeted, setTargeted] = useState(false);
  const [arrivals, setArrivals] = useState(0);
  const [sent, setSent] = useState<string[]>([]);
  const [copy, setCopy] = useState<Copy | null>(null);

  const send = useCallback((file: DemoFile) => {
    setTargeted(false);
    setCopy({ file, progress: 0, done: false });
    animate(0, 1, {
      duration: file.seconds,
      ease: "linear",
      onUpdate: (progress) => setCopy({ file, progress, done: false }),
      onComplete: () => {
        setArrivals((n) => n + 1);
        setSent((s) => [...s, file.id]);
        setCopy({ file, progress: 1, done: true });
        setTimeout(() => setCopy((c) => (c?.file.id === file.id ? null : c)), 1800);
      },
    });
  }, []);

  const busy = copy !== null && !copy.done;

  return (
    <div className="demo">
      {/* Phone area: everything above the tray. */}
      <div className="absolute inset-x-0 top-0 bottom-[150px]">
        {reduced === null ? (
          <div className="demo-skeleton" />
        ) : (
          <PhoneScene reducedMotion={reduced} arrivals={arrivals} targeted={targeted} />
        )}
        {/* Invisible drop target matching the phone's footprint. */}
        <div ref={zone} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[46%] -translate-x-1/2 -translate-y-1/2" />

        <div className="pointer-events-none absolute inset-x-0 bottom-1 z-10 flex justify-center px-4" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {copy && (
              <motion.div
                key={copy.file.id + (copy.done ? "-done" : "")}
                initial={{ opacity: 0, transform: "translateY(8px) scale(0.96)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                exit={{ opacity: 0, transform: "translateY(4px) scale(0.98)" }}
                transition={{ duration: 0.22, ease: EASE }}
                className="glass-pill flex items-center gap-2.5 py-2 pl-2.5 pr-4 text-sm text-white/90"
              >
                <ProgressRing progress={copy.progress} done={copy.done} />
                {copy.done ? (
                  <span>
                    Copied to <span className="text-white">Download</span> on Pixel 9 Pro
                  </span>
                ) : (
                  <span className="tabular-nums">
                    Copying {copy.file.name} <span className="text-white/55">{Math.round(copy.progress * 100)}%</span>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="pointer-events-none absolute left-5 top-4 text-xs text-white/55">Drag a file onto the phone</p>

      {/* The "Mac" side: files you can drag. */}
      <div className="absolute inset-x-3 bottom-3">
        <div className="glass-tray px-3 pb-3 pt-2.5">
          <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-white/45">
            <span>On your Mac</span>
            {sent.length === FILES.length && !busy && (
              <button
                type="button"
                onClick={() => setSent([])}
                className="press inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-white/70 hover:text-white"
              >
                <ArrowCounterClockwise size={12} weight="bold" />
                Reset
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {FILES.map((file) => (
              <FileChip
                key={file.id}
                file={file}
                zone={zone}
                sent={sent.includes(file.id)}
                disabled={busy || sent.includes(file.id)}
                reduced={!!reduced}
                onHover={setTargeted}
                onSend={send}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FileChip({
  file,
  zone,
  sent,
  disabled,
  reduced,
  onHover,
  onSend,
}: {
  file: DemoFile;
  zone: RefObject<HTMLDivElement | null>;
  sent: boolean;
  disabled: boolean;
  reduced: boolean;
  onHover: (over: boolean) => void;
  onSend: (file: DemoFile) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);

  const overZone = (clientX: number, clientY: number) => {
    const r = zone.current?.getBoundingClientRect();
    return !!r && clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
  };

  /** Flies the chip into the phone, then quietly puts it back in the tray as "sent". */
  const flyIn = async () => {
    const chip = ref.current?.getBoundingClientRect();
    const target = zone.current?.getBoundingClientRect();
    onSend(file);
    if (chip && target && !reduced) {
      const dx = target.left + target.width / 2 - (chip.left + chip.width / 2) + x.get();
      const dy = target.top + target.height / 2 - (chip.top + chip.height / 2) + y.get();
      await Promise.all([
        animate(x, dx, { duration: 0.35, ease: EASE }),
        animate(y, dy, { duration: 0.35, ease: EASE }),
        animate(scale, 0.4, { duration: 0.35, ease: EASE }),
        animate(opacity, 0, { duration: 0.3, ease: EASE }),
      ]);
    }
    x.set(0);
    y.set(0);
    scale.set(1);
    animate(opacity, 1, { duration: 0.25, ease: EASE });
  };

  const onDrag = (e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const p = "clientX" in e ? e : null;
    onHover(p ? overZone(p.clientX, p.clientY) : false);
    void info;
  };

  const onDragEnd = (e: PointerEvent | MouseEvent | TouchEvent) => {
    onHover(false);
    const p = "clientX" in e ? e : "changedTouches" in e ? e.changedTouches[0] : null;
    if (p && overZone(p.clientX, p.clientY)) {
      void flyIn();
    } else {
      animate(x, 0, { type: "spring", duration: 0.45, bounce: 0.2 });
      animate(y, 0, { type: "spring", duration: 0.45, bounce: 0.2 });
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      drag={!disabled}
      dragMomentum={false}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onTap={() => !disabled && void flyIn()}
      whileDrag={{ scale: 1.05, zIndex: 20 }}
      style={{ x, y, scale, opacity }}
      disabled={disabled && !sent}
      aria-label={sent ? `${file.name} copied` : `Copy ${file.name} to the phone`}
      className={`file-chip relative flex min-w-0 flex-col items-start gap-1.5 p-2.5 text-left ${sent ? "opacity-60" : ""}`}
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
        {sent ? <Check size={15} weight="bold" /> : <file.Icon size={16} weight="fill" />}
      </span>
      <span className="w-full truncate text-[12.5px] font-medium text-white/90">{file.name}</span>
      <span className="text-[11px] text-white/45">{sent ? "On the phone" : file.size}</span>
    </motion.button>
  );
}

function ProgressRing({ progress, done }: { progress: number; done: boolean }) {
  const r = 8;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative flex size-5 items-center justify-center">
      <svg viewBox="0 0 20 20" className="absolute inset-0 -rotate-90">
        <circle cx="10" cy="10" r={r} fill="none" stroke="rgb(92 204 143 / 0.25)" strokeWidth="2.5" />
        <circle
          cx="10"
          cy="10"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      {done && <Check size={10} weight="bold" className="relative text-[var(--accent)]" />}
    </span>
  );
}
