const chromium = require('@sparticuz/chrome-aws-lambda');
const playwright = require('playwright-core');

exports.handler = async(event, context, callback) => {
    let browser = null;
    let result = null;

    try {
        browser = await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless
        });

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(process.env.ENV_URL, {waitUntil: 'networkidle'});
        await page.waitForSelector('div.m-content');
        result = page.title();


    } catch (e) {
        return callback(e);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
    return result;
};
