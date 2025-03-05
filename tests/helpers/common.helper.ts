import { Helper } from "codeceptjs";

class CommonHelper extends Helper {
  /**
   * Wait for element to be visible and clickable
   */
  async waitForClickable(locator: string, timeout = 10) {
    const { Playwright, ChaiWrapper } = this.helpers;
    await Playwright.waitForElement(locator, timeout);
    await Playwright.waitForClickable(locator, timeout);
  }

  /**
   * Safely click on element with retry
   */
  async safeClick(locator: string, timeout = 10) {
    const { Playwright } = this.helpers;
    await this.waitForClickable(locator, timeout);
    await Playwright.click(locator);
  }

  /**
   * Get text from element with retry
   */
  async getText(locator: string, timeout = 10) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(locator, timeout);
    return await Playwright.grabTextFrom(locator);
  }

  /**
   * Check if element exists
   */
  async elementExists(locator: string) {
    const { Playwright } = this.helpers;
    try {
      await Playwright.seeElement(locator);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait and fill input
   */
  async fillField(locator: string, value: string, timeout = 10) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(locator, timeout);
    await Playwright.fillField(locator, value);
  }

  /**
   * Assert element text
   */
  async assertText(locator: string, expectedText: string) {
    const { Playwright, ChaiWrapper } = this.helpers;
    const actualText = await this.getText(locator);
    ChaiWrapper.assert.equal(actualText, expectedText);
  }

  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(name: string) {
    const { Playwright } = this.helpers;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await Playwright.saveScreenshot(`${name}_${timestamp}.png`);
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: string) {
    const { Playwright } = this.helpers;
    await Playwright.executeScript((el: string) => {
      document.querySelector(el)?.scrollIntoView({ behavior: "smooth" });
    }, locator);
  }

  async getCurrentUrl() {
    const { Playwright } = this.helpers;
    return await Playwright.grabCurrentUrl();
  }
}

export = CommonHelper;
