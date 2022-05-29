const logger = require('../winston');
const puppeteer  = require('puppeteer');

module.exports = class Puppteer {
	async startBrowser() {
		const browser = await puppeteer.launch({headless: false, defaultViewport: null,  args: [
				'--no-sandbox',
				'--disable-gpu',
				'--disable-dev-shm-usage',
				'--hide-scrollbars',
				'--mute-audio',
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process'
			]
		});

		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.on('request', async (request) => {
			if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
				request.abort();
			} else {
				request.continue();
			}
		});

		await page.goto('https://translate.glosbe.com/de-vi', { waitUntil: 'networkidle2' })

		// await page.waitFor('input[name=q]');
		// await page.$eval('input[name=q]', el => el.value = 'schule');
		// await page.click('button[type="submit"]');
		
		// console.log(await data_translate);

		// await browser.close();
	}
}