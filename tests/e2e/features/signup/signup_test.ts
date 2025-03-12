Feature('Sign up');

import signUpPage from '../../pages/signup.page';

let page: signUpPage;

Before(({ I }) => {
  page = new signUpPage(I);
});

Scenario('SIGNUP_1: Check required', async ({ I }) => {
    page.goto();
    page.signUpForm('', '','');
    page.seeError('Email cannot be blank');
    page.seeError('Password cannot be blank');
    page.seeError('Username cannot be blank');
  }).tag('@signup');

Scenario('SIGNUP_2: Sign up with invalid credentials', async ({ I }) => {
  page.goto();
  page.signUpForm('invalid@', 'wrongpassword','username');
  page.seeError('Email is invalid or already taken');
}).tag('@signup');

Scenario('SIGNUP_3: Sign up with an existing email', async ({ I }) => {
    page.goto();
    page.signUpForm('tthnhi206@gmail.com', 'wrongpassword','username');
    page.seeError(' The email you have provided is already associated with an account.');
}).tag('@signup');

Scenario('SIGNUP_4: Sign up with an existing username', async ({ I }) => {
    page.goto();
    page.signUpForm('nhitest0003@gmail.com', 'Nhi@123456','nhitran20696');
    page.seeError(' Username nhitran20696 is not available.');
}).tag('@signup');

Scenario('SIGNUP_5: Sign up with a short password', async ({ I }) => {
    page.goto();
    page.signUpForm('nhitest0003@gmail.com', 'Nhi@123','username');
    page.seeError(' Password is too short');
}).tag('@signup');  

Scenario('SIGNUP_6: Sign up with invalid password', async ({ I }) => {
    page.goto();
    page.signUpForm('nhitest0003@gmail.com', '12345678','username');
    page.seeError(' Password needs a number and lowercase letter');
}).tag('@signup');

Scenario('SIGNUP_7: Sign up with an existing username', async ({ I }) => {
    page.goto();
    page.signUpForm('nhitest0003@gmail.com', 'Nhi@123456','nhitran20696');
    page.seeError(' Username nhitran20696 is not available.');
}).tag('@signup');

Scenario('SIGNUP_8: Redirect Term of service', async ({ I }) => {
  page.goto();
  page.gotoTermOfService();
  I.seeCurrentUrlEquals(page.termOfServiceURL);
}).tag('@signup');

Scenario('SIGNUP_9: Signup with valid credentials @smoke', async ({ I }) => {
  page.goto();
  page.signUpForm('nhitest0003@gmail.com', 'Nhi@2061996', 'nhitms96');
  I.see('Verify your account','//h2[normalize-space()="Verify your account"]');
}).tag('@signup');