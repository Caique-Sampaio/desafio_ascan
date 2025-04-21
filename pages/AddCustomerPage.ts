import { expect, Locator, Page } from '@playwright/test';

export class AddCustomerPage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnHome: Locator;
    readonly addCustomerOption: Locator;
    readonly openAccountOption: Locator;
    readonly customersOption: Locator;
    readonly fieldFirstName: Locator;
    readonly fieldLastName: Locator;
    readonly fieldPostCode: Locator;
    readonly addCustomerButton: Locator;
    dialog: boolean;
    message: string;


    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByText('Way2Automation Banking App');
        this.btnHome = this.page.getByRole('button', { name: 'Home' });
        this.addCustomerOption = this.page.getByRole('button', { name: 'Add Customer' }).first();
        this.openAccountOption = this.page.getByRole('button', { name: 'Open Account' });
        this.customersOption = this.page.getByRole('button', { name: 'Customers' });
        this.fieldFirstName = this.page.getByRole('textbox', { name: 'First Name' });
        this.fieldLastName = this.page.getByRole('textbox', { name: 'Last Name' });
        this.fieldPostCode = this.page.getByRole('textbox', { name: 'Post Code' });
        this.addCustomerButton = this.page.getByRole('form').getByRole('button', { name: 'Add Customer' });
        this.dialog = false;
        this.message = '';
    }

    public async clickaddCustomerButton() {
        await expect(this.addCustomerButton).toBeVisible();
        this.page.once('dialog', async (dialog) => {
            this.message = dialog.message();
            await dialog.accept();
            this.dialog = true;
        });
        await this.addCustomerButton.click();
    }

    public async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
        await this.fieldFirstName.fill(firstName);
        await this.fieldLastName.fill(lastName);
        await this.fieldPostCode.fill(postCode);
      }

    public async isDefaultCustomerForm() {
        await expect(this.fieldFirstName).toBeVisible();
        await expect(this.fieldLastName).toBeEmpty();
        await expect(this.fieldPostCode).toBeEmpty();
    }


    public async validateDialog(expectedMessage: string) {
        try {
            expect(this.dialog).toBeTruthy();
            expect(this.message).toContain(expectedMessage);
            console.log('Dialog displayed.');
        } catch (error) {
            console.error('No dialog displayed or wrong message.', error);
            throw error;
        }
    }


}