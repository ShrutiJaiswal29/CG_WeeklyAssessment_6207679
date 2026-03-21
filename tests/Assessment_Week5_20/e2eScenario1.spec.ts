import { test, expect } from '@playwright/test';
import LoginPage from '../../PageObjectModel/login.page';
import HomePage from '../../PageObjectModel/home.page';
import SearchPage from '../../PageObjectModel/search.page';
import ProductPage from '../../PageObjectModel/product.page';
import CartPage from '../../PageObjectModel/cart.page';

import fs from 'fs';
import path from 'path';

test.setTimeout(60000);

const data = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../testdata/Week5_data2.json'),
    'utf-8'
  )
);

test('Full Advanced E2E Flow (Till Checkout Page)', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await page.goto(data.url, { waitUntil: 'domcontentloaded' });

    await login.login(data.email, data.password);
    await expect(page.locator('.account')).toBeVisible();

    await home.searchProduct(data.product);

    await search.openFirstProduct();

    await product.addToCartProduct();

    await cart.goToCart();

    await expect(page.locator('.cart-item-row')).toHaveCount(1);

    await cart.proceedToCheckout();

    await page.waitForTimeout(3000);

    const url = page.url();
    console.log("Current URL:", url);

    expect(url).toContain('checkout');

    await page.screenshot({ path: 'screenshots/final-e2e.png', fullPage: true });

});