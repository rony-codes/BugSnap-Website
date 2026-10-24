// Single source of truth for the BugSnap beta site.
// Edit this file only when publishing a new beta.
// Note: `displayVersion` is the website label. It is NOT Chrome's numeric
// manifest version (manifest.json currently says "0.1.0").
export const SITE = {
  displayVersion: "v0.1.0-beta.1",
  repoUrl: "https://github.com/rony-codes/BugSnap",
  releasesUrl: "https://github.com/rony-codes/BugSnap/releases",
  latestReleaseUrl: "https://github.com/rony-codes/BugSnap/releases/latest",
  issuesUrl: "https://github.com/rony-codes/BugSnap/issues",
  backendUrl: "https://bugsnap-9nc9.onrender.com",
  zipFilename: "bugsnap-beta-v0.1.0-beta.1.zip",
  // TODO (required before launch): paste the real release-asset URL, e.g.
  // https://github.com/rony-codes/BugSnap/releases/download/<tag>/<zipFilename>
  // Leave "" until the asset exists. While empty, every download button opens
  // the Releases page and says so, instead of linking to a missing file.
  zipUrl: "",
  copyrightHolder: "Rohan Kumar",
  year: 2026,
};
