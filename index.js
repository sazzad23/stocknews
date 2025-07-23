const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.amarstock.com/stock/LHB');

    const value = await page.evaluate(() => {
      const element = document.querySelector('[data-key="AuditedPE"]');
      return element ? element.textContent.trim() : null;
    });

    await browser.close();
    res.json({ success: true, value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Scraper running at http://0.0.0.0:3001/');
});
