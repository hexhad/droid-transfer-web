/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.3.0",
  dmg: "/downloads/DroidTransfer-2.3.0.dmg",
  size: "3.4 MB",
  sha256: "ef30a5f22ea0fd64d6d9c32a14e916a5800d0e0987153e0c68628489c727dea6",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for app installs, screenshots, mirroring and Wi-Fi. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
