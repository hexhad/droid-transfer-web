/** The macOS app. The installer is served from this site (public/downloads). */
export const release = {
  version: "2.4.0",
  dmg: "/downloads/DroidTransfer-2.4.0.dmg",
  size: "3.5 MB",
  sha256: "9fb188d89bd9a9d042f7e8936ba5ff224b146627b87c335d2c9902c5c0e68626",
  minOS: "macOS 13",
};

/** Google's Android Debug Bridge: optional, for app installs, screenshots, mirroring and Wi-Fi. */
export const adbCommand = "brew install --cask android-platform-tools";

/** Clears the "downloaded from the internet" flag so macOS lets the un-notarized app open. */
export const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/DroidTransfer.app";
