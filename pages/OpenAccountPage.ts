import { expect, Locator, Page } from '@playwright/test';

export class OpenAccountPage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnHome: Locator;
    readonly addCustomerOption: Locator;
    readonly openAccountOption: Locator;
    readonly customersOption: Locator;
    readonly fieldUser: Locator;
    readonly fieldCurrency: Locator;
    readonly processButton: Locator;
    dialog: boolean;
    message: string;


    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByText('Way2Automation Banking App');
        this.btnHome = this.page.getByRole('button', { name: 'Home' });
        this.addCustomerOption = this.page.getByRole('button', { name: 'Add Customer' });
        this.openAccountOption = this.page.getByRole('button', { name: 'Open Account' });
        this.customersOption = this.page.getByRole('button', { name: 'Customers' });
        this.fieldUser = this.page.locator('#userSelect');
        this.fieldCurrency = this.page.locator('#currency');
        this.processButton = this.page.getByRole('button', { name: 'Process' });
        this.dialog = false;
        this.message = '';
    }

    public async clickProcessButton() {
        await expect(this.processButton).toBeVisible();
        this.page.once('dialog', async (dialog) => {
            this.message = dialog.message();
            await dialog.accept();
            this.dialog = true;
        });
        await this.processButton.click();
        
    }

    public async fillAccountForm(user: string, currency: string) {
        await this.fieldUser.selectOption(user);
        await this.fieldCurrency.selectOption(currency);    
    }

    public async isDefaultAccountForm() {
        await expect(this.fieldUser).toHaveValue('');
        await expect(this.fieldCurrency).toHaveValue('');
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