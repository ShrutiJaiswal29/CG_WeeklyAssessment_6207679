import {test,expect} from "@playwright/test";

import {HomePage} from "./HomePage";
import {PropertyOwnerPage} from "./PropertyOwnerPage";

test('Post Property Validation',async({page})=>{
    const homePage=new HomePage();

    const propertyOwner=new PropertyOwnerPage();

    //open website
    await homePage.openWebsite(page);

    //verify that button is visible
    await expect(page.locator('#headerHouseOwner')).toBeVisible();

    //click on property
    await propertyOwner.clickOwnerProperty(page);

    console.log("Owner button clicked");
});