import { BasePage } from './base.page';

class HomePage extends BasePage {
  // Header locators
  private userMenuButton = '[data-testid="user-menu"]';
  private logoutButton = '[data-testid="logout-button"]';
  private searchInput = '[data-testid="search-input"]';
  private searchButton = '[data-testid="search-button"]';

  // Main content locators
  private welcomeMessage = '[data-testid="welcome-message"]';
  private notificationBell = '[data-testid="notification-bell"]';
  private notificationCount = '[data-testid="notification-count"]';
  private mainContent = '[data-testid="main-content"]';

  // Sidebar locators
  private sidebar = '[data-testid="sidebar"]';
  private dashboardLink = '[data-testid="nav-dashboard"]';
  private profileLink = '[data-testid="nav-profile"]';
  private settingsLink = '[data-testid="nav-settings"]';

  constructor(I: CodeceptJS.I) {
    super(I, '/dashboard');
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getText(this.welcomeMessage);
  }

  /**
   * Perform search
   */
  async search(query: string) {
    this.fillInput(this.searchInput, query);
    this.clickElement(this.searchButton);
  }

  /**
   * Get notification count
   */
  async getNotificationCount(): Promise<number> {
    const count = await this.getText(this.notificationCount);
    return parseInt(count, 10);
  }

  /**
   * Open notifications
   */
  async openNotifications() {
    this.clickElement(this.notificationBell);
  }

  /**
   * Navigate to profile
   */
  async goToProfile() {
    this.clickElement(this.profileLink);
  }

  /**
   * Navigate to settings
   */
  async goToSettings() {
    this.clickElement(this.settingsLink);
  }

  /**
   * Logout
   */
  async logout() {
    this.clickElement(this.userMenuButton);
    this.clickElement(this.logoutButton);
  }

  /**
   * Check if user is on dashboard
   */
  async isOnDashboard(): Promise<boolean> {
    return this.hasElement(this.mainContent);
  }
}

export default HomePage;
