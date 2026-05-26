import {test,expect} from "@playwright/test";

test('e2e scenario_2',async({page})=>{
    //open website
    await page.goto('https://www.nobroker.in/');

    //click on commercial tab
    await page.getByText('Commercial').nth(1).click();

    //click locality
    await page.locator('#listPageSearchLocality').click();

    //enter locality
    await page.locator('#listPageSearchLocality').fill('Whitefield')

    //select first suggestion
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    //click search
    await page.locator('.prop-search-button').click();

    //verify url contains commercial
    await expect(page).toHaveURL(/commercial/i);

    console.log("comercial search passed");

})