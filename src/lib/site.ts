/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.2.1",
  dmg: "/downloads/DroidTransfer-2.2.1.dmg",
  size: "2.6 MB",
  sha256: "669d83d801efea6cf25ae421f5344d3e0efbd41f0c3a1e583010064d46a8f000",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for app installs, screenshots, mirroring and Wi-Fi. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
