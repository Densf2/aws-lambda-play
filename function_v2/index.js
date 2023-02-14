const { chromium: playwright } = require('playwright-core');
const chromium = require('@sparticuz/chromium');
const assert = require('node:assert')

exports.handler = async(event, context, callback) => {
    let browser = null;
    let result = null;

    try {
        browser = await playwright.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless
        });

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(process.env.ENV_URL, {waitUntil: 'networkidle'});
        await page.waitForSelector('div.m-content');
        let textOnPage = await page.locator('h1.activeName').innerText()
        assert.equal(textOnPage, 'name')
        let anotherText = await page.locator('div.accessDate').innerText()
        assert.match(anotherText, /[^abc]+/g)
        result = await page.title();


    } catch (e) {
        return callback(e);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
    return result;
};
