import { Helper } from 'codeceptjs';
import { Cookie } from 'playwright';

class AuthHelper extends Helper {
  private cookies: Cookie[] = [];

  // before/after hooks
  _before() {
    // remove if not used
  }

  _after() {
    // remove if not used
  }

  /**
   * Login using API and set cookies for browser
   */
  async loginViaAPI(email: string, password: string) {
    const { REST } = this.helpers;

    const response = await REST.sendPostRequest('/api/auth/login', {
      email,
      password,
    });

    const cookies = response.headers['set-cookie'];
    if (cookies) {
      this.cookies = cookies.map((cookie: string) => {
        const [name, value] = cookie.split(';')[0].split('=');
        return {
          name,
          value,
          domain: process.env.DOMAIN || 'localhost',
          path: '/',
        };
      });
    }

    return response;
  }

  /**
   * Set authentication cookies in browser
   */
  async setAuthCookies() {
    const { Playwright } = this.helpers;
    const context = await Playwright._getContext();

    for (const cookie of this.cookies) {
      await context.addCookies([cookie]);
    }
  }

  /**
   * Clear all cookies
   */
  async clearAuth() {
    const { Playwright } = this.helpers;
    const context = await Playwright._getContext();
    await context.clearCookies();
    this.cookies = [];
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated() {
    const { Playwright } = this.helpers;
    const context = await Playwright._getContext();
    const cookies = await context.cookies();
    return cookies.some((cookie: Cookie) => cookie.name === 'auth_token');
  }
}

export = AuthHelper;
