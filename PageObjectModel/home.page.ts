export default class HomePage {

    constructor(page) {
        this.page = page;
        this.searchBox = '#small-searchterms';
        this.searchBtn = 'input[value="Search"]';
    }

    async searchProduct(product) {
        await this.page.fill(this.searchBox, product);
        await this.page.click(this.searchBtn);
    }
}