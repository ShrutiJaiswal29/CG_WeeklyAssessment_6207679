import { test, expect } from '@playwright/test';

test('Common Scenario - Search Product', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    await page.fill('#small-searchterms', 'book');

    await page.click('input[value="Search"]');

    const count = await page.locator('.product-item').count();
    expect(count).toBeGreaterThan(0);

    await page.screenshot({ path: 'search-results.png', fullPage: true });

});