import { BasePage } from "./base.page";

class SettingsPage extends BasePage {
  // General settings
  private languageSelect = '[data-testid="language-select"]';
  private themeSelect = '[data-testid="theme-select"]';
  private timezoneSelect = '[data-testid="timezone-select"]';

  // Notification settings
  private emailNotifications = '[data-testid="email-notifications"]';
  private pushNotifications = '[data-testid="push-notifications"]';
  private smsNotifications = '[data-testid="sms-notifications"]';

  // Privacy settings
  private profileVisibility = '[data-testid="profile-visibility"]';
  private activityVisibility = '[data-testid="activity-visibility"]';

  // Security settings
  private twoFactorToggle = '[data-testid="2fa-toggle"]';
  private sessionManagement = '[data-testid="session-management"]';
  readonly deviceList = '[data-testid="device-list"]';

  // Save button
  private saveButton = '[data-testid="save-settings"]';
  private successMessage = '[data-testid="success-message"]';

  constructor(I: CodeceptJS.I) {
    super(I, "/settings");
  }

  /**
   * Update language setting
   */
  setLanguage(language: string) {
    this.I.selectOption(this.languageSelect, language);
  }

  /**
   * Update theme setting
   */
  setTheme(theme: "light" | "dark" | "system") {
    this.I.selectOption(this.themeSelect, theme);
  }

  /**
   * Update timezone setting
   */
  setTimezone(timezone: string) {
    this.I.selectOption(this.timezoneSelect, timezone);
  }

  /**
   * Toggle email notifications
   */
  async toggleEmailNotifications(enable: boolean) {
    const current = await this.I.grabAttributeFrom(
      this.emailNotifications,
      "aria-checked"
    );
    if (current !== String(enable)) {
      this.clickElement(this.emailNotifications);
    }
  }

  /**
   * Toggle push notifications
   */
  async togglePushNotifications(enable: boolean) {
    const current = await this.I.grabAttributeFrom(
      this.pushNotifications,
      "aria-checked"
    );
    if (current !== String(enable)) {
      this.clickElement(this.pushNotifications);
    }
  }

  /**
   * Toggle SMS notifications
   */
  async toggleSmsNotifications(enable: boolean) {
    const current = await this.I.grabAttributeFrom(
      this.smsNotifications,
      "aria-checked"
    );
    if (current !== String(enable)) {
      this.clickElement(this.smsNotifications);
    }
  }

  /**
   * Set profile visibility
   */
  async setProfileVisibility(visibility: "public" | "private" | "friends") {
    this.I.selectOption(this.profileVisibility, visibility);
  }

  /**
   * Set activity visibility
   */
  async setActivityVisibility(visibility: "public" | "private" | "friends") {
    this.I.selectOption(this.activityVisibility, visibility);
  }

  /**
   * Toggle two-factor authentication
   */
  async toggleTwoFactor(enable: boolean) {
    const current = await this.I.grabAttributeFrom(
      this.twoFactorToggle,
      "aria-checked"
    );
    if (current !== String(enable)) {
      this.clickElement(this.twoFactorToggle);
    }
  }

  /**
   * Get list of active sessions/devices
   */
  async getActiveSessions(): Promise<string[]> {
    return this.I.grabTextFromAll(`${this.deviceList} li`);
  }

  /**
   * Terminate a specific session
   */
  terminateSession(sessionId: string) {
    this.clickElement(`[data-session-id="${sessionId}"] .terminate-button`);
  }

  /**
   * Save all settings
   */
  saveSettings() {
    this.clickElement(this.saveButton);
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }

  /**
   * Get current settings
   */
  getCurrentSettings() {
    return {
      language: this.I.grabValueFrom(this.languageSelect),
      theme: this.I.grabValueFrom(this.themeSelect),
      timezone: this.I.grabValueFrom(this.timezoneSelect),
      emailNotifications: this.I.grabAttributeFrom(
        this.emailNotifications,
        "aria-checked"
      ),
      pushNotifications: this.I.grabAttributeFrom(
        this.pushNotifications,
        "aria-checked"
      ),
      smsNotifications: this.I.grabAttributeFrom(
        this.smsNotifications,
        "aria-checked"
      ),
      profileVisibility: this.I.grabValueFrom(this.profileVisibility),
      activityVisibility: this.I.grabValueFrom(this.activityVisibility),
      twoFactorEnabled: this.I.grabAttributeFrom(
        this.twoFactorToggle,
        "aria-checked"
      )
    };
  }
}

export default SettingsPage;
