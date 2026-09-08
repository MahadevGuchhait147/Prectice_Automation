import { expect, type Locator, type Page } from '@playwright/test';
import { assertPageUrl, clickWebElement, inputField, visibilityOfElement,goToPage } from '../../../Prectice_Automation/support/Utils/utils';
import * as cartData from '../testData/cart.json'

export class Cartpage {
     page: Page;
    cartButton: Locator;
    removeText: Locator;
    cartIcon: Locator;
    productName: Locator;

    constructor(page : Page ){
        this.page= page ;
        this.cartButton =page.locator('[id="add-to-cart-sauce-labs-backpack"]')
        this.removeText =page.getByText('Remove')
        this.cartIcon = page.locator('[id="shopping_cart_container"]')
        this.productName = page.getByText(cartData.cart.itemname)
    }

    async addToCart() {
         await expect(this.cartButton).toBeVisible();
         await clickWebElement(this.cartButton)
         await visibilityOfElement(this.removeText,'Remove')
         await expect (this.cartIcon).toBeVisible();
         await clickWebElement(this.cartIcon)
         await expect(this.productName).toBeVisible();

    }
}