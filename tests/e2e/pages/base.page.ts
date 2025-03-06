export class BasePage {
  protected I: CodeceptJS.I;
  protected url: string;

  constructor(I: CodeceptJS.I, url: string = '/') {
    this.I = I;
    this.url = url;
  }

  /**
   * Navigate to page
   */
  goto() {
    this.I.amOnPage(this.url);
  }

  /**
   * Get current URL
   */
  getCurrentUrl() {
    return this.I.grabCurrentUrl();
  }

  /**
   * Wait for page load
   */
  waitForLoad() {
    this.I.waitForElement('body', 10);
  }

  /**
   * Refresh page
   */
  refresh() {
    this.I.refreshPage();
  }

  /**
   * Take screenshot of current page
   */
  async screenshot(name: string) {
    this.I.saveScreenshot(name + '.png');
  }

  /**
   * Check if element exists
   */
  async hasElement(locator: string): Promise<boolean> {
    try {
      this.I.seeElement(locator);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for element and click
   */
  clickElement(locator: string) {
    this.I.waitForElement(locator, 10);
    this.I.click(locator);
  }

  /**
   * Wait for element and fill
   */
  fillInput(locator: string, value: string) {
    this.I.waitForElement(locator, 10);
    this.I.fillField(locator, value);
  }

  /**
   * Get text from element
   */
  getText(locator: string): Promise<string> {
    this.I.waitForElement(locator, 10);
    return this.I.grabTextFrom(locator);
  }
}
