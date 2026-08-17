import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Tests', { tag: ['@orangehrmloginscenariosai', '@regression'] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('Verify username and password fields are blank on page load', async ({ page }) => {
    const usernameField = page.locator('input[placeholder="Username"]');
    const passwordField = page.locator('input[placeholder="Password"]');

    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');
  });

  test('Click login button without credentials and verify error message appears', async ({ page }) => {
    const loginButton = page.locator('button:has-text("Login")');
    await loginButton.click();

    const requiredErrors = page.locator('text=Required');
    await expect(requiredErrors).toHaveCount(2);
  });

  test('Input invalid username and valid password, verify error message appears', async ({ page }) => {
    const usernameField = page.locator('input[placeholder="Username"]');
    const passwordField = page.locator('input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login")');

    await usernameField.fill('invaliduser');
    await passwordField.fill('admin123');
    await loginButton.click();

    const errorMessage = page.locator('text=Invalid credentials');
    await expect(errorMessage).toBeVisible();
  });

  test('Input valid username and invalid password, verify error message appears', async ({ page }) => {
    const usernameField = page.locator('input[placeholder="Username"]');
    const passwordField = page.locator('input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login")');

    await usernameField.fill('Admin');
    await passwordField.fill('wrongpassword');
    await loginButton.click();

    const errorMessage = page.locator('text=Invalid credentials');
    await expect(errorMessage).toBeVisible();
  });

  test('Login with valid credentials', async ({ page }) => {
    const usernameField = page.locator('input[placeholder="Username"]');
    const passwordField = page.locator('input[placeholder="Password"]');
    const loginButton = page.locator('button:has-text("Login")');

    await usernameField.fill('Admin');
    await passwordField.fill('admin123');
    await loginButton.click();

    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    await expect(page).toHaveTitle('OrangeHRM');
  });
});
