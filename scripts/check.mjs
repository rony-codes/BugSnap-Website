// Dependency-free checks: node scripts/check.mjs [--online]
import { readFileSync } from "node:fs";
import { SITE } from "../config.js";
const errs = [];
for (const k of ["repoUrl","releasesUrl","latestReleaseUrl","issuesUrl"]) if (!SITE[k].startsWith("https://github.com/rony-codes/BugSnap")) errs.push(`${k} unexpected: ${SITE[k]}`);
if (SITE.zipUrl && !(SITE.zipUrl.startsWith("https://") && SITE.zipUrl.endsWith(".zip"))) errs.push("zipUrl must be an https .zip URL or empty");
if (!SITE.zipUrl) console.warn("WARN: zipUrl is empty; download buttons fall back to the Releases page.");
for (const f of ["index.html","privacy.html"]) {
  const html = readFileSync(new URL("../"+f, import.meta.url), "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) errs.push(`${f}: missing anchor #${m[1]}`);
  if (!/<title>.+<\/title>/.test(html) || !/name="description"/.test(html)) errs.push(`${f}: missing title/description`);
  if ((html.match(/<h1[\s>]/g)||[]).length !== 1) errs.push(`${f}: need exactly one h1`);
  for (const m of html.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)) errs.push(`${f}: img without alt`);
}
if (process.argv.includes("--online")) {
  for (const u of [SITE.repoUrl, SITE.releasesUrl, SITE.issuesUrl, SITE.zipUrl].filter(Boolean)) {
    try { const r = await fetch(u, { method: "HEAD", redirect: "follow" }); if (!r.ok) errs.push(`${u} -> HTTP ${r.status}`); else console.log("ok", r.status, u); }
    catch (e) { errs.push(`${u} -> ${e.message}`); }
  }
}
if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
console.log("All checks passed.");
