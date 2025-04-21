import { Locator, Page, expect } from '@playwright/test';

export class CustomerLoginPage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnHome: Locator;
    readonly yourNameSelect: Locator;
    readonly btnLogin: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByText('Way2Automation Banking App');
        this.btnHome = this.page.getByRole('button', { name: 'Home' });
        this.yourNameSelect = this.page.locator('#userSelect');
        this.btnLogin = this.page.getByRole('button', { name: /^Login$/ });
    }

    public async selectCustomer(customerName: string) {
        await this.yourNameSelect.selectOption(customerName);
    }

    public async clickLoginButton() {
        await expect(this.btnLogin).toBeVisible();
        await this.btnLogin.click();
    }

}