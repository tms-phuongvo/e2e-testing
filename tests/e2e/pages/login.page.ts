import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Locators
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = 'button[type="submit"]';
  private errorMessage = '.error-message';

  constructor(I: CodeceptJS.I) {
    super(I, '/login');
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string) {
    this.fillInput(this.emailInput, email);
    this.fillInput(this.passwordInput, password);
    this.clickElement(this.loginButton);
  }

  /**
   * Get error message if login fails
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async hasError(): Promise<boolean> {
    return this.hasElement(this.errorMessage);
  }

  /**
   * Clear login form
   */
  async clearForm() {
    this.fillInput(this.emailInput, '');
    this.fillInput(this.passwordInput, '');
  }
} 