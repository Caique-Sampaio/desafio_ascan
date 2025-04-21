import { Page } from "@playwright/test";


export function searchByAccount(obj: Record<string, any>, numberAccount: number) {
    const resultado = Object.values(obj).find(entry => entry.accountNo === numberAccount);
    return resultado ? { 
        userId: resultado.userId,
        numberAccount: resultado.accountNo, 
        currency: resultado.currency,
        amount: resultado.amount,
    } : null;
}

export function searchByCustomer(obj: Record<string, any>, customer: string) {
    const nomeString: string = customer;
    const nomeStringDividido = nomeString.split(" ", 2);
    const fName = nomeStringDividido[0];
    const lName = nomeStringDividido[1];
    
    const resultado = Object.values(obj).find(entry => entry.fName === fName && entry.lName === lName);
    
    if (resultado) {
        return { 
            id: resultado.id, 
            firstName: resultado.fName,
            lastName: resultado.lName,
            userAccounts: (resultado.accountNo ? { 
                firstAccount: resultado.accountNo[0], 
                accounts: resultado.accontNo } 
            : {}),
            postCode: resultado.postCd,
         };
    } else {
        return null;
    }
} 

export async function getLocalStorageData(page: Page): Promise<Record<string, string>> {
    return await page.evaluate(() => {
        return Object.keys(localStorage).reduce((acc, key) => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, string>);
    });
}

export const Messages = {
    CUSTOMER_ADDED: 'Customer added successfully with customer id :',
    DUPLICATE_CUSTOMER: 'Please check the details. Customer may be duplicate.',
    ACCOUNT_ADDED: 'Account created successfully with account Number :',
    INVALID_FIRSTNAME: 'First name invalid :',
    INVALID_LASTNAME: 'Last name invalid :',
    EMPTY_FIRSTNAME: 'First name cannot be empty :',
    EMPTY_LASTNAME: 'Last name cannot be empty :',
};
export const URL = {
    HomePage: 'https://www.way2automation.com/angularjs-protractor/banking/#/login',
    CustomerLoginPage: 'https://www.way2automation.com/angularjs-protractor/banking/#/customer',
    CustomerHomePage: 'https://www.way2automation.com/angularjs-protractor/banking/#/account',
};
