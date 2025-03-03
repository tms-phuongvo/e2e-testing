import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  // Profile form locators
  private nameInput = '[data-testid="profile-name"]';
  private emailInput = '[data-testid="profile-email"]';
  private phoneInput = '[data-testid="profile-phone"]';
  private addressInput = '[data-testid="profile-address"]';
  private saveButton = '[data-testid="save-profile"]';
  private successMessage = '[data-testid="success-message"]';
  private errorMessage = '[data-testid="error-message"]';

  // Avatar section
  private avatarUpload = '[data-testid="avatar-upload"]';
  private avatarPreview = '[data-testid="avatar-preview"]';
  private removeAvatarButton = '[data-testid="remove-avatar"]';

  // Password change section
  private currentPasswordInput = '[data-testid="current-password"]';
  private newPasswordInput = '[data-testid="new-password"]';
  private confirmPasswordInput = '[data-testid="confirm-password"]';
  private changePasswordButton = '[data-testid="change-password"]';

  constructor(I: CodeceptJS.I) {
    super(I, '/profile');
  }

  /**
   * Update profile information
   */
  async updateProfile(data: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }) {
    if (data.name) this.fillInput(this.nameInput, data.name);
    if (data.email) this.fillInput(this.emailInput, data.email);
    if (data.phone) this.fillInput(this.phoneInput, data.phone);
    if (data.address) this.fillInput(this.addressInput, data.address);
    
    this.clickElement(this.saveButton);
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string) {
    this.fillInput(this.currentPasswordInput, currentPassword);
    this.fillInput(this.newPasswordInput, newPassword);
    this.fillInput(this.confirmPasswordInput, newPassword);
    this.clickElement(this.changePasswordButton);
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(filePath: string) {
    this.I.attachFile(this.avatarUpload, filePath);
  }

  /**
   * Remove avatar
   */
  async removeAvatar() {
    this.clickElement(this.removeAvatarButton);
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Get current profile data
   */
  async getProfileData() {
    return {
      name: this.I.grabValueFrom(this.nameInput),
      email: this.I.grabValueFrom(this.emailInput),
      phone: this.I.grabValueFrom(this.phoneInput),
      address: this.I.grabValueFrom(this.addressInput)
    };
  }
} 