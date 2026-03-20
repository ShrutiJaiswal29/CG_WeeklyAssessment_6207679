import {test} from "@playwright/test"

test("task1",async({page})=>{
    await page.goto("https://www.icc-cricket.com/rankings")
    let position = await page.locator('//span[text()="Alyssa"]/../../../../../child::td/descendant::span[@class="text-xs font-extrabold uppercase text-primary pr-2"]').textContent();
    console.log("Position of alyssa healy : ",position);
    await page.screenshot({path: 'Icc ranking.png',fullPage:true})
    
})