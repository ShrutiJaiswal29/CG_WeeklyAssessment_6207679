export default class WishlistPage {

    constructor(page) {
        this.page = page;
        this.wishlistLink = 'text=Wishlist';
    }

    async openWishlist() {
        await this.page.click(this.wishlistLink);
    }
}