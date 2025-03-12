Feature('Login');

import LoginPage from '../../pages/login.page';

let page: LoginPage;

Before(({ I }) => {
  page = new LoginPage(I);
});
Scenario('LOGIN_1: Login with valid credentials @smoke', async ({ I }) => {
  page.goto();
  page.login('huy.nguyen@tomosia.com', 'X90YfHWN9mLAN');
  I.seeCurrentUrlEquals('/sessions/two-factor/app');
}).tag('@auth');

Scenario('LOGIN_2: Login with invalid credentials', async ({ I }) => {
  page.goto();
  page.login('invalid@example.com', 'wrongpassword');
  page.seeError('Incorrect username or password.');
  I.seeCurrentUrlEquals('/session');
}).tag('@auth');

xScenario('LOGIN_3: User forgot password', async ({ I }) => {
  page.goto();
  page.gotoForGotPassword();
  I.fillField("//input[@name='email']", 'huy.nguyen@tomosia.com');
  I.click("//input[@name='commit']");
  I.waitForURL(page.forgotPasswordURL, 30000);
  I.seeInCurrentUrl('/sessions/two-factor/app');
}).tag('@auth');

Scenario('LOGIN_4: Redirect to signup', async ({ I }) => {
  page.goto();
  page.gotoSignUpURL();
}).tag('auth');
