import {Page} from "@playwright/test";

export class LoginPage{
    async clickLogin(page:Page){
        await page.getByText('Log In').first().click();
    }
}