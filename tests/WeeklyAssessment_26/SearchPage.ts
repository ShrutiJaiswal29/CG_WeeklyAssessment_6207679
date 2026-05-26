import {Page} from "@playwright/test";

export class SearchPage{
    async searchLocality(page:Page){
        await page.locator('#listPageSearchLocality').click();

        await page.locator('#listPageSearchLocality').fill('Whitefield');

        await page.waitForTimeout(2000);

        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');
    }
    async clickSearch(page:Page){
        await page.locator('.prop-search-button').click();
    }
}