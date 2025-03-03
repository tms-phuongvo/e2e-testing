// 'use strict'

// /// <reference types="codeceptjs" />

// type steps_file = typeof import("../steps_file");

// declare namespace CodeceptJS {
//   interface SupportObject { I: I }
//   interface Methods extends Playwright, REST, APIHelper, CommonHelper, AuthHelper, ChaiWrapper {}
//   interface I extends ReturnType<steps_file>, Methods {}
//   namespace Translation {
//     interface Actions {}
//   }
// }

// interface APIResponse {
//   status: number;
//   data: any;
//   headers: Record<string, string>;
// }

// interface APIHelper {
//   sendGet(url: string, headers?: object): Promise<APIResponse>;
//   sendPost(url: string, data?: object, headers?: object): Promise<APIResponse>;
//   sendPut(url: string, data?: object, headers?: object): Promise<APIResponse>;
//   sendDelete(url: string, headers?: object): Promise<APIResponse>;
//   setToken(token: string): void;
//   getToken(): string;
// }

// interface CommonHelper {
//   waitForClickable(locator: string, timeout?: number): Promise<void>;
//   safeClick(locator: string, timeout?: number): Promise<void>;
//   getText(locator: string, timeout?: number): Promise<string>;
//   elementExists(locator: string): Promise<boolean>;
//   fillField(locator: string, value: string, timeout?: number): Promise<void>;
//   assertText(locator: string, expectedText: string): Promise<void>;
//   takeScreenshot(name: string): Promise<void>;
//   scrollIntoView(locator: string): Promise<void>;
//   getCurrentUrl(): Promise<string>;
// }

// interface AuthHelper {
//   loginViaAPI(email: string, password: string): Promise<APIResponse>;
//   setAuthCookies(): Promise<void>;
//   clearAuth(): Promise<void>;
//   isAuthenticated(): Promise<boolean>;
// }

// interface ChaiWrapper {
//   assert(expression: boolean, message?: string): void;
//   assertEqual<T>(actual: T, expected: T, message?: string): void;
//   assertNotEqual<T>(actual: T, expected: T, message?: string): void;
//   assertContains<T>(haystack: T[], needle: T, message?: string): void;
//   assertNotContains<T>(haystack: T[], needle: T, message?: string): void;
//   assertEmpty(value: any[], message?: string): void;
//   assertNotEmpty(value: any[], message?: string): void;
//   assertMatch(value: string, pattern: RegExp, message?: string): void;
//   assertNotMatch(value: string, pattern: RegExp, message?: string): void;
//   assertHasProperty(object: object, property: string, message?: string): void;
//   assertHasProperties(object: object, properties: string[], message?: string): void;
//   assertJsonSchema(json: any, schema: object, message?: string): void;
//   assertJsonContains(json: any, subset: object, message?: string): void;
//   assertIsArray(value: any, message?: string): void;
//   assertIsObject(value: any, message?: string): void;
//   assertIsString(value: any, message?: string): void;
//   assertIsNumber(value: any, message?: string): void;
//   assertIsBoolean(value: any, message?: string): void;
//   assertIsNull(value: any, message?: string): void;
//   assertIsUndefined(value: any, message?: string): void;
//   assertIsDefined(value: any, message?: string): void;
// } 