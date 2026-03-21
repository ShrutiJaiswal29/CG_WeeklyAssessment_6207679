import { test, expect } from '@playwright/test';

test('Normal Scenario - Login with Screenshot', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    await page.click('text=Log in');

    await page.fill('#Email', 'test@test.com');
    await page.fill('#Password', 'test123');

    await page.click('input[value="Log in"]');

    await expect(page.locator('.account')).toBeVisible();

    await page.screenshot({ path: 'login-success.png', fullPage: true });

});