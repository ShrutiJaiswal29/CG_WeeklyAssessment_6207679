import {Page} from "@playwright/test";

export class MenuPage{
    async clickMenu(page:Page){
        await page.getByText('Menu').click();
    }
}