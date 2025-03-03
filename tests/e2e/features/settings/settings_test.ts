/// <reference types="codeceptjs" />

Feature("Settings Management");

import { LoginPage } from "../../pages/login.page";
import { SettingsPage } from "../../pages/settings.page";

let loginPage: LoginPage;
let settingsPage: SettingsPage;

Before(async ({ I }) => {
  loginPage = new LoginPage(I);
  settingsPage = new SettingsPage(I);

  // Login before each test
  loginPage.goto();
  loginPage.login("test@example.com", "password123");
  settingsPage.goto();
});

Scenario("Update general settings @smoke", async ({ I }) => {
  await settingsPage.setLanguage("English");
  await settingsPage.setTheme("dark");
  await settingsPage.setTimezone("UTC");
  await settingsPage.saveSettings();

  I.see("Settings saved successfully");

  const settings = await settingsPage.getCurrentSettings();
  I.seeInField('[data-testid="language-select"]', "English");
  I.seeInField('[data-testid="theme-select"]', "dark");
  I.seeInField('[data-testid="timezone-select"]', "UTC");
}).tag("@settings");

Scenario("Update notification preferences", async ({ I }) => {
  await settingsPage.toggleEmailNotifications(true);
  await settingsPage.togglePushNotifications(false);
  await settingsPage.toggleSmsNotifications(true);
  await settingsPage.saveSettings();

  I.see("Settings saved successfully");

  const settings = await settingsPage.getCurrentSettings();
  I.seeAttributesOnElements('[data-testid="email-notifications"]', {
    "aria-checked": "true"
  });
  I.seeAttributesOnElements('[data-testid="push-notifications"]', {
    "aria-checked": "false"
  });
  I.seeAttributesOnElements('[data-testid="sms-notifications"]', {
    "aria-checked": "true"
  });
}).tag("@settings");

Scenario("Update privacy settings", async ({ I }) => {
  await settingsPage.setProfileVisibility("friends");
  await settingsPage.setActivityVisibility("private");
  await settingsPage.saveSettings();

  I.see("Settings saved successfully");

  const settings = await settingsPage.getCurrentSettings();
  I.seeInField('[data-testid="profile-visibility"]', "friends");
  I.seeInField('[data-testid="activity-visibility"]', "private");
}).tag("@settings");

Scenario("Enable two-factor authentication", async ({ I }) => {
  await settingsPage.toggleTwoFactor(true);

  I.see("Two-factor authentication enabled");
  I.seeAttributesOnElements('[data-testid="2fa-toggle"]', {
    "aria-checked": "true"
  });
}).tag("@settings");

Scenario("Manage active sessions", async ({ I }) => {
  const sessions = await settingsPage.getActiveSessions();
  I.seeElement(`${settingsPage.deviceList} li`);

  if (sessions.length > 1) {
    const sessionId = sessions[1];
    await settingsPage.terminateSession(sessionId);
    I.see("Session terminated successfully");

    const updatedSessions = await settingsPage.getActiveSessions();
    I.dontSee(sessionId, settingsPage.deviceList);
  }
}).tag("@settings");
