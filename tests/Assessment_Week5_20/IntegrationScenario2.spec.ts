import { test, expect } from '@playwright/test';
import LoginPage from '../../PageObjectModel/login.page';
import HomePage from '../../PageObjectModel/home.page';
import SearchPage from '../../PageObjectModel/search.page';
import ProductPage from '../../PageObjectModel/product.page';
import CartPage from '../../PageObjectModel/cart.page';

import fs from 'fs';
import path from 'path';

test.setTimeout(90000);


const filePath = path.join(__dirname, '../../testdata/Week5_data3.json');

console.log("JSON PATH:", filePath);

const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData);

console.log("DATA:", data);

if (!data.email || !data.password || !data.url) {
    throw new Error("JSON data missing (email/password/url)");
}

test('Integration - Cart Update and Remove Flow', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

  
    await page.goto(data.url);

    await login.login(data.email, data.password);

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    await home.searchProduct(data.product);

   
    await search.openFirstProduct();

  
    await product.addToCartProduct();


    await cart.goToCart();

   
    await page.waitForSelector('.cart-item-row');

    const qtyBox = page.locator('input.qty-input').first();

    await expect(qtyBox).toBeVisible();
    await qtyBox.fill('2');

    await page.click('input[name="updatecart"]');

    await page.waitForTimeout(2000);

    await expect(qtyBox).toHaveValue('2');

    const removeCheckbox = page.locator('input[name="removefromcart"]').first();

    await removeCheckbox.check();

    await page.click('input[name="updatecart"]');


    await page.waitForSelector('.order-summary-content');

    await expect(page.locator('.order-summary-content'))
        .toContainText('Your Shopping Cart is empty!');

    await page.screenshot({ path: 'screenshots/integration-cart-remove.png', fullPage: true });

});