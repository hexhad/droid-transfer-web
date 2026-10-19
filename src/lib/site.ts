/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.6.0",
  dmg: "/downloads/DroidTransfer-2.6.0.dmg",
  size: "5.3 MB",
  sha256: "b3f8fdf9231f00dc52e2999910b1ccdce77981faef412f1c34e225277fc87ea3",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for mirroring, Wi-Fi, apps, Logcat, recording and screenshots. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
