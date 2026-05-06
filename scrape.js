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

    let tableHTML = await page.evaluate(() => {
        const table = document.querySelector('table');
        return table ? table.outerHTML : '';
    });

    await browser.close();

    if (tableHTML) {
        // Заменяем /away.php?to=ENCODED_URL → прямая ссылка
        tableHTML = tableHTML.replace(
            /href="\/away\.php\?to=([^"]+)"/g,
            (match, encoded) => `href="${decodeURIComponent(encoded)}"`
        );

        fs.writeFileSync('schedule.html', tableHTML);
        console.log('Saved successfully');
    } else {
        console.log('Table not found');
    }
})();
