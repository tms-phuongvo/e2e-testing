Feature('Signup');

import SignupPage from '../../pages/signup.page';

let page: SignupPage;

Before(({ I }) => {
    page = new SignupPage(I);
});
Scenario('Signup_1: Check required all field', async ({ I }) => {
    page.goto();
    page.clickElement("//button[@type='button']//span[@class='Button-content']");
    page.seeError('Email cannot be blank');
}).tag('@signup');

Scenario('Signup_2: Sign up with invalid email', async ({ I }) => {
    page.goto();
    page.signup('email.com', 'Lemyle@123', 'Lemyle93');
    page.seeError('Email is invalid or already taken');
}).tag('@signup');

Scenario('Signup_3: Sign up with an existing email', async ({ I }) => {
    page.goto();
    page.signup('le.le@tomosia.com', 'Lemyle@123', 'Lemyle93');
    page.seeError('The email you have provided is already associated with an account.');
}).tag('@signup');

Scenario('Signup_4: Signup with invalid password', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', 'Lem', 'Lemyle1234');
    I.waitForElement("//div[contains(text(), 'Password is too short')]", 10);
    I.see('Password is too short');
}).tag('@signup');

Scenario('Signup_5: Weak password', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', '111111111111111', 'Lemyle123');
    I.waitForElement("//p[contains(text(), 'Password may be compromised')]", 10);
    I.see('Password may be compromised');
}).tag('@Signup');

Scenario('Signup_6: Password contains only letters', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', 'Leeeeeee', 'Lemyle123');
    I.waitForElement("//p[normalize-space()='Password needs a number and lowercase letter']", 5);
    I.see('Password needs a number and lowercase letter');
}).tag('@Signup');

Scenario('Signup_7: Password contains only numbers', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', '12345678', 'Lemyle123');
    I.waitForElement("//p[normalize-space()='Password needs a number and lowercase letter']", 5);
    I.see("Password needs a number and lowercase letter");
}).tag('@Signup');

Scenario('Signup_8: Username is not available', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', 'Lemyle@123', 'l');
    I.waitForElement("//div[contains(text(), 'is not available')]", 5);
    I.see("is not available");
}).tag('@Signup');

Scenario('Signup_9: Signup with valid credentials', async ({ I }) => {
    page.goto();
    page.signup('le.le1@gmail.com', 'Lemyle@1234', 'Lemyle1234');
    I.see('Verify your account', '//h2[normalize-space()="Verify your account"]');
}).tag('@Signup');

Scenario('Signup_10: Navigation to Term', async({ I }) =>{
    page.goto();
    page.gototermOfServiceURL();
}).tag('signup');