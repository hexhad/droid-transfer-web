import { AndroidLogo, AppleLogo, ArrowsLeftRight, Camera, WifiHigh } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { CopyCommand } from "@/components/CopyCommand";
import { HeroDemo } from "@/components/HeroDemo";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/Reveal";
import { ScreenshotTabs } from "@/components/ScreenshotTabs";
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
      <div className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-24">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl xl:text-[3.4rem]">
            Android files on your Mac.
            <span className="block text-[var(--muted)]">Just drag them.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--muted)]">
            Droid Transfer moves photos, videos and folders between your Mac and Android phone, over USB or Wi-Fi.
          </p>
          <div className="mt-9">
            <DownloadButton />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <HeroDemo />
        </Reveal>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">Feels like it came with your Mac.</h2>
        <p className="mx-auto mt-5 max-w-[56ch] leading-relaxed text-[var(--muted)]">
          A sidebar, a path bar, Finder icons and Liquid Glass on macOS 26. Sort, search, rename and delete like you
          already do.
        </p>
      </Reveal>
      <Reveal delay={0.06} className="mt-12">
        <ScreenshotTabs />
      </Reveal>
    </section>
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
            <h3 className="text-xl font-semibold tracking-tight">Your phone, in the sidebar</h3>
            <p className="mt-2 max-w-[48ch] text-[var(--muted)]">
              A live view of the phone&apos;s screen, its battery and free space, right next to its files.
            </p>
          </div>
          <div className="mt-7 flex flex-1 items-end justify-center overflow-hidden bg-[radial-gradient(70%_70%_at_50%_100%,rgb(92_204_143/0.16),transparent)] px-8">
            <Image
              src="/shots/device-panel.png"
              alt="The device panel: a live phone screen, battery level and free storage"
              width={500}
              height={405}
              className="h-auto w-full max-w-[420px] rounded-t-2xl shadow-[0_-10px_60px_rgb(0_0_0/0.4)]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="panel bg-[linear-gradient(150deg,rgb(92_204_143/0.18),transparent_60%)] p-7 md:col-span-2">
          <ArrowsLeftRight size={26} className="text-[var(--accent)]" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">Any file, any size</h3>
          <p className="mt-2 text-[var(--muted)]">
            No 4 GB limit. A long 4K video copies the same way a photo does, with live progress and a Stop button.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="panel p-7 md:col-span-2">
          <WifiHigh size={26} className="text-[var(--accent)]" />
          <h3 className="mt-5 text-lg font-semibold tracking-tight">USB or Wi-Fi</h3>
          <p className="mt-2 text-[var(--muted)]">Pair once with the code from Wireless debugging, then leave the cable in the drawer.</p>
        </Reveal>

        <Reveal className="panel flex items-center gap-5 p-7 md:col-span-2">
          <Image src="/app-icon.png" alt="" width={64} height={64} className="shrink-0" />
          <div>
            <h3 className="text-lg font-semibold tracking-tight">In the menu bar</h3>
            <p className="mt-2 text-[var(--muted)]">Send files to Downloads, check the battery or open the app from the top of the screen.</p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="panel p-7 md:col-span-2">
          <div className="flex gap-2 text-[var(--accent)]">
            <AndroidLogo size={26} />
            <Camera size={26} />
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight">APKs and screenshots</h3>
          <p className="mt-2 text-[var(--muted)]">Drop an APK to install it. Grab the phone&apos;s screen straight to your Mac.</p>
        </Reveal>

        <Reveal delay={0.1} className="panel p-7 md:col-span-2">
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
        <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">Set up in a few minutes.</h2>
      </Reveal>
      <ol className="mt-12 grid gap-10">
        <Reveal>
          <Step n={1} title="Install Google's adb">
            Droid Transfer talks to your phone through adb, Google&apos;s Android Debug Bridge. With Homebrew, run:
            <div className="mt-4">
              <CopyCommand command={adbCommand} />
            </div>
          </Step>
        </Reveal>
        <Reveal delay={0.05}>
          <Step n={2} title="Download and drag into Applications">
            Open the disk image and drag Droid Transfer onto the Applications folder.
          </Step>
        </Reveal>
        <Reveal delay={0.1}>
          <Step n={3} title="Open it the first time">
            Droid Transfer isn&apos;t notarized by Apple. If macOS blocks it, open System Settings, then Privacy &amp;
            Security, and click Open Anyway. Or run this once:
            <div className="mt-4">
              <CopyCommand command={quarantineCommand} />
            </div>
          </Step>
        </Reveal>
        <Reveal delay={0.15}>
          <Step n={4} title="Turn on USB debugging">
            On the phone, open Settings, then About phone, and tap Build number seven times. Turn on USB debugging in
            Developer options, plug in, and tap Allow.
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
              Free for macOS. One download for Apple silicon and Intel Macs. Works with Android 6 and later.
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
      </div>
      <a href="#top" className="hover:text-white">
        Back to top
      </a>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Install />
        <Download />
      </main>
      <Footer />
    </>
  );
}
