import { expect, type Locator, type Page } from '@playwright/test';
import { assertPageUrl, clickWebElement, inputField, visibilityOfElement,goToPage } from '../../../Prectice_Automation/support/Utils/utils';
import * as loginData from '../testData/login.json'

export class loginPage {
  page: Page;
    projectTitle: Locator;
    username : Locator;
  password: Locator;
  loginbtn: Locator;
  productName: Locator;
  invalidError: Locator;

  // Initialize page and all accounts page locators
  constructor(page: Page) {
    this.page = page;
    this.projectTitle = page.getByText('Swag Labs')
    this.username =page.locator("[id='user-name']")
    this.password = page.locator("[id='password']")
    this.loginbtn =page.locator ('[id="login-button"]')
    this.productName = page.getByText('Sauce Labs Backpack')
    this.invalidError = page.getByText(loginData.login.loginError)
   
  }

  // Open accounts page from sidebar navigation
  async logInToApp( username : string ,password : string ) {
   // await this.page.goto("https://www.saucedemo.com")
    await goToPage(this.page,'/')
    await expect(this.projectTitle).toBeVisible()
    await inputField(this.username,username)
    await inputField(this.password,password)
    await clickWebElement(this.loginbtn);
    await expect(this.productName).toBeVisible()
  }
  async logInWithInvalidCredentials(username: string, password: string) {
    await goToPage(this.page, '/');
    await expect(this.projectTitle).toBeVisible();
    await inputField(this.username, username);
    await inputField(this.password, password);
    await clickWebElement(this.loginbtn);
    await expect(this.invalidError).toBeVisible();
}
}