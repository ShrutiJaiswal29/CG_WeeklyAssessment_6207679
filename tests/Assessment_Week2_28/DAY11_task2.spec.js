import { test } from '@playwright/test'

test("task2", async ({ page, browserName }) => {

    await page.goto("https://www.flipkart.com/");

    await page.waitForLoadState('domcontentloaded');

    const popup = page.locator('//button[text()="✕"]');

    if (await popup.isVisible())
        await popup.click();

    await page.locator('//input[@name="q"]').fill("phones");

    await page.keyboard.press("Enter");

    await page.waitForTimeout(4000);

    await page.locator('//div[text()="Apple"]').click();

    await page.waitForTimeout(4000);

    let price = await page.locator('(//div[contains(@class,"_30jeq3")])[3]').textContent();

    console.log(price);

    await page.screenshot({ path: `screenshot/task2${browserName}.png` });

});