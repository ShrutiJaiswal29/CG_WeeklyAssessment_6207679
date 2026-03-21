export default class RegisterPage {

    constructor(page) {
        this.page = page;
        this.registerLink = 'text=Register';
        this.gender = '#gender-female';
        this.firstName = '#FirstName';
        this.lastName = '#LastName';
        this.email = '#Email';
        this.password = '#Password';
        this.confirmPassword = '#ConfirmPassword';
        this.registerBtn = '#register-button';
    }

    async registerUser(data) {

        await this.page.click(this.registerLink);

        const email = `test${Date.now()}@test.com`;

        await this.page.check(this.gender);
        await this.page.fill(this.firstName, data.firstName);
        await this.page.fill(this.lastName, data.lastName);
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, data.password);
        await this.page.fill(this.confirmPassword, data.password);

        await this.page.click(this.registerBtn);

        return email;
    }
}