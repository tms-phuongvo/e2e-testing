import { BasePage } from './base.page';

class LoginPage extends BasePage {
  // Locators
  private emailInput = '#login_field';
  private passwordInput = '#password';
  private loginButton = "//input[@type='submit']";
  private errorMessage = '.js-flash-alert';
  private forgotPasswordLink = '#forgot-password';

  constructor(I: CodeceptJS.I) {
    super(I, '/login');
  }

  /**
   * Login with email and password
   */
  login(email: string, password: string) {
    this.I.fillField(this.emailInput, email);
    this.I.fillField(this.passwordInput, password);
    this.I.click(this.loginButton);
  }

  /**
   * Click forgot password link
   */
  forgotPassword() {
    this.I.click(this.forgotPasswordLink);
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
   * Clear login form
   */
  clearForm() {
    this.I.fillField(this.emailInput, '');
    this.I.fillField(this.passwordInput, '');
  }
}

export default LoginPage;
