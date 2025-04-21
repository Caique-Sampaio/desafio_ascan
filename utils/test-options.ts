import { test as base } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { CustomerHomePage } from '../pages/CustomerHomePage';
import { BankManagerLoginPage } from '../pages/BankManagerLoginPage';
import { AddCustomerPage } from '../pages/AddCustomerPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { URL } from '../utils/helpers';


export type TestOptions = {
    homePageFixture: string;
    goToCustomerLoginFixture: CustomerLoginPage;
    goToAddCustomerPageFixture: AddCustomerPage;
    goToOpenAccountPageFixture: OpenAccountPage;
    customerHomePageFixture: CustomerHomePage;
    harryHomePageFixture: CustomerHomePage;
}

export const test = base.extend<TestOptions>({
    homePageFixture: async ({ page }, use) => {
        await page.goto(URL.HomePage);
        await use('');
    },

    goToCustomerLoginFixture: async ({ page, homePageFixture }, use) => {
        await page.getByRole('button', { name: 'Customer Login' }).click();
        const customerLoginPage = new CustomerLoginPage(page);
        await use(customerLoginPage);
    },

    customerHomePageFixture: async ({ page }, use) => {
        const customerHomePage = new CustomerHomePage(page);
        await use(customerHomePage);
    },

    goToAddCustomerPageFixture: async ({ page, homePageFixture }, use) => {
        await page.getByRole('button', { name: 'Bank Manager Login' }).click();
        const bankManagerLoginPage = new BankManagerLoginPage(page);
        await bankManagerLoginPage.gotoAddCustomerPage();
        const addCustomerPage = new AddCustomerPage(page);
        await use(addCustomerPage);
    },

    goToOpenAccountPageFixture: async ({ page, homePageFixture }, use) => {
        await page.getByRole('button', { name: 'Bank Manager Login' }).click();
        const bankManagerLoginPage = new BankManagerLoginPage(page);
        await bankManagerLoginPage.gotoOpenAccountPage();
        const openAccountPage = new OpenAccountPage(page);
        await use(openAccountPage);
    },

    harryHomePageFixture: async ({ page, homePageFixture }, use) => {
        await page.getByRole('button', { name: 'Customer Login' }).click();
        const customerLoginPage = new CustomerLoginPage(page);
        await customerLoginPage.selectCustomer('Harry Potter');
        await customerLoginPage.clickLoginButton();
        const customerHomePage = new CustomerHomePage(page);
        await customerHomePage.validateCustomerHomePage('Harry Potter');
        await use(customerHomePage);
    }

});


