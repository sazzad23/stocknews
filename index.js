const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();

app.get('/', async (req, res) => {
  const companyName = req.query.name || 'RECKITTBEN'; // Use GET variable or fallback

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const url = `https://www.amarstock.com/stock/${encodeURIComponent(companyName)}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    try {
      await page.waitForSelector('div[data-key="EPS"]', { timeout: 10000 });
      //EPS
      const eps = await page.evaluate(() => {
        const element = document.querySelector('div[data-key="EPS"]');
        return element ? element.textContent.trim() : null;
      });
      //PE
      const pe = await page.evaluate(() => {
        const element = document.querySelector('div[data-key="AuditedPE"]');
        return element ? element.textContent.trim() : null;
      });
      
      //Today's Price range
      const dayRange = await page.evaluate(() => {
        const element = document.querySelector('span[data-key="DayRange"]');
        return element ? element.textContent.trim() : null;
      });
      
      //Record date
      const recordDate = await page.evaluate(() => {
        const element = document.querySelector('#tab5 table tr:first-child td:last-child ');
        return element ? element.textContent.trim() : null;
      });

      
      await browser.close();
      res.json({ success: true, company: companyName, eps: eps, pe: pe, dayRange: dayRange, recordDate: recordDate });
    } catch (innerErr) {
      await browser.close();
      res.status(404).json({ success: false, company: companyName, error: 'EPS data not found or took too long to load.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Scraper running at http://0.0.0.0:3001/');
});
