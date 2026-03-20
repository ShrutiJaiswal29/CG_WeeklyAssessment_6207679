import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

let datafile = fs.readFileSync(path.join(__dirname,"../testdata/data1.json"),"utf-8");
let data = JSON.parse(datafile);

test("Task-1 Amazon Search", async ({ page, browserName }) => {


test.setTimeout(120000);

for (let product of data){

    let url = product.url;
    let name = product.name;

    await page.goto(url,{ waitUntil:"domcontentloaded", timeout:120000 });

    await page.locator('#twotabsearchtextbox').fill(name);
    await page.locator('#nav-search-submit-button').click();

    await page.locator('h2 a').first().waitFor();

    const [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
        page.locator('h2 a').first().click()
    ]);

    await newPage.waitForLoadState();

    const productTitle = await newPage.locator('#productTitle').textContent();
    console.log("Product Title:", productTitle);

    await expect(newPage.locator('#productTitle')).toBeVisible();

    const price = await newPage.locator('.a-price-whole').first().textContent();
    console.log("Price:", price);

    const rating = await newPage.locator('#acrPopover').textContent();
    console.log("Rating:", rating);

    await expect(newPage.locator('#acrPopover')).toBeVisible();

    await newPage.screenshot({
        path: `Screenshot/task1_${name}_${browserName}.png`
    });

    await newPage.close();
}


});
