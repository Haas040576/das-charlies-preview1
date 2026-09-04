import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const base = process.env.CHARLIES_PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', error => errors.push(error.message));

  const response = await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/charlies-${viewport.name}.png`, fullPage: false });

  const checks = await page.evaluate(() => ({
    title: document.title,
    textLength: document.body.innerText.trim().length,
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    heroHeight: Math.round(document.querySelector('.hero')?.getBoundingClientRect().height || 0),
    imageCount: document.images.length,
    incompleteImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
    activeDayScene: [...document.querySelectorAll('.day-scene')].findIndex(scene => Number(getComputedStyle(scene).opacity) > .5)
  }));

  await page.locator('#menu').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.getByRole('tab', { name: 'Lunch', exact: true }).click();
  const lunchVisible = await page.locator('#panel-lunch').isVisible();

  if (viewport.name === 'mobile') {
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator('.menu-toggle').click();
    checks.mobileMenuVisible = await page.locator('.mobile-nav').evaluate(node => getComputedStyle(node).pointerEvents === 'auto');
  }

  results.push({ viewport: viewport.name, status: response?.status(), errors, lunchVisible, ...checks });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
