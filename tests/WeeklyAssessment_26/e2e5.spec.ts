import {test,expect} from "@playwright/test";

import {HomePage} from "./HomePage";
import {MenuPage} from "./MenuPage";

test('Menu Validation',async({page})=>{
    const homePage= new HomePage();

    const menuPage=new MenuPage();

    //open website
    await homePage.openWebsite(page);

    //click menu
    await menuPage.clickMenu(page);

    //verify menu option is visible or not
    await expect(page.getByText('Owner Plans')).toBeVisible();

    console.log("Menu validation completed");
})
