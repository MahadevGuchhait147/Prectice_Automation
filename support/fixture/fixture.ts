import { test as base, expect ,Page } from '@playwright/test';
import { loginPage } from '../pageMethod/login';
import { Cartpage } from '../pageMethod/addToCart';

export const test = base.extend<{
    login: loginPage;
    cart :Cartpage;
}>
({
    login: async ({ page }, use) => {
       const login= new loginPage(page)
        // Login logic will be added here

        await use(login);
    },
    cart : async ({ page }, use) => {
        const cart =new Cartpage(page)
        await use(cart);
    }
});

