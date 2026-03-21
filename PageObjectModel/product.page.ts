export default class ProductPage {

    constructor(page) {
        this.page = page;
        this.addToCart = 'input[value="Add to cart"]';
        this.successMsg = '.bar-notification.success';
    }

    async addToCartProduct() {
        await this.page.locator(this.addToCart).first().click();
        await this.page.locator(this.successMsg).waitFor({ state: 'visible' });
    }
}