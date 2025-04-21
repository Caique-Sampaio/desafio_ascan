import { expect, Locator, Page } from '@playwright/test';

export class BankManagerLoginPage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnHome: Locator;
    readonly addCustomerOption: Locator;
    readonly openAccountOption: Locator;
    readonly customersOption: Locator;


    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByText('Way2Automation Banking App');
        this.btnHome = this.page.getByRole('button', { name: 'Home' });
        this.addCustomerOption = this.page.getByRole('button', { name: 'Add Customer' });
        this.openAccountOption = this.page.getByRole('button', { name: 'Open Account' });
        this.customersOption = this.page.getByRole('button', { name: 'Customers' });
    }

    private async navigateTo(option: Locator, optionName: string) {
        try {
            console.log(`Navigating to the page: ${optionName}...`);
            await expect(option).toBeVisible();
            await option.click();
            console.log(`Navigating to the page: ${optionName} done.`);
        } catch (error) {
            console.error(`Error navigating to page: ${optionName}`, error);
            throw error;
        }
    }

    public async gotoAddCustomerPage() {
        await this.navigateTo(this.addCustomerOption, 'Add Customer');
    }

    public async gotoOpenAccountPage() {
        await this.navigateTo(this.openAccountOption, 'Open Account');
    }

    public async gotoCustomersPage() {
        await this.navigateTo(this.customersOption, 'Customers');
    }

}