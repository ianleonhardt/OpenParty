// Screenshot a URL using the system Chrome via puppeteer-core.
// Usage: node screenshot.mjs http://localhost:3000 [label]
// Saves to ./temporary screenshots/screenshot-N.png (auto-incremented, never overwritten)
// With a label: screenshot-N-label.png
import puppeteer from 'puppeteer-core';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = join(import.meta.dirname, 'temporary screenshots');

const url = process.argv[2];
const label = process.argv[3];
if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

// Next free number: one past the highest existing screenshot-N
const existing = await readdir(OUT_DIR);
const n = Math.max(0, ...existing.map(f => Number(f.match(/^screenshot-(\d+)/)?.[1] ?? 0))) + 1;
const outPath = join(OUT_DIR, `screenshot-${n}${label ? `-${label}` : ''}.png`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(outPath);
} finally {
  await browser.close();
}
