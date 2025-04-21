import { Locator, Page, expect } from '@playwright/test';
import { searchByAccount, searchByCustomer, getLocalStorageData, URL } from '../utils/helpers';



export class CustomerHomePage {

    readonly page: Page;
    readonly title: Locator;
    readonly btnHome: Locator;
    readonly btnLogout: Locator;
    btnDepositOption: Locator;
    btnWithdrawOption: Locator;
    btnTransactionsOption: Locator;
    accountSelect: Locator;
    noAccountMessage: Locator;
    welcomeMessage: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByText('Way2Automation Banking App');
        this.btnHome = this.page.getByRole('button', { name: 'Home' });
        this.btnLogout = this.page.getByRole('button', { name: 'Logout' });
    }

    public async clickLogoutButton() {
        await this.btnLogout.click();
    }

    public async validateCustomerHomePage(customer: string) {
        await expect(this.page).toHaveURL(URL.CustomerHomePage);
        await expect(this.title).toBeVisible();
        await expect(this.btnHome).toBeVisible();
        await expect(this.btnLogout).toBeVisible();
        
        const localStorageData = await getLocalStorageData(this.page);
    
        const users = localStorageData.User ? JSON.parse(localStorageData.User) : {};
        const accounts = localStorageData.Account ? JSON.parse(localStorageData.Account) : {};

        const myUser = searchByCustomer(users, customer);

        if (myUser) {
            this.welcomeMessage = this.page.getByText(`Welcome ${customer} !!`);
            await expect(this.welcomeMessage).toBeVisible();
            if (myUser.userAccounts.firstAccount) {
                const myUserAccount = searchByAccount(accounts, myUser.userAccounts.firstAccount);
                this.accountSelect = this.page.locator('#accountSelect');
                this.btnDepositOption = this.page.getByRole('button', { name: 'Deposit' });
                this.btnWithdrawOption = this.page.getByRole('button', { name: 'Withdrawl' });
                this.btnTransactionsOption = this.page.getByRole('button', { name: 'Transactions' });
                await expect(this.btnDepositOption).toBeVisible();
                await expect(this.btnWithdrawOption).toBeVisible();
                await expect(this.btnTransactionsOption).toBeVisible();
                await expect(this.accountSelect).toBeVisible();
                await expect(this.accountSelect).toContainText(myUserAccount?.numberAccount.toString());
                await expect(this.page.locator('body')).toContainText(`Account Number : ${myUserAccount?.numberAccount} , Balance : ${myUserAccount?.amount} , Currency : ${myUserAccount?.currency}`);
                console.log(`${customer} is a registered user and has bank account(s).`);

            } else {
                this.noAccountMessage = this.page.getByText('Please open an account with us.');
                await expect(this.noAccountMessage).toBeVisible();
                console.log(`${customer} does not have bank account(s).`);
            }
        } else {
            console.log(`${customer} is not a registered user.`);
        }

    }    

    public async validateChangeAccount(customer: string, account: string) {

        const localStorageData = await getLocalStorageData(this.page);
    
        const users = localStorageData.User ? JSON.parse(localStorageData.User) : {};
        const accounts = localStorageData.Account ? JSON.parse(localStorageData.Account) : {};

        const myUser = searchByCustomer(users, customer);
        const myUserAccount = searchByAccount(accounts, Number(account));

        if (myUser !== null && myUserAccount !== null) {
            if (myUser.id == myUserAccount.userId) {
                if (myUserAccount?.numberAccount != myUser?.userAccounts.firstAccount) {
                    console.log(`The account: ${account} belongs to the user: ${customer}`);
                    await this.accountSelect.selectOption(account);
                    await expect(this.accountSelect).toContainText(account);
                    await expect(this.page.locator('body')).toContainText(`Account Number : ${myUserAccount?.numberAccount} , Balance : ${myUserAccount?.amount} , Currency : ${myUserAccount?.currency}`);
                } else { 
                    console.log('Account is already selected');
                }
            } else {
                console.log(`The account: ${account} does not belong to the user: ${customer}`);
            }
        } else {
            console.log('User and/or account not found in the system.');
        }

    }
}