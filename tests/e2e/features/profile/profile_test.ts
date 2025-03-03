/// <reference types="codeceptjs" />
Feature("Profile Management");

import { LoginPage } from "../../pages/login.page";
import { ProfilePage } from "../../pages/profile.page";

let loginPage: LoginPage;
let profilePage: ProfilePage;

Before(async ({ I }) => {
  loginPage = new LoginPage(I);
  profilePage = new ProfilePage(I);

  // Login before each test
  loginPage.goto();
  loginPage.login("test@example.com", "password123");
  profilePage.goto();
});

Scenario("Update profile information @smoke", async ({ I }) => {
  const newData = {
    name: "John Doe Updated",
    phone: "+1234567890",
    address: "123 Main St, City"
  };

  await profilePage.updateProfile(newData);

  I.see("Profile updated successfully");

  const updatedData = await profilePage.getProfileData();
  I.seeInField('[data-testid="profile-name"]', newData.name);
  I.seeInField('[data-testid="profile-phone"]', newData.phone);
  I.seeInField('[data-testid="profile-address"]', newData.address);
}).tag("@profile");

Scenario("Change password successfully", async ({ I }) => {
  const currentPassword = "password123";
  const newPassword = "newPassword123";

  await profilePage.changePassword(currentPassword, newPassword);

  I.see("Password changed successfully");

  // Verify can login with new password
  await loginPage.goto();
  await loginPage.login("test@example.com", newPassword);
  I.seeCurrentUrlEquals("/dashboard");
}).tag("@profile");

Scenario("Upload and remove avatar", async ({ I }) => {
  const avatarPath = "./tests/data/avatar.jpg";

  await profilePage.uploadAvatar(avatarPath);
  I.see("Avatar uploaded successfully");
  I.seeElement('[data-testid="avatar-preview"] img');

  await profilePage.removeAvatar();
  I.see("Avatar removed successfully");
  I.dontSeeElement('[data-testid="avatar-preview"] img');
}).tag("@profile");

Scenario("Display error for invalid current password", async ({ I }) => {
  await profilePage.changePassword("wrongpassword", "newPassword123");

  const errorMessage = await profilePage.getErrorMessage();
  I.see("Current password is incorrect", '[data-testid="error-message"]');
}).tag("@profile");
