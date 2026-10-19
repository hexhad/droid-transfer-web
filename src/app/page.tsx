import {
  AndroidLogo,
  AppleLogo,
  ArrowClockwise,
  ArrowsLeftRight,
  Bug,
  Camera,
  CaretLeft,
  Check,
  Circle,
  Clipboard,
  Minus,
  Plug,
  Power,
  Record as RecordIcon,
  SpeakerSimpleHigh,
  Square,
  SquaresFour,
  TextAlignLeft,
  Usb,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { CopyCommand } from "@/components/CopyCommand";
import { MadeByHexhad } from "@/components/Hexhad";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/Reveal";
import { AppPreview, PhoneIllustration } from "@/components/AppPreview";
import { DownloadGradient, LiquidMark } from "@/components/Visuals";
import { adbCommand, quarantineCommand, release } from "@/lib/site";

/** The one download action on the page; every "Download" button uses this. */
function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={release.dmg}
      className={`press btn-primary inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-[15px] font-semibold ${className}`}
    >
      <AppleLogo size={18} weight="fill" />
      Download for Mac
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <LiquidGlass className="flex w-full max-w-3xl items-center justify-between gap-4 py-2 pl-4 pr-2">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image src="/app-icon.png" alt="" width={28} height={28} priority />
          Droid Transfer
        </a>
        <nav className="flex items-center gap-1 text-sm text-white/70">
          <a href="#connect" className="press hidden rounded-full px-3 py-2 hover:text-white sm:block">
            Connect
          </a>
          <a href="#features" className="press hidden rounded-full px-3 py-2 hover:text-white sm:block">
            Features
          </a>
          <a href="#install" className="press hidden rounded-full px-3 py-2 hover:text-white sm:block">
            Install
          </a>
          <a
            href={release.dmg}
            className="press btn-primary ml-1 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-semibold"
          >
            <AppleLogo size={16} weight="fill" />
            <span className="hidden sm:inline">Download for Mac</span>
            <span className="sm:hidden">Download</span>
          </a>
        </nav>
      </LiquidGlass>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="hero-glow" />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:pt-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="glass-pill mx-auto inline-flex items-center gap-2 px-3.5 py-1.5 text-[13px] text-white/80">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            New in {release.version}: Apps, Logcat and screen recording, like Android Studio
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            Android files on your Mac.
            <span className="block text-[var(--muted)]">Plug in and drag.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
            Choose File transfer on your phone and Droid Transfer opens with your photos, videos and folders. Copy
            either way, over USB or Wi-Fi.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <DownloadButton />
            <span className="text-sm text-white/45">
              Free, {release.size}, {release.minOS} or later
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mx-auto mt-16 max-w-5xl">
          <AppPreview />
          <p className="mt-4 text-center text-sm text-white/45">Click a folder to open it, or switch to icons.</p>
        </Reveal>
      </div>
    </section>
  );
}

type Mode = { title: string; Icon: typeof Plug; setup: string; note: string };

const MODES: Mode[] = [
  {
    title: "File transfer",
    Icon: Plug,
    setup: "Unlock the phone and pick File transfer in the USB notification.",
    note: "Nothing to install, nothing to turn on.",
  },
  {
    title: "USB debugging",
    Icon: Bug,
    setup: "Turn on USB debugging once in Developer options, and add Google's adb on the Mac.",
    note: "Everything in File transfer, plus the extras.",
  },
];

const ABILITIES: { label: string; transfer: boolean }[] = [
  { label: "Browse, search and sort", transfer: true },
  { label: "Copy to and from the Mac", transfer: true },
  { label: "New folder, rename, move, delete", transfer: true },
  { label: "Battery and free storage", transfer: true },
  { label: "Install APKs and take screenshots", transfer: false },
  { label: "Mirror and control the screen, with sound", transfer: false },
  { label: "Manage apps, read Logcat, record the screen", transfer: false },
  { label: "Connect over Wi-Fi", transfer: false },
];

function Modes() {
  return (
    <section id="connect" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">Two ways to connect. Both just work.</h2>
        <p className="mx-auto mt-5 max-w-[56ch] leading-relaxed text-[var(--muted)]">
          Start with File transfer, the mode every Android phone already has. Turn on USB debugging when you want
          more, and Droid Transfer switches over by itself.
        </p>
      </Reveal>

      <Reveal delay={0.06} className="panel mx-auto mt-12 max-w-4xl overflow-hidden">
        <div className="grid grid-cols-[1fr_5.5rem_5.5rem] sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex items-end p-4 text-xs text-white/45 sm:p-6 sm:text-sm">What you can do</div>
          {MODES.map(({ title, Icon, setup, note }, i) => (
            <div
              key={title}
              className={`border-l border-[var(--line)] px-3 py-4 sm:p-6 ${i === 0 ? "bg-[linear-gradient(180deg,rgb(92_204_143/0.12),transparent)]" : ""}`}
            >
              <Icon size={22} className="text-[var(--accent)]" />
              <h3 className="mt-3 text-sm font-semibold tracking-tight sm:text-base">{title}</h3>
              <p className="mt-1.5 hidden text-sm leading-relaxed text-[var(--muted)] sm:block">{setup}</p>
              <p className="mt-2 hidden text-xs text-white/45 sm:block">{note}</p>
            </div>
          ))}
          {ABILITIES.map(({ label, transfer }) => (
            <Row key={label} label={label} transfer={transfer} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Row({ label, transfer }: { label: string; transfer: boolean }) {
  const yes = <Check size={18} weight="bold" className="text-[var(--accent)]" aria-label="Yes" />;
  const no = <Minus size={18} weight="bold" className="text-white/25" aria-label="No" />;
  return (
    <>
      <div className="border-t border-[var(--line)] px-4 py-3.5 text-sm sm:px-6 sm:py-4">{label}</div>
      <div className="flex items-center justify-center border-l border-t border-[var(--line)]">{transfer ? yes : no}</div>
      <div className="flex items-center justify-center border-l border-t border-[var(--line)]">{yes}</div>
    </>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tighter md:text-5xl">More than drag and drop.</h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Reveal className="panel flex flex-col md:col-span-4 md:row-span-2">
          <div className="p-7 pb-0">
            <h3 className="text-xl font-semibold tracking-tight">Mirror and control your phone</h3>
            <p className="mt-2 max-w-[50ch] text-[var(--muted)]">
              Open the phone&apos;s screen in a window as smooth, full-resolution video at up to 60 fps, with its
              sound. Click to tap, drag to swipe, type or paste from your keyboard, and copy on the phone to paste on
              the Mac. Power, volume, rotate, screenshot and record sit on a rail beside the screen, one click each.
              It only runs while that window is open. Needs USB debugging.
            </p>
          </div>
          <div className="mt-7 flex flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(70%_70%_at_50%_100%,rgb(92_204_143/0.16),transparent)] px-8">
            <div className="w-[230px] rounded-t-[16px] bg-[#1d1f1e] shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_-10px_60px_rgb(0_0_0/0.4)]">
              <div className="flex items-center gap-1.5 px-3 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-xs font-semibold text-white/80">Pixel 9 Pro</span>
              </div>
              <div className="flex items-start gap-2.5 bg-black/60 px-4 pb-4 pt-3">
                <PhoneIllustration className="w-[150px]" />
                <div className="flex flex-col gap-2 text-white/85">
                  {[
                    [Power, SpeakerSimpleHigh, ArrowClockwise],
                    [Camera, RecordIcon, Clipboard],
                    [CaretLeft, Circle, Square],
                  ].map((group, i) => (
                    <div key={i} className="glass-pill flex flex-col gap-0.5 px-1 py-1">
                      {group.map((Icon, j) => (
                        <span key={j} className="flex size-7 items-center justify-center">
                          <Icon size={13} weight="bold" />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="panel bg-[linear-gradient(150deg,rgb(92_204_143/0.18),transparent_60%)] p-7 md:col-span-2">
          <ArrowsLeftRight size={26} className="text-[var(--accent)]" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Any file, any size</h3>
          <p className="mt-2 text-[var(--muted)]">
            A 15 GB video copies the same way a photo does, with live progress and a Stop button.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="panel p-7 md:col-span-2">
          <WifiHigh size={26} className="text-[var(--accent)]" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">USB or Wi-Fi</h3>
          <p className="mt-2 text-[var(--muted)]">Pair like Android Studio: scan a QR code or pick the phone and type its pairing code. Paired phones reconnect by themselves.</p>
        </Reveal>

        <Reveal className="panel overflow-hidden md:col-span-6">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-3">
            <div className="bg-[var(--bg-raised)] p-7">
              <SquaresFour size={26} className="text-[var(--accent)]" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Apps</h3>
              <p className="mt-2 text-[var(--muted)]">
                Every installed app with its version. Open, force stop, clear data, uninstall, or save the APK to your
                Mac.
              </p>
              <ul className="mt-5 grid gap-1.5 font-mono text-xs text-white/70">
                {[
                  ["com.example.notes", "4.2.1"],
                  ["com.example.maps", "11.80"],
                  ["com.example.camera", "9.3.0"],
                ].map(([pkg, ver]) => (
                  <li key={pkg} className="flex justify-between gap-3 rounded-md bg-white/[0.04] px-2.5 py-1.5">
                    <span className="truncate">{pkg}</span>
                    <span className="text-white/40">{ver}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--bg-raised)] p-7">
              <TextAlignLeft size={26} className="text-[var(--accent)]" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Logcat</h3>
              <p className="mt-2 text-[var(--muted)]">
                The phone&apos;s live log, colour-coded by level. Filter by level, text or app; pause, clear and save.
              </p>
              <ul className="mt-5 grid gap-1 font-mono text-[11px]">
                {(
                  [
                    ["I", "ActivityManager", "Start proc 4182", "text-[var(--accent)]"],
                    ["D", "NotesSync", "synced 12 notes", "text-sky-400"],
                    ["W", "Battery", "temperature high", "text-amber-400"],
                    ["E", "Camera", "open failed", "text-red-400"],
                  ] as const
                ).map(([level, tag, msg, tone]) => (
                  <li key={tag} className="flex gap-2 overflow-hidden whitespace-nowrap">
                    <span className={`w-3 shrink-0 font-bold ${tone}`}>{level}</span>
                    <span className={`w-28 shrink-0 truncate ${tone}`}>{tag}</span>
                    <span className="truncate text-white/60">{msg}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--bg-raised)] p-7">
              <RecordIcon size={26} className="text-[var(--accent)]" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">Record the screen</h3>
              <p className="mt-2 text-[var(--muted)]">
                Record the phone&apos;s screen to an MP4 on your Mac, up to three minutes, shown in Finder when done.
              </p>
              <div className="mt-5 flex items-center justify-between rounded-full bg-red-500/[0.14] px-3.5 py-2 text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-500" />
                  Recording 0:42
                </span>
                <span className="font-semibold">Stop</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="kbd">⌥⌘A</span>
                <span className="kbd">⌥⌘L</span>
                <span className="kbd">⌥⌘R</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="panel p-7 md:col-span-3">
          <Usb size={26} className="text-[var(--accent)]" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Opens when you plug in</h3>
          <p className="mt-2 text-[var(--muted)]">
            Connect your phone and the window comes up on its own, right where you left off. Turn it off in Settings.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="panel flex items-center gap-5 p-7 md:col-span-3">
          <Image src="/app-icon.png" alt="" width={64} height={64} className="shrink-0" />
          <div>
            <h3 className="text-lg font-semibold tracking-tight">In the menu bar</h3>
            <p className="mt-2 text-[var(--muted)]">Send files to Downloads, check the battery or open the app from the top of the screen.</p>
          </div>
        </Reveal>

        <Reveal className="panel p-7 md:col-span-3">
          <div className="flex gap-2 text-[var(--accent)]">
            <AndroidLogo size={26} />
            <Camera size={26} />
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">APKs and screenshots</h3>
          <p className="mt-2 text-[var(--muted)]">
            With USB debugging on, drop an APK to install it, or grab the phone&apos;s screen straight to your Mac.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="panel p-7 md:col-span-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="kbd">⌘I</span>
            <span className="kbd">⌘E</span>
            <span className="kbd">⇧⌘N</span>
            <span className="kbd">⌘⌫</span>
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Keyboard first</h3>
          <p className="mt-2 text-[var(--muted)]">Copy in, copy out, new folder, delete. The shortcuts you&apos;d guess.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="scroll-mt-24 mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">Set up in a minute.</h2>
      </Reveal>
      <ol className="mt-12 grid gap-10">
        <Reveal>
          <Step n={1} title="Download and drag into Applications">
            Open the disk image and drag Droid Transfer onto the Applications folder.
          </Step>
        </Reveal>
        <Reveal delay={0.05}>
          <Step n={2} title="Open it the first time">
            Droid Transfer isn&apos;t notarized by Apple. If macOS blocks it, open System Settings, then Privacy &amp;
            Security, and click Open Anyway. Or run this once:
            <div className="mt-4">
              <CopyCommand command={quarantineCommand} />
            </div>
          </Step>
        </Reveal>
        <Reveal delay={0.1}>
          <Step n={3} title="Plug in and choose File transfer">
            Unlock the phone, tap the USB notification and pick File transfer. Your files show up straight away. Only
            one app can use the phone at a time, so quit Android File Transfer if it opens too.
          </Step>
        </Reveal>
        <Reveal delay={0.15}>
          <Step n={4} title="Optional: turn on USB debugging for the extras">
            For mirroring, Wi-Fi, apps, Logcat, screen recording, APKs and screenshots, install Google&apos;s adb:
            <div className="mt-4">
              <CopyCommand command={adbCommand} />
            </div>
            <p className="mt-4">
              Then on the phone, open Settings, then About phone, and tap Build number seven times. Turn on USB
              debugging in Developer options and tap Allow.
            </p>
          </Step>
        </Reveal>
      </ol>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2.25rem_1fr] gap-4">
      <span className="flex size-9 items-center justify-center rounded-full bg-white/5 font-mono text-sm text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--line)]">
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <div className="mt-1.5 leading-relaxed text-[var(--muted)]">{children}</div>
      </div>
    </li>
  );
}

function Download() {
  return (
    <section id="download" className="scroll-mt-24 px-4 pb-24 sm:px-6">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-panel)] shadow-[inset_0_0_0_1px_var(--line)]">
        <DownloadGradient />
        <div className="relative z-10 grid items-center gap-10 px-6 py-16 md:grid-cols-[auto_1fr] md:px-14 md:py-20">
          <div className="mx-auto">
            <LiquidMark size={260} />
          </div>
          <div>
            <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tighter md:text-5xl">Your Android phone, one drag away.</h2>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-white/75">
              Free for macOS. One download for Apple silicon and Intel Macs. Works with any Android phone that offers File
              transfer, and Android 6 or later over USB debugging.
            </p>
            <div className="mt-8">
              <DownloadButton />
            </div>
            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-white/50">Version</dt>
                <dd className="mt-0.5 font-mono">{release.version}</dd>
              </div>
              <div>
                <dt className="text-white/50">Requires</dt>
                <dd className="mt-0.5">{release.minOS} or later</dd>
              </div>
              <div>
                <dt className="text-white/50">Size</dt>
                <dd className="mt-0.5">{release.size}</dd>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-white/50">SHA-256</dt>
                <dd className="mt-0.5 break-all font-mono text-xs text-white/70">{release.sha256}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[var(--line)] px-4 py-10 text-sm text-[var(--muted)] sm:flex-row sm:px-6">
      <div className="flex items-center gap-2.5">
        <Image src="/app-icon.png" alt="" width={22} height={22} />
        <span>Droid Transfer for macOS</span>
        <MadeByHexhad />
      </div>
      <div className="flex items-center gap-6">
        <span>© {new Date().getFullYear()} HEXHAD</span>
        <a href="#top" className="hover:text-white">
          Back to top
        </a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Modes />
        <Features />
        <Install />
        <Download />
      </main>
      <Footer />
    </>
  );
}
