import { test } from '@playwright/test';

test('Tokyo Olympics', async ({ page }) => {

  await page.goto('https://olympics.com/en/olympic-games/tokyo-2020');
  await page.locator('//a[text()="All Athletes"]').click();
  let silverMedal = await page.locator('//h3[text()="Emma MCKEON"]/../../../../following-sibling::div/descendant::div[@title="Silver"]/following-sibling::div/descendant::span[@class="OcsText-styles__StyledText-sc-bf256156-0 cjPVFu text--sm-body"]').textContent()
  console.log("Silver Medal :",silverMedal)
  
  await page.screenshot({ path: 'tokyo_medalists.png', fullPage: true });

});