export default class ProductPage {

    constructor(page) {
        this.page = page;
        this.addToWishlistBtn = 'input[value="Add to wishlist"]';
        this.successMsg = '.bar-notification.success';
    }

    async addToWishlist() {
        await this.page.locator(this.addToWishlistBtn).first().click();
        await this.page.locator(this.successMsg).waitFor({ state: 'visible' });
    }
}