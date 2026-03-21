export default class SearchPage {

    constructor(page) {
        this.page = page;
    }

    async openFirstProduct() {
        await this.page.locator('.product-item h2 a').first().click();
    }
}