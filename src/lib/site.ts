/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.2.0",
  dmg: "/downloads/DroidTransfer-2.2.0.dmg",
  size: "2.6 MB",
  sha256: "328d03b7b06e2f4716c144c21e19972987de4c10fbc1e125c0f1107f2790edce",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for app installs, screenshots, mirroring and Wi-Fi. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
