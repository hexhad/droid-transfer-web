/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.0.0",
  dmg: "/downloads/DroidTransfer-2.0.0.dmg",
  size: "2.1 MB",
  sha256: "c3122b60bc3c487eb6dae69065a90388f4dcdc57d42aef4351f71eeeeb3d8b59",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge, which Droid Transfer uses to talk to the phone. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
