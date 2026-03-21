export default class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.continueButtons = 'input.button-1';
    }

    async completeCheckout() {

        const buttons = this.page.locator(this.continueButtons);

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            if (await buttons.nth(i).isVisible()) {
                await buttons.nth(i).click();
                await this.page.waitForTimeout(1000);
            }
        }
    }
}