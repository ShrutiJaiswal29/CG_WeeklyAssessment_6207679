import { test, expect } from '@playwright/test';
import RegisterPage from '../../PageObjectModel_S3/register.page';
import LoginPage from '../../PageObjectModel_S3/login.page';
import HomePage from '../../PageObjectModel_S3/home.page';
import SearchPage from '../../PageObjectModel_S3/search.page';
import ProductPage from '../../PageObjectModel_S3/product.page';
import WishlistPage from '../../PageObjectModel_S3/wishlist.page';

import fs from 'fs';
import path from 'path';

test.setTimeout(60000);

// ✅ FIXED JSON LOADING
const filePath = path.join(__dirname, '../../testdata/Week5_data3.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

test('E2E - Wishlist Flow', async ({ page }) => {

    const register = new RegisterPage(page);
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const wishlist = new WishlistPage(page);

    // ✅ Safety check
    if (!data.url) {
        throw new Error("URL missing in JSON file");
    }

    // Open site
    await page.goto(data.url);

    // Register new user
    const email = await register.registerUser(data);

    // Logout
    await page.click('text=Log out');

    // Login again
    await login.login(email, data.password);
   // await expect(page.locator('.account').first()).toBeVisible();
   await expect(page.getByText(email)).toBeVisible();
    // Search product
    await home.searchProduct(data.product);

    // Open product
    await search.openFirstProduct();

    // Add to wishlist
    await product.addToWishlist();

    // Go to wishlist
    await wishlist.openWishlist();

    // Validate wishlist
    await expect(page.locator('.wishlist-content')).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'screenshots/wishlist-e2e.png', fullPage: true });

});