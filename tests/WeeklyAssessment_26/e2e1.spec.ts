import {test,expect} from "@playwright/test";

test('NoBroker E2E search',async({page})=>{
    //open the website
    await page.goto('https://www.nobroker.in/');
    await page.waitForTimeout(3000);

    //click on rent
    await page.getByText('Rent').nth(2).click();
 
    //enter locality
    await page.locator('#listPageSearchLocality').click();

    await page.locator('#listPageSearchLocality').fill('Whitefield');

    await page.waitForTimeout(2000);

    //select dropdown suggestion
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');

    //click on search
    await page.getByText('Search').click();

    await page.waitForTimeout(2000);

    //verify results
    const propertyCards=page.locator('#article_0');

    await expect(propertyCards).toBeVisible();

    console.log("passed");
});