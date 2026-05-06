const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://vk.com/page-34729581_49195330', {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    await page.waitForSelector('table', { timeout: 15000 }).catch(() => {});

    const tableHTML = await page.evaluate(() => {
        const table = document.querySelector('table');
        if (!table) return '';

        // Заменяем /away.php?to=... на прямые ссылки
        table.querySelectorAll('a[data-external-url]').forEach(a => {
            a.href = a.dataset.externalUrl;
        });

        return table.outerHTML;
    });

    await browser.close();

    if (tableHTML) {
        fs.writeFileSync('schedule.html', tableHTML);
        console.log('Saved successfully');
    } else {
        console.log('Table not found');
    }
})();
