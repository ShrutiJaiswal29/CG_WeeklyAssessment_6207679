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

test('Integration - Cart Quantity Update', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await page.goto(data.url);

    await login.login(data.email, data.password);

    await expect(page.locator('.account').first()).toBeVisible();

    await home.searchProduct(data.product);

    await search.openFirstProduct();

    await product.addToCartProduct();

    await cart.goToCart();

    await expect(page.locator('.cart-item-row')).toHaveCount(1);

    await cart.updateQuantity('2');

    await expect(page.locator('.qty-input')).toHaveValue('2');

    const total = page.locator('.product-subtotal');
    await expect(total).toContainText('20.00');

    await page.screenshot({ path: 'screenshots/integration-cart.png', fullPage: true });

});