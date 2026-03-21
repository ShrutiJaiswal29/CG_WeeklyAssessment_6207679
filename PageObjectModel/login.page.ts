export default class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginLink = 'text=Log in';
        this.email = '#Email';
        this.password = '#Password';
        this.loginBtn = 'input[value="Log in"]';
    }

    async login(email, password) {
        await this.page.click(this.loginLink);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginBtn);
    }
}