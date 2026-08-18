import { test as setup, expect } from '@playwright/test';

setup('Create customer02 auth', async ({ page, context }) => {
  const email = 'customer2@practicesoftwaretesting.com';
  const password = 'welcome01';
  const customer02AuthFile = '.auth/customer02.json';

  await page.goto('https://practicesoftwaretesting.com/');
  await page.waitForLoadState('networkidle');
  await page.getByText("Sign in").click();
  await page.getByPlaceholder('Your email').fill(email);
  await page.getByPlaceholder('Your password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jack Howe");

  await page.context().storageState({ path: customer02AuthFile });

  await page.close();
});
