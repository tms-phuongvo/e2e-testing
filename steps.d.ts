/// <reference types='codeceptjs' />
type steps_file = typeof import('./tests/steps_file');
type LoginPage = typeof import('./tests/e2e/pages/login.page');
type HomePage = typeof import('./tests/e2e/pages/home.page');
type ProfilePage = typeof import('./tests/e2e/pages/profile.page');
type SettingsPage = typeof import('./tests/e2e/pages/settings.page');
type ChaiWrapper = import('codeceptjs-chai');
type APIHelper = import('./tests/helpers/api.helper');
type CommonHelper = import('./tests/helpers/common.helper');
type AuthHelper = import('./tests/helpers/auth.helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, LoginPage: LoginPage, HomePage: HomePage, ProfilePage: ProfilePage, SettingsPage: SettingsPage }
  interface Methods extends Playwright, REST, JSONResponse, ChaiWrapper, APIHelper, CommonHelper, AuthHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
