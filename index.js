const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.amarstock.com/stock/LHB');

    const title = await page.title(); // Example result

    const value = await page.evaluate(() => {
    const element = document.querySelector('[data-key="AuditedPE"]');
    return element ? element.textContent.trim() : null;
    });
    console.log('AuditedPE Value:', value);


    await browser.close();
    res.json({ success: true, value });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Scraper running at http://localhost:3000/');
});



