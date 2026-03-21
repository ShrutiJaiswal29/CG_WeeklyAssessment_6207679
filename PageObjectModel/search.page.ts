export default class SearchPage {

    constructor(page) {
        this.page = page;
        this.productList = '.product-item';
    }

    async openFirstProduct() {
        await this.page.locator(this.productList).first().click();
    }
}