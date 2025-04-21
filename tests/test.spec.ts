import { test } from '../utils/test-options';
import { Messages, URL } from '../utils/helpers';
import { expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('C6-Cadastro de customer', () => {
  test("C6CT1-Cadastro de customer com dados válidos", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("John", "Doe", "12345");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.CUSTOMER_ADDED);
    await goToAddCustomerPageFixture.isDefaultCustomerForm();
  });
  test("C6CT2-Cadastro de customer com first name inválido", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("12345", "Teste", "AB123");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.INVALID_FIRSTNAME);
  });
  test("C6CT3-Cadastro de customer com first name vazio", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("", "Teste", "AB123");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.EMPTY_FIRSTNAME);
  });
  test("C6CT4-Cadastro de customer com last name inválido", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("Joe", "12345", "AB123");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.INVALID_LASTNAME);
  });
  test("C6CT5-Cadastro de customer com last name vazio", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("", "Teste", "AB123");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.EMPTY_LASTNAME);
  });
  test("C6CT7-Cadastro de customer já cadastrado", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("Harry", "Potter", "E725JB");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.DUPLICATE_CUSTOMER);
  });

});

test.describe('C1-Login de customer', () => {
  test("C1CT1-Login de customer cadastrado", async ({ goToCustomerLoginFixture, customerHomePageFixture }) => {
    await goToCustomerLoginFixture.selectCustomer('Harry Potter');
    await goToCustomerLoginFixture.clickLoginButton();
    await customerHomePageFixture.validateCustomerHomePage('Harry Potter');
  });

  test("C1CT3-Logout", async ({ harryHomePageFixture }) => {
    await harryHomePageFixture.clickLogoutButton();
    expect(harryHomePageFixture.page.url()).toBe(URL.CustomerLoginPage);
  }); 
});

test.describe('C2-Mudança de conta bancária', () => {
  test("C2CT1-Mudança de conta bancária de cliente com contas cadastradas", async ({ harryHomePageFixture }) => {
    await harryHomePageFixture.validateChangeAccount('Harry Potter','1006');
  });
});

test.describe('C7-Abertura de conta bancária', () => {
  test("C7CT1-Abertura de conta selecionando customer e moeda", async ({ goToOpenAccountPageFixture }) => {
    await goToOpenAccountPageFixture.fillAccountForm("Harry Potter", "Dollar");
    await goToOpenAccountPageFixture.clickProcessButton();
    await goToOpenAccountPageFixture.validateDialog(Messages.ACCOUNT_ADDED);
    await goToOpenAccountPageFixture.isDefaultAccountForm();
  });
});

test.describe('Cadastro de customer e login com o customer criado', () => { 
  test.describe.configure({ mode: 'serial' });
  test.beforeAll(async ({ }) => {
    fs.writeFileSync('storageState.json', JSON.stringify({}));
  });
  
  test.afterAll(async ({ }) => {
    fs.writeFileSync('storageState.json', JSON.stringify({}));
    console.log('storageState.json reseted.');
  });
  
  test.use({ storageState: 'storageState.json' });
  test("Cadastrar novo customer", async ({ goToAddCustomerPageFixture }) => {
    await goToAddCustomerPageFixture.fillCustomerForm("John", "Doe", "12345");
    await goToAddCustomerPageFixture.clickaddCustomerButton();
    await goToAddCustomerPageFixture.validateDialog(Messages.CUSTOMER_ADDED);
    await goToAddCustomerPageFixture.isDefaultCustomerForm();

    await goToAddCustomerPageFixture.page.context().storageState({ path: 'storageState.json' });
    console.log('Storage state save in storageState.json');
    
  });
  test("Logar com o customer cadastrado sem conta", async ({ goToCustomerLoginFixture, customerHomePageFixture  }) => {
    await goToCustomerLoginFixture.selectCustomer('John Doe');
    await goToCustomerLoginFixture.clickLoginButton();
    await customerHomePageFixture.validateCustomerHomePage('John Doe');
  }); 
  test("Abertura de conta selecionando customer e moeda", async ({ goToOpenAccountPageFixture }) => {
    await goToOpenAccountPageFixture.fillAccountForm("John Doe", "Dollar");
    await goToOpenAccountPageFixture.clickProcessButton();
    await goToOpenAccountPageFixture.validateDialog(Messages.ACCOUNT_ADDED);
    await goToOpenAccountPageFixture.isDefaultAccountForm();

    await goToOpenAccountPageFixture.page.context().storageState({ path: 'storageState.json' });
    console.log('Storage state save in storageState.json');
  });
  test("Logar com o customer cadastrado com conta", async ({ goToCustomerLoginFixture, customerHomePageFixture  }) => {
    await goToCustomerLoginFixture.selectCustomer('John Doe');
    await goToCustomerLoginFixture.clickLoginButton();
    await customerHomePageFixture.validateCustomerHomePage('John Doe');
  }); 
});