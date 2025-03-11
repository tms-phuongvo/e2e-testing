import { TIMEOUT } from 'dns';
import { BasePage } from './base.page';
import { setTimeout } from 'timers';

class SignupPage extends BasePage {
  // Locators
  private emailInput = '#email';
  private passwordInput = '#password';
  private usernameInput = '#login';
  private continueButton = ".Button-content";
  private errorMessage = '.error';
  static text: any;
  termOfServiceURL="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service";

  constructor(I: CodeceptJS.I) {
    super(I, '/signup?source=login');
  }
  /**
   * signup with email, password and username
   * Method, function: viet thuong
   */
  signup(email: string, password: string, username: string) {
    this.I.fillField(this.emailInput, email);
    this.I.fillField(this.passwordInput, password);
    this.I.fillField(this.usernameInput, username);
    this.I.click(this.continueButton);
  }
  gototermOfServiceURL(){
    this.I.click("//a[normalize-space()='Terms of Service']");
    this.I.wait(30)
    this.I.switchToNextTab();
    this.I.waitForURL(this.termOfServiceURL, 30);
    this.I.seeCurrentUrlEquals(this.termOfServiceURL);
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

}

export default SignupPage; //export ra ngoai xem