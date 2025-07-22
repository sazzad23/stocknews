const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath(), // 🔑 Use the downloaded Chrome path
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // 🛡 Required in most Docker envs
    });

    const page = await browser.newPage();
    await page.goto('https://www.amarstock.com/stock/LHB');

    const title = await page.title();

    const value = await page.evaluate(() => {
      const element = document.querySelector('[data-key="AuditedPE"]');
      return element ? element.textContent.trim() : null;
    });

    console.log('AuditedPE Value:', value);

    await browser.close();
    res.json({ success: true, value });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Use 0.0.0.0 for container compatibility
app.listen(3001, '0.0.0.0', () => {
  console.log('Scraper running at http://0.0.0.0:3001/');
});
