import {Page} from "@playwright/test";

export class HomePage{
    async openWebsite(page:Page){
        await page.goto('https://www.nobroker.in/');
    }
}