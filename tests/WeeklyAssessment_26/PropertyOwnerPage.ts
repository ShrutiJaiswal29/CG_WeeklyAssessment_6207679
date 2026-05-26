import {Page} from "@playwright/test";

export class PropertyOwnerPage{
    async clickOwnerProperty(page:Page){
        await page.locator('#headerHouseOwner').click();
    }
}