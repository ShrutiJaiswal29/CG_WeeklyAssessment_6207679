import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const datafile = fs.readFileSync(path.join(__dirname,"../testdata/data2.json"),"utf-8");
const students = JSON.parse(datafile);

test("Submit multiple student registrations", async ({ page }) => {

  await page.goto("https://demoqa.com/automation-practice-form");

  for(const student of students){

    // Fill personal details
    await page.fill("#firstName", student.firstname);
    await page.fill("#lastName", student.lastname);
    await page.fill("#userEmail", student.email);

    // Select gender
    if (student.gender === "male") {
            await page.locator('label[for="gender-radio-1"]').click()
        }
        else if (student.gender === "female") {
            await page.locator('label[for="gender-radio-2"]').click()
        }
        else {
            await page.locator('label[for="gender-radio-3"]').click()
        }


    // Phone number
    await page.fill("#userNumber", student.phone);

    // Date of birth
     await page.click("#dateOfBirthInput");
    await page.locator(".react-datepicker__year-select").selectOption(student.dob_year);
    await page.locator(".react-datepicker__month-select").selectOption(student.dob_month);
    await page.click(`.react-datepicker__day--${student.dob_day}`);

    // Select hobby
   if(student.hobby === "Sports"){
    await page.locator('label[for="hobbies-checkbox-1"]').click();
}
else if(student.hobby === "Reading"){
    await page.locator('label[for="hobbies-checkbox-2"]').click();
}
else{
    await page.locator('label[for="hobbies-checkbox-3"]').click();
}

    // Upload picture
    await page.setInputFiles("#uploadPicture", "C:/Users/SONAKSHI/Desktop/Cap-Training-Assessment/uploadphoto/pic1.jpg");

    // Address
    await page.fill("#currentAddress", student.address);

    // State & city
   // Select state
await page.locator("#state").click();
await page.locator(`#state div:text("${student.state}")`).click();

// Select city
await page.locator("#city").click();
await page.locator(`#city div:text("${student.city}")`).click();

    // Submit form
    await page.click("#submit");

    // Verify confirmation modal
    await expect(page.locator("#example-modal-sizes-title-lg")).toBeVisible();

    // Validate submitted data
   await expect(page.locator("text=" + student.firstname + " " + student.lastname)).toBeVisible();
    await expect(page.locator("text=" + student.email)).toBeVisible();

    // Close modal
    await page.click("#closeLargeModal");

// reload form for next student
    await page.reload();

  }

});