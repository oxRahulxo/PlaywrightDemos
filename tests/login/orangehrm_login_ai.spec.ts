import { test, expect } from '@playwright/test';

test('Login to OrangeHRM with valid credentials', { tag: ['@orangehrmloginai', '@regression'] }, async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Verify login page is loaded
  expect(page.url()).toContain('/auth/login');
  await expect(page).toHaveTitle('OrangeHRM');

  // Fill in login credentials
  await page.fill('[placeholder="Username"]', 'Admin');
  await page.fill('[placeholder="Password"]', 'admin123');

  // Click the login button
  await page.click('button:has-text("Login")');

  // Verify successful login by checking the dashboard page
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page).toHaveTitle('OrangeHRM');
});
