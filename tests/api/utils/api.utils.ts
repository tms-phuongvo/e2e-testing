import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiUtils {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async get(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error: any) {
      throw new Error(`GET request failed: ${error?.message}`);
    }
  }

  async post(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(`POST request failed: ${error?.message}`);
    }
  }

  async put(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(`PUT request failed: ${error?.message}`);
    }
  }

  async patch(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.api.patch(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(`PATCH request failed: ${error?.message}`);
    }
  }

  async delete(url: string, data: any, config?: AxiosRequestConfig) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error: any) {
      throw new Error(`DELETE request failed: ${error?.message}`);
    }
  }
}
