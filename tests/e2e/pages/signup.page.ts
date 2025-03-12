import { BasePage } from './base.page';

class SignUpPage extends BasePage {
  // Locators
  private emailInput = '#email';
  private passwordInput = '#password';
  private usernameInput = '#login';
  private signupButton = "//span[@class='Button-label']";
  private errorMessage = '.error';
  private termOfService = "//a[@class='Link--inTextBlock']";
  termOfServiceURL = "https://docs.github.com/en/site-policy/github-terms/github-terms-of-service";

  constructor(I: CodeceptJS.I) {
    super(I, '/signup');
  }

  /**
   * Fill out the sign up forn
   */
  signUpForm(email: string, password: string, username: string) {
    this.I.fillField(this.emailInput, email);
    this.I.fillField(this.passwordInput, password);
    this.I.fillField(this.usernameInput, username);
    this.I.click(this.signupButton);
  }

  /**
   * Click Term of service link
   */
  gotoTermOfService() {
    this.I.click(this.termOfService);
    this.I.switchToNextTab()
    this.I.wait(10);
  }

  /**
   * Get error message if login fails
   */
  getErrorMessage(): Promise<string> {
    return this.I.grabTextFrom(this.errorMessage);
  }

  /**
   * See error message
   */
  seeError(message: string) {
    this.I.see(message, this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  hasError() {
    this.I.seeElement(this.errorMessage);
  }

  /**
   * Clear sign up form
   */
  clearForm() {
    this.I.fillField(this.emailInput, '');
    this.I.fillField(this.passwordInput, '');
    this.I.fillField(this.usernameInput, '');
  }
}

export default SignUpPage;
