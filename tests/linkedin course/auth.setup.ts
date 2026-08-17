import { test as setup, expect } from '@playwright/test';

setup('Create customer02 auth', async ({ page, context }) => {
  const email = 'customer2@practicesoftwaretesting.com';
  const password = 'welcome01';
  const customer02AuthFile = '.auth/customer02.json';

  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await (page.locator('[data-test="email"]')).fill(email);
  await (page.locator('[data-test="password"]')).fill(password);
  await page.locator('[data-test="login-submit"]').click();

  await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jack Howe");

  await page.context().storageState({ path: customer02AuthFile });

  await page.close();
});
