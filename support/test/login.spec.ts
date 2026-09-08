import { test } from '../../support/fixture/fixture';
import dotenv from 'dotenv';

dotenv.config();

test.describe('this spec file for login page', () => {

    test('login in valid Credential', async ({ login }) => {

        const userEmail = process.env.SAUCE_USERNAME!;
        const userPassword = process.env.SAUCE_PASSWORD!;

        await login.logInToApp(userEmail, userPassword);
    });
    test('login in invalid Credential', async ({ login }) => {

        const userEmail = process.env.SAUCE_USERNAME!;
        const userPassword = 'invalidPassword';

        await login.logInWithInvalidCredentials(userEmail, userPassword);
    });
});