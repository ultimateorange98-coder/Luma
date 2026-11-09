const { chromium } = require('playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 3333;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 667 }
];

const PAGES = [
  { file: 'index.html', title: 'Home' },
  { file: 'how-it-works.html', title: 'How It Works' },
  { file: 'business-registration.html', title: 'Business Registration' },
  { file: 'managed-compliance.html', title: 'Managed Compliance' },
  { file: 'pricing.html', title: 'Pricing' },
  { file: 'about.html', title: 'About LUMA' },
  { file: 'resources.html', title: 'Resources' },
  { file: 'faq.html', title: 'FAQ' },
  { file: 'contact.html', title: 'Contact' }
];

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      const filePath = path.join(ROOT_DIR, reqPath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
          res.end(content);
        }
      });
    });

    server.listen(PORT, '127.0.0.1', () => {
      console.log(`🌐 Audit HTTP server running at http://127.0.0.1:${PORT}/`);
      resolve(server);
    });
  });
}

async function runAudit() {
  console.log('==================================================');
  console.log('🚀 LUMA PLAYWRIGHT MULTI-VIEWPORT VERIFICATION');
  console.log('==================================================');

  const server = await startServer();

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    timestamp: new Date().toISOString(),
    pagesTested: PAGES.length,
    viewportsTested: VIEWPORTS.length,
    screenshotsCaptured: [],
    functionalTests: [],
    consoleErrors: [],
    overflowIssues: []
  };

  const screenshotsDir = path.join(ROOT_DIR, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });

  // 1. Audit Pages
  for (const pageInfo of PAGES) {
    const pageUrl = `http://127.0.0.1:${PORT}/${pageInfo.file}`;
    console.log(`\n📄 Auditing [${pageInfo.title}] -> ${pageInfo.file}`);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(100);

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (overflow) {
        console.warn(`  ⚠️ Horizontal overflow detected on ${pageInfo.file} at ${vp.name}`);
        results.overflowIssues.push({ page: pageInfo.file, viewport: vp.name });
      }

      if (['desktop-1440', 'tablet-768', 'mobile-390'].includes(vp.name)) {
        const shotName = `${pageInfo.file.replace('.html', '')}-${vp.name}.png`;
        const shotPath = path.join(screenshotsDir, shotName);
        await page.screenshot({ path: shotPath, fullPage: true });
        results.screenshotsCaptured.push(shotName);
        console.log(`  📸 Screenshot: ${shotName}`);
      }
    }
  }

  // 2. Interactive & Functional Tests
  console.log('\n🧪 Executing Interactive & Functional Tests...');
  await page.setViewportSize({ width: 1440, height: 900 });

  // Test A: Workflow Tab Switching
  try {
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    const complianceTab = page.locator('.workflow-tab-btn[data-target="tab-compliance"]');
    await complianceTab.click();
    await page.waitForTimeout(100);
    const isPanelActive = await page.locator('#tab-compliance').isVisible();
    results.functionalTests.push({
      test: 'Homepage Workflow Tab Switcher',
      status: isPanelActive ? 'PASSED' : 'FAILED'
    });
    console.log(`  ✓ Homepage Workflow Tab Switcher: ${isPanelActive ? 'PASSED' : 'FAILED'}`);
  } catch (e) {
    results.functionalTests.push({ test: 'Homepage Workflow Tab Switcher', status: 'ERROR', error: e.message });
  }

  // Test B: Business Registration Diagnostic Calculator
  try {
    await page.goto(`http://127.0.0.1:${PORT}/business-registration.html`, { waitUntil: 'domcontentloaded' });
    await page.selectOption('#calcPartners', 'multiple');
    await page.selectOption('#calcLiability', 'limited');
    await page.waitForTimeout(100);
    const resultText = await page.locator('#calcResult').textContent();
    const hasSarl = resultText.includes('SARL Pluripersonnelle');
    results.functionalTests.push({
      test: 'Structure Diagnostic Calculator (SARL update)',
      status: hasSarl ? 'PASSED' : 'FAILED'
    });
    console.log(`  ✓ Structure Diagnostic Calculator: ${hasSarl ? 'PASSED' : 'FAILED'}`);
  } catch (e) {
    results.functionalTests.push({ test: 'Structure Diagnostic Calculator', status: 'ERROR', error: e.message });
  }

  // Test C: FAQ Accordion Toggle
  try {
    await page.goto(`http://127.0.0.1:${PORT}/faq.html`, { waitUntil: 'domcontentloaded' });
    const firstFaq = page.locator('.faq-item').first();
    const firstQ = firstFaq.locator('.faq-question');
    await firstQ.click();
    await page.waitForTimeout(100);
    const isAnswerVisible = await firstFaq.locator('.faq-answer').isVisible();
    results.functionalTests.push({
      test: 'FAQ Accordion Toggle Expansion',
      status: isAnswerVisible ? 'PASSED' : 'FAILED'
    });
    console.log(`  ✓ FAQ Accordion Toggle Expansion: ${isAnswerVisible ? 'PASSED' : 'FAILED'}`);
  } catch (e) {
    results.functionalTests.push({ test: 'FAQ Accordion Toggle', status: 'ERROR', error: e.message });
  }

  // Test D: Intake Form Validation & Success Feedback
  try {
    await page.goto(`http://127.0.0.1:${PORT}/contact.html`, { waitUntil: 'domcontentloaded' });
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(100);
    const hasErrors = await page.locator('#fullName-error').isVisible();

    await page.fill('#fullName', 'Dr. Christian Penda');
    await page.fill('#email', 'christian.penda@business.cm');
    await page.fill('#phone', '+237 670 000 000');
    await page.selectOption('#serviceInterest', 'both');
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(100);
    const isSuccessVisible = await page.locator('.form-success-banner').isVisible();

    results.functionalTests.push({
      test: 'Contact Intake Form Validation & Feedback',
      status: (hasErrors && isSuccessVisible) ? 'PASSED' : 'FAILED'
    });
    console.log(`  ✓ Contact Intake Form Validation: ${(hasErrors && isSuccessVisible) ? 'PASSED' : 'FAILED'}`);
  } catch (e) {
    results.functionalTests.push({ test: 'Contact Intake Form Validation', status: 'ERROR', error: e.message });
  }

  // Test E: Mobile Menu Drawer Toggle
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    
    const menuBtn = page.locator('.mobile-menu-btn');
    await menuBtn.click();
    await page.waitForTimeout(100);
    const isDrawerOpen = await page.locator('.mobile-drawer.active').isVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    const isDrawerClosed = !(await page.locator('.mobile-drawer.active').isVisible());

    results.functionalTests.push({
      test: 'Mobile Drawer Menu Open & Escape Close',
      status: (isDrawerOpen && isDrawerClosed) ? 'PASSED' : 'FAILED'
    });
    console.log(`  ✓ Mobile Drawer Menu Open & Escape Close: ${(isDrawerOpen && isDrawerClosed) ? 'PASSED' : 'FAILED'}`);
  } catch (e) {
    results.functionalTests.push({ test: 'Mobile Drawer Menu', status: 'ERROR', error: e.message });
  }

  await context.close();
  await browser.close();
  server.close();

  // Save report to docs
  const reportPath = path.join(ROOT_DIR, 'docs', 'playwright_test_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n==================================================`);
  console.log(`🎉 AUDIT COMPLETE & ALL TESTS EXECUTED!`);
  console.log(`==================================================`);
  console.log(`Screenshots Captured: ${results.screenshotsCaptured.length} files in /screenshots/`);
  console.log(`Overflow Issues: ${results.overflowIssues.length}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log(`Functional Tests Passed: ${results.functionalTests.filter(t => t.status === 'PASSED').length}/${results.functionalTests.length}`);
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
