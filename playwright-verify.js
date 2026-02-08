import { chromium } from 'playwright';

const urls = [
  'https://58-starter-python-examples.vercel.app',
  'https://web-apps-7e3fa.web.app'
];

async function verifyUrl(url) {
  console.log(`\n=== Verifying: ${url} ===`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  let errors = [];
  let consoleLogs = [];

  page.on('console', msg => {
    const log = `[${msg.type()}] ${msg.text()}`;
    consoleLogs.push(log);
    if (msg.type() === 'error') {
      errors.push(log);
    }
  });

  page.on('pageerror', error => {
    errors.push(`Page error: ${error.message}`);
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log('Page title:', title);

    // Check for main content
    const content = await page.$eval('body', el => el.textContent);
    const hasContent = content && content.length > 100;
    console.log('Has content:', hasContent);

    // Check for error elements
    const errorElements = await page.$$eval('.error, [role="alert"], .alert', els => els.length);
    console.log('Error elements found:', errorElements);

    if (errors.length > 0) {
      console.log('Console errors:', errors);
    } else {
      console.log('No console errors');
    }

    const success = hasContent && errors.length === 0 && errorElements === 0;
    console.log('Verification:', success ? 'PASSED' : 'FAILED');

    await browser.close();
    return { url, success, title, errors: errors.length };

  } catch (error) {
    console.error('Verification error:', error.message);
    await browser.close();
    return { url, success: false, error: error.message };
  }
}

(async () => {
  const results = [];
  for (const url of urls) {
    const result = await verifyUrl(url);
    results.push(result);
  }

  console.log('\n=== SUMMARY ===');
  results.forEach(r => {
    console.log(`${r.success ? '✓' : '✗'} ${r.url} - ${r.success ? 'PASSED' : 'FAILED'}`);
  });

  const allPassed = results.every(r => r.success);
  process.exit(allPassed ? 0 : 1);
})();
