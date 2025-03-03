Feature('Authentication');

import { LoginPage } from '../../pages/login.page';

let loginPage: LoginPage;

Before(({ I }) => {
  loginPage = new LoginPage(I);
});

Scenario('Login with valid credentials @smoke', async ({ I }) => {
  loginPage.goto();
  await loginPage.login('test@example.com', 'password123');
  
  I.see('Welcome back!');
  I.seeCurrentUrlEquals('/dashboard');
}).tag('@auth');

Scenario('Login with invalid credentials', async ({ I }) => {
  await loginPage.goto();
  await loginPage.login('invalid@example.com', 'wrongpassword');
  
  I.seeElement('.error-message');
  I.see('Invalid email or password', '.error-message');
  I.seeCurrentUrlEquals('/login');
}).tag('@auth');

Scenario('Clear login form', async ({ I }) => {
  await loginPage.goto();
  await loginPage.login('test@example.com', 'password123');
  await loginPage.clearForm();
  
  I.seeInField('#email', '');
  I.seeInField('#password', '');
}).tag('@auth'); 