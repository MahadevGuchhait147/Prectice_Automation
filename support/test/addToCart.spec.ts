import { test } from '../../support/fixture/fixture';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Cart Page Tests', () => {

    test.beforeEach(async ({ login }) => {

        const userEmail = process.env.SAUCE_USERNAME!;
        const userPassword = process.env.SAUCE_PASSWORD!;

        // Login before every test
        await login.logInToApp(userEmail, userPassword);
    });

    test('verify add product to cart', async ({ cart }) => {

        // Cart button
        await cart.addToCart()
    });

    // test('verify add product to cart', async ({ page }) => {

    //     await page.locator('.shopping_cart_link').click();

    //     // Add your cart assertions here
    

});