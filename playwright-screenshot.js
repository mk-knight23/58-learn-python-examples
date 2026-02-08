import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({
    headless: true,
    devtools: false
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  // Capture console logs
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.error('Page error:', error.message);
  });

  try {
    await page.goto('http://localhost:5175', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for the app to fully load
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({
      path: '/Users/mkazi/60 Projects/screenshots/starters/starter-58.png',
      fullPage: true
    });

    console.log('Screenshot saved successfully');

    // Get page title
    const title = await page.title();
    console.log('Page title:', title);

    // Check for any visible errors
    const errorElements = await page.$$eval('.error, [role="alert"], .alert', elements =>
      elements.map(el => el.textContent)
    );

    if (errorElements.length > 0) {
      console.log('Error elements found:', errorElements);
    } else {
      console.log('No error elements found');
    }

  } catch (error) {
    console.error('Error during screenshot:', error);
    process.exit(1);
  }

  await browser.close();
})();
