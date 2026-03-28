export default class CartPage {

    constructor(page) {
        this.page = page;
        this.cartLink = '#topcartlink';
        this.terms = '#termsofservice';
        this.checkoutBtn = '#checkout';

        // ✅ ADDED (no change to old code)
        this.qtyInput = '.qty-input';
        this.updateBtn = 'input[name="updatecart"]';
        this.subTotal = '.product-subtotal';
    }

    async goToCart() {
        await this.page.click(this.cartLink);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async updateQuantity(qty) {
        const qtyBox = this.page.locator('.qty-input');
        await qtyBox.fill(qty);
        await this.page.click('input[name="updatecart"]');
    }

 
async applyCoupon(code) {
    await this.page.waitForSelector('#discountcouponcode');
    const couponBox = this.page.locator('#discountcouponcode');
    await couponBox.fill(code);
    await this.page.click('input[name="applydiscountcouponcode"]');
}
    // ✅ ADDED (for integration validation)
    async getSubtotalText() {
        return await this.page.locator(this.subTotal).innerText();
    }

    async proceedToCheckout() {

        const checkbox = this.page.locator(this.terms);
    
        await checkbox.waitFor({ state: 'visible' });

        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }

        const checkout = this.page.locator(this.checkoutBtn);
        await checkout.waitFor({ state: 'visible' });

        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            checkout.click()
        ]);
    }
}