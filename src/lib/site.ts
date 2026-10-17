/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.5.0",
  dmg: "/downloads/DroidTransfer-2.5.0.dmg",
  size: "3.8 MB",
  sha256: "45b66ddc928a3e8520020e24d651db161c99f95642bf2d538f716c1cb74bb8d9",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for app installs, screenshots, mirroring and Wi-Fi. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
