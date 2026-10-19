"use client";

import {
  AndroidLogo,
  ArrowDown,
  BatteryHigh,
  Camera,
  CaretLeft,
  CaretRight,
  Copy,
  DeviceMobile,
  DotsThreeCircle,
  FileDoc,
  FilePdf,
  Folder,
  FolderPlus,
  GridFour,
  HardDrive,
  Image as ImageIcon,
  ListBullets,
  MagnifyingGlass,
  MusicNote,
  Plugs,
  Record as RecordIcon,
  ShareFat,
  SquaresFour,
  TextAlignLeft,
  FilmStrip,
  type Icon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/**
 * A small working copy of the Droid Transfer window, built in HTML: open folders,
 * go back, switch between list and icons. It stands in for screenshots.
 */

type Item = { name: string; kind: "folder" | "photo" | "video" | "music" | "pdf" | "doc" | "apk"; size?: string; date: string };

const FS: Record<string, Item[]> = {
  "": [
    { name: "DCIM", kind: "folder", date: "Today, 9:12 AM" },
    { name: "Documents", kind: "folder", date: "Yesterday, 6:40 PM" },
    { name: "Download", kind: "folder", date: "Today, 11:02 AM" },
    { name: "Movies", kind: "folder", date: "3 Oct 2026" },
    { name: "Music", kind: "folder", date: "28 Sept 2026" },
    { name: "Pictures", kind: "folder", date: "Today, 8:55 AM" },
  ],
  DCIM: [{ name: "Camera", kind: "folder", date: "Today, 9:12 AM" }],
  "DCIM/Camera": [
    { name: "IMG_2038.jpg", kind: "photo", size: "3.1 MB", date: "Today, 9:02 AM" },
    { name: "IMG_2039.jpg", kind: "photo", size: "2.8 MB", date: "Today, 9:03 AM" },
    { name: "IMG_2040.jpg", kind: "photo", size: "3.4 MB", date: "Today, 9:10 AM" },
    { name: "IMG_2041.jpg", kind: "photo", size: "3.2 MB", date: "Today, 9:12 AM" },
    { name: "VID_2042.mp4", kind: "video", size: "412 MB", date: "Today, 9:12 AM" },
  ],
  Documents: [
    { name: "Lease agreement.pdf", kind: "pdf", size: "1.2 MB", date: "Yesterday, 6:40 PM" },
    { name: "Q3 report.docx", kind: "doc", size: "96 KB", date: "2 Oct 2026" },
  ],
  Download: [
    { name: "app-release.apk", kind: "apk", size: "12 MB", date: "Today, 11:02 AM" },
    { name: "boarding-pass.pdf", kind: "pdf", size: "210 KB", date: "Today, 7:45 AM" },
  ],
  Movies: [{ name: "Beach_4K.mp4", kind: "video", size: "1.9 GB", date: "3 Oct 2026" }],
  Music: [
    { name: "01 Open Road.mp3", kind: "music", size: "6.1 MB", date: "28 Sept 2026" },
    { name: "02 Coastline.mp3", kind: "music", size: "5.4 MB", date: "28 Sept 2026" },
  ],
  Pictures: [],
};

const ICONS: Record<Item["kind"], { Icon: Icon; color: string }> = {
  folder: { Icon: Folder, color: "#62b4f5" },
  photo: { Icon: ImageIcon, color: "#5ccc8f" },
  video: { Icon: FilmStrip, color: "#a78bfa" },
  music: { Icon: MusicNote, color: "#f08fb0" },
  pdf: { Icon: FilePdf, color: "#ef6f6c" },
  doc: { Icon: FileDoc, color: "#5aa9f0" },
  apk: { Icon: AndroidLogo, color: "#5ccc8f" },
};

const PLACES: { name: string; path: string; Icon: Icon }[] = [
  { name: "Internal Storage", path: "", Icon: HardDrive },
  { name: "Camera", path: "DCIM/Camera", Icon: Camera },
  { name: "Pictures", path: "Pictures", Icon: ImageIcon },
  { name: "Downloads", path: "Download", Icon: ArrowDown },
  { name: "Documents", path: "Documents", Icon: FileDoc },
  { name: "Music", path: "Music", Icon: MusicNote },
  { name: "Movies", path: "Movies", Icon: FilmStrip },
];

const EASE = [0.23, 1, 0.32, 1] as const;

export function AppPreview() {
  const [path, setPath] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [view, setView] = useState<"list" | "grid">("list");
  const [selected, setSelected] = useState<string | null>(null);

  const items = FS[path] ?? [];
  const parts = path ? path.split("/") : [];
  const title = parts.at(-1) ?? "Internal Storage";

  const go = (next: string) => {
    if (next === path) return;
    setHistory((h) => [...h, path]);
    setPath(next);
    setSelected(null);
  };
  const back = () => {
    const prev = history.at(-1);
    if (prev === undefined) return;
    setHistory((h) => h.slice(0, -1));
    setPath(prev);
    setSelected(null);
  };
  const open = (item: Item) => (item.kind === "folder" ? go(path ? `${path}/${item.name}` : item.name) : setSelected(item.name));

  return (
    <div
      className="overflow-hidden rounded-[14px] bg-[#1d1f1e] text-[13px] text-white/90 shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_40px_100px_rgb(0_0_0/0.55)]"
      role="application"
      aria-label="Interactive preview of the Droid Transfer window"
    >
      <div className="grid md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-4 bg-[#252827] p-3 md:flex">
          <div className="flex items-center gap-1.5 px-1 pt-1">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <DeviceCard />
          <nav>
            <p className="px-2 pb-1 text-[11px] font-medium text-white/40">Locations</p>
            {PLACES.map((p) => (
              <button
                key={p.name}
                onClick={() => go(p.path)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-150 ${
                  path === p.path ? "bg-white/12 text-white" : "text-white/75 hover:bg-white/5"
                }`}
              >
                <p.Icon size={16} className="text-[var(--accent)]" />
                {p.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-h-[460px] min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5">
            <div className="flex rounded-full bg-white/[0.06] p-0.5">
              <button onClick={back} disabled={!history.length} aria-label="Back" className="press rounded-full p-1.5 disabled:opacity-35">
                <CaretLeft size={14} weight="bold" />
              </button>
              <button disabled aria-label="Forward" className="rounded-full p-1.5 opacity-35">
                <CaretRight size={14} weight="bold" />
              </button>
            </div>
            <span className="min-w-0 flex-1 truncate font-semibold">{title}</span>
            <div className="flex rounded-full bg-white/[0.06] p-0.5">
              {(["list", "grid"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={v === "list" ? "List view" : "Icon view"}
                  aria-pressed={view === v}
                  className={`press rounded-full p-1.5 ${view === v ? "bg-white/12" : "text-white/60"}`}
                >
                  {v === "list" ? <ListBullets size={15} /> : <GridFour size={15} />}
                </button>
              ))}
            </div>
            <div className="hidden gap-3 px-1 text-white/60 sm:flex">
              <FolderPlus size={17} />
              <ShareFat size={17} />
              <DotsThreeCircle size={17} />
              <MagnifyingGlass size={17} />
            </div>
          </div>

          {/* Path bar */}
          <div className="flex items-center gap-1 overflow-x-auto px-3 py-2 text-white/55">
            <button onClick={() => go("")} className="flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 hover:text-white">
              <HardDrive size={13} /> Internal Storage
            </button>
            {parts.map((part, i) => (
              <span key={i} className="flex shrink-0 items-center gap-1">
                <CaretRight size={10} />
                <button
                  onClick={() => go(parts.slice(0, i + 1).join("/"))}
                  className={`rounded px-1.5 py-0.5 ${i === parts.length - 1 ? "bg-white/10 text-white" : "hover:text-white"}`}
                >
                  {part}
                </button>
              </span>
            ))}
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={path + view}
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="h-full"
              >
                {items.length === 0 ? (
                  <p className="pt-20 text-center text-white/40">This folder is empty</p>
                ) : view === "list" ? (
                  <div className="px-2 pb-2">
                    <div className="grid grid-cols-[1fr_auto] gap-4 px-2 py-1.5 text-[11px] font-medium text-white/40 sm:grid-cols-[1fr_150px_70px]">
                      <span>Name</span>
                      <span className="hidden sm:block">Date Modified</span>
                      <span className="text-right">Size</span>
                    </div>
                    {items.map((item, i) => (
                      <Row key={item.name} item={item} odd={i % 2 === 1} selected={selected === item.name} onSelect={() => setSelected(item.name)} onOpen={() => open(item)} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2 p-4">
                    {items.map((item) => (
                      <Tile key={item.name} item={item} selected={selected === item.name} onSelect={() => setSelected(item.name)} onOpen={() => open(item)} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t border-white/[0.06] py-1.5 text-center text-[11.5px] text-white/45">
            {items.length} {items.length === 1 ? "item" : "items"}, 5.9 GB available
          </div>
        </div>
      </div>
    </div>
  );
}

function FileIcon({ kind, size }: { kind: Item["kind"]; size: number }) {
  const { Icon, color } = ICONS[kind];
  return <Icon size={size} weight={kind === "folder" ? "fill" : "duotone"} style={{ color }} />;
}

function Row({ item, odd, selected, onSelect, onOpen }: { item: Item; odd: boolean; selected: boolean; onSelect: () => void; onOpen: () => void }) {
  return (
    <button
      onClick={item.kind === "folder" ? onOpen : onSelect}
      onDoubleClick={onOpen}
      className={`grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-md px-2 py-1.5 text-left sm:grid-cols-[1fr_150px_70px] ${
        selected ? "bg-[var(--accent)]/25" : odd ? "bg-white/[0.03]" : ""
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        <FileIcon kind={item.kind} size={17} />
        <span className="truncate">{item.name}</span>
      </span>
      <span className="hidden text-white/50 sm:block">{item.date}</span>
      <span className="text-right tabular-nums text-white/50">{item.size ?? "--"}</span>
    </button>
  );
}

function Tile({ item, selected, onSelect, onOpen }: { item: Item; selected: boolean; onSelect: () => void; onOpen: () => void }) {
  return (
    <button onClick={item.kind === "folder" ? onOpen : onSelect} onDoubleClick={onOpen} className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center">
      <span className={`flex size-16 items-center justify-center rounded-lg ${selected ? "bg-white/10" : ""}`}>
        <FileIcon kind={item.kind} size={46} />
      </span>
      <span className={`line-clamp-2 rounded px-1 text-[12px] leading-tight ${selected ? "bg-[var(--accent)] text-[var(--accent-ink)]" : ""}`}>{item.name}</span>
    </button>
  );
}

/** The sidebar's device card: phone drawing, name, battery, storage, Mirror Screen. */
/** The sidebar's glass device card, as in the app: phone tile, battery and storage, one-tap tools. */
export function DeviceCard() {
  const tools: { label: string; Icon: Icon }[] = [
    { label: "Mirror", Icon: Copy },
    { label: "Capture", Icon: Camera },
    { label: "Record", Icon: RecordIcon },
    { label: "Apps", Icon: SquaresFour },
    { label: "Logcat", Icon: TextAlignLeft },
  ];
  return (
    <div className="rounded-[14px] bg-white/[0.05] p-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.08)]">
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#5ccc8f,#3f9e6c)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
          <DeviceMobile size={18} weight="fill" className="text-white" />
          <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#3a3d3c] text-white/70">
            <Plugs size={9} weight="bold" />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">Pixel 9 Pro</p>
          <p className="truncate text-[11px] text-white/50">Google · Android 16</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/55">
        <span className="flex items-center gap-1">
          <BatteryHigh size={14} weight="fill" /> 82%
        </span>
        <span>68.4 GB free</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[46%] rounded-full bg-[var(--accent)]" />
      </div>
      <div className="mt-3 grid grid-cols-5">
        {tools.map(({ label, Icon }) => (
          <span key={label} className="flex flex-col items-center gap-1">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/[0.07] text-[var(--accent)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
              <Icon size={14} weight="bold" />
            </span>
            <span className="text-[9px] text-white/50">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A phone outline with an illustrated home screen, in CSS. */
export function PhoneIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[9/19] shrink-0 rounded-[22%/10.5%] bg-[#141716] p-[5%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),0_10px_30px_rgb(0_0_0/0.4)] ${className}`}>
      <div
        className="relative h-full overflow-hidden rounded-[17%/8%]"
        style={{
          background:
            "radial-gradient(90% 45% at 15% 15%, rgb(92 204 143 / 0.75), transparent), radial-gradient(80% 40% at 95% 60%, rgb(47 120 165 / 0.6), transparent), #0d1a14",
        }}
      >
        <span className="absolute left-1/2 top-[3%] size-[6%] -translate-x-1/2 rounded-full bg-black" style={{ aspectRatio: 1 }} />
        <div className="absolute inset-x-[10%] bottom-[22%] grid grid-cols-4 gap-[8%]">
          {["#5ccc8f", "#f2b84b", "#5aa9f0", "#ef6f6c", "#a78bfa", "#2fa56b", "#f08f5a", "#62c6d6"].map((c) => (
            <span key={c} className="aspect-square rounded-[30%]" style={{ background: c }} />
          ))}
        </div>
        <span className="absolute inset-x-[10%] bottom-[8%] h-[5%] rounded-full bg-white/85" />
      </div>
    </div>
  );
}
