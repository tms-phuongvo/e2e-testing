Feature('Authentication');

import LoginPage from '../../pages/login.page';

let page: LoginPage;

Before(({ I }) => {
  page = new LoginPage(I);
});

Scenario('TC1: Login with valid credentials @smoke', async ({ I }) => {
  page.goto();
  page.login('phuong.vo@tomosia.com', 'phuongvo77');
  I.seeCurrentUrlEquals('/sessions/two-factor/app');
}).tag('@auth');

Scenario('Login with invalid credentials', async ({ I }) => {
  page.goto();
  page.login('invalid@example.com', 'wrongpassword');
  page.seeError('Incorrect username or password.');

  I.seeCurrentUrlEquals('/session');
}).tag('@auth');

xScenario('User forgot password', async ({ I }) => {
  page.goto();
  page.forgotPassword();
  I.seeCurrentUrlEquals('/password_reset');
  I.fillField("//input[@name='email']", 'phuong.vo@tomosia.com');
  I.click("//input[@name='commit']");
  I.seeCurrentUrlEquals('/sessions/two-factor/app');
}).tag('@auth');
