import {test} from '@playwright/test'

test("task1",async({page,browserName})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("Shoes");
    await page.locator('//input[@id="nav-search-submit-button"]').click();
    let name = await page.locator('(//span[@class="a-size-base-plus a-color-base"])[1]').first().textContent();
    console.log(name);
    let price = await page.locator('(//span[@class="a-price-whole"])').first().textContent();
    console.log(price);
    await page.screenshot({path:`screenshot/task1${browserName}.png`});
});
