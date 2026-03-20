import {test} from "@playwright/test"

test("cricbuzz",async ({page})=>{
    await page.goto('https://www.cricbuzz.com/');
    await page.getByText('Live Scores').click();
    await page.getByTitle('Live Score').first().click();
    await page.getByTitle('Scorecard',{exact:true}).click();
    let runs=await page.locator('(//div[@class="flex justify-center items-center font-bold text-sm  wb:text-sm"])[9]').textContent();
    console.log("Ahmad Faiz's runs are ",runs);
    await page.screenshot({path:"screeshot/task3.png"});
})