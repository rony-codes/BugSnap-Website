import { SITE } from "./config.js";

const isHttps = (u) => { try { return new URL(u).protocol === "https:"; } catch { return false; } };
const hasZip = isHttps(SITE.zipUrl) && SITE.zipUrl.endsWith(".zip");
const downloadHref = hasZip ? SITE.zipUrl : SITE.releasesUrl;

const text = {
  version: SITE.displayVersion, filename: SITE.zipFilename,
  year: String(SITE.year), holder: SITE.copyrightHolder, backend: SITE.backendUrl,
};
document.querySelectorAll("[data-text]").forEach((el) => { el.textContent = text[el.dataset.text] ?? ""; });
document.querySelectorAll("[data-href]").forEach((el) => {
  el.href = { repo: SITE.repoUrl, releases: SITE.releasesUrl, latest: SITE.latestReleaseUrl, issues: SITE.issuesUrl }[el.dataset.href];
});
document.querySelectorAll("[data-download]").forEach((el) => {
  el.href = downloadHref;
  if (hasZip) el.setAttribute("download", SITE.zipFilename);
  const label = el.querySelector("[data-label]");
  if (label && !hasZip) label.textContent = el.dataset.fallbackLabel || "Open beta releases";
});
document.querySelectorAll("[data-download-note]").forEach((el) => {
  el.textContent = hasZip
    ? `Downloads ${SITE.zipFilename} from the official GitHub release.`
    : "The release ZIP has not been published yet. This button opens the Releases page, where the ZIP will be attached once available.";
});

// Copy chrome://extensions
const copyBtn = document.getElementById("copy-ext");
const status = document.getElementById("copy-status");
copyBtn?.addEventListener("click", async () => {
  const value = "chrome://extensions";
  try {
    await navigator.clipboard.writeText(value);
    status.textContent = "Copied chrome://extensions. Paste it into Chrome's address bar.";
    copyBtn.dataset.state = "done";
  } catch {
    const code = document.getElementById("ext-address");
    const r = document.createRange(); r.selectNodeContents(code);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    status.textContent = "Copy was blocked. The address is selected: press Ctrl+C (Cmd+C on Mac).";
    copyBtn.dataset.state = "error";
  }
  setTimeout(() => { delete copyBtn.dataset.state; }, 2500);
});
