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
    const url = `https://www.amarstock.com/dse-news-archive/${encodeURIComponent(companyName)}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    try {
      // Wait for the news container to load
      await page.waitForSelector('#tab-AllNews .single_news:first-child', { timeout: 10000 });
      // News
      const value = await page.evaluate(() => {
        const element1 = document.querySelector('#tab-AllNews .single_news:first-child .small-12:first-child');
        const element2 = document.querySelector('#tab-AllNews .single_news:first-child .small-12:last-child');
  
        const text1 = element1 ? element1.textContent.trim() : '';
        const text2 = element2 ? element2.textContent.trim() : '';
  
        const result = text1 + ' ' + text2;
        return result.trim() || null;
      });

      
      await browser.close();
      res.json({ success: true, value: value });
    } catch (innerErr) {
      await browser.close();
      res.status(404).json({ success: false, value: value, error: 'News data not found or took too long to load.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3002, '0.0.0.0', () => {
  console.log('Scraper running at http://0.0.0.0:3002/');
});
