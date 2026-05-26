import {test,expect} from "@playwright/test";
import {HomePage} from "./HomePage";
import {LoginPage} from "./LoginPage";

test("Login Popup Validation",async({page})=>{
    const homePage= new HomePage();

    const loginPage= new LoginPage();

    //open website
    await homePage.openWebsite(page);

    //click on login
    await loginPage.clickLogin(page);

    //verify
    await expect(page.locator('#signUp-phoneNumber')).toBeVisible();

    console.log("Login popup verfied");
});