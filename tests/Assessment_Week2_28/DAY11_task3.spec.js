import {test} from '@playwright/test'

test("Test-3",async({page,browserName})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator('//input[@id="name"]').fill('Uday');
    await page.locator('//input[@id="email"]').fill('udaymathur@gmail.com');
    await page.locator('//input[@id="password"]').fill('uday123');
    await page.locator('//button[@type="submit"]').click();
    await page.locator('//input[@id="email"]').fill('udaymathur@gmail.com');
    await page.locator('//input[@id="password"]').fill('uday123');
    await page.locator('//button[@type="submit"]').click();

    await page.screenshot({path:`screenshot/task3${browserName}.png`})

})