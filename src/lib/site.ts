/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.1.0",
  dmg: "/downloads/DroidTransfer-2.1.0.dmg",
  size: "2.2 MB",
  sha256: "f12a267ae0091d00f75a1a405a786c503083342123e23869c2b83e582e270131",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge, which Droid Transfer uses to talk to the phone. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
