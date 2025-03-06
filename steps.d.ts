/// <reference types='codeceptjs' />
type steps_file = typeof import('./tests/steps_file');
type loginPage = typeof import('./tests/e2e/pages/login.page');
type homePage = typeof import('./tests/e2e/pages/home.page');
type profilePage = typeof import('./tests/e2e/pages/profile.page');
type settingsPage = typeof import('./tests/e2e/pages/settings.page');
type ChaiWrapper = import('codeceptjs-chai');
type APIHelper = import('./tests/helpers/api.helper');
type CommonHelper = import('./tests/helpers/common.helper');
type AuthHelper = import('./tests/helpers/auth.helper');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
    loginPage: loginPage;
    homePage: homePage;
    profilePage: profilePage;
    settingsPage: settingsPage;
  }
  interface Methods extends Playwright, REST, JSONResponse, ChaiWrapper, APIHelper, CommonHelper, AuthHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
