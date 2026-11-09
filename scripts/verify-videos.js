const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--enable-webgl', '--ignore-gpu-blocklist']
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(err.message));

  for (const pagePath of ['/', '/about.html', '/business-registration.html']) {
    await page.goto('http://127.0.0.1:3080' + pagePath, { waitUntil: 'networkidle' });
    const video = await page.$('video[data-film]');
    if (video) {
      await video.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const isPaused = await video.evaluate(v => v.paused);
      const isLoop = await video.evaluate(v => v.loop);
      const isMuted = await video.evaluate(v => v.muted);
      const currentTime = await video.evaluate(v => v.currentTime);
      const toggleBtn = await page.$('[data-film-toggle]');
      console.log(`${pagePath} => Autoplaying: ${!isPaused && currentTime > 0}, Paused: ${isPaused}, Loop: ${isLoop}, Muted: ${isMuted}, CurrentTime: ${currentTime.toFixed(2)}, Start/Pause Button Exists: ${toggleBtn !== null}`);
    }
  }

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length) console.log(consoleErrors);
  await browser.close();
})();
