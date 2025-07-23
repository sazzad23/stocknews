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
    const url = `https://dsebd.org/displayCompany.php?name=${encodeURIComponent(companyName)}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const value = await page.evaluate(() => {
      const element = document.querySelector('.topBodyHead');
      return element ? element.textContent.trim() : null;
    });

    await browser.close();
    res.json({ success: true, company: companyName, value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Scraper running at http://0.0.0.0:3001/');
});
