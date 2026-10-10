"use client";

import { GridFour, ListBullets } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const VIEWS = [
  { id: "list", label: "List", Icon: ListBullets, src: "/shots/list.png", alt: "Droid Transfer showing a phone's Camera folder as a sortable list" },
  { id: "grid", label: "Icons", Icon: GridFour, src: "/shots/grid.png", alt: "Droid Transfer showing a phone's internal storage as icons" },
] as const;

/** The real app, switchable between its list and icon views like the toolbar control it mirrors. */
export function ScreenshotTabs() {
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("list");

  return (
    <div>
      <div role="tablist" aria-label="App view" className="glass-pill mx-auto flex w-fit gap-1 p-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className="press relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm"
          >
            {view === v.id && (
              <motion.span
                layoutId="view-pill"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              />
            )}
            <v.Icon size={16} className="relative" />
            <span className="relative">{v.label}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid">
        {VIEWS.map((v) => (
          <Image
            key={v.id}
            src={v.src}
            alt={v.alt}
            width={2080}
            height={1320}
            sizes="(min-width: 1280px) 1200px, 100vw"
            aria-hidden={view !== v.id}
            className="col-start-1 row-start-1 h-auto w-full rounded-[14px] shadow-[0_40px_100px_rgb(0_0_0/0.5)] transition-[opacity,filter] duration-300 ease-out"
            style={{ opacity: view === v.id ? 1 : 0, filter: view === v.id ? "blur(0px)" : "blur(4px)" }}
          />
        ))}
      </div>
    </div>
  );
}
