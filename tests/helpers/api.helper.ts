import { Helper } from 'codeceptjs';

class APIHelper extends Helper {
  private token: string = '';

  /**
   * Set authentication token
   */
  setToken(token: string) {
    this.token = token;
  }

  /**
   * Get authentication token
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Send GET request
   */
  async sendGet(url: string, headers = {}) {
    const { REST } = this.helpers;
    return await REST.sendGetRequest(url, this._getHeaders(headers));
  }

  /**
   * Send POST request
   */
  async sendPost(url: string, data = {}, headers = {}) {
    const { REST } = this.helpers;
    return await REST.sendPostRequest(url, data, this._getHeaders(headers));
  }

  /**
   * Send PUT request
   */
  async sendPut(url: string, data = {}, headers = {}) {
    const { REST } = this.helpers;
    return await REST.sendPutRequest(url, data, this._getHeaders(headers));
  }

  /**
   * Send DELETE request
   */
  async sendDelete(url: string, headers = {}) {
    const { REST } = this.helpers;
    return await REST.sendDeleteRequest(url, this._getHeaders(headers));
  }

  /**
   * Get headers with authentication token
   */
  private _getHeaders(headers: object = {}): object {
    if (this.token) {
      return {
        ...headers,
        Authorization: `Bearer ${this.token}`,
      };
    }
    return headers;
  }
}

export = APIHelper;
