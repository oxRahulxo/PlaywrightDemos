import { test, expect} from '@playwright/test';

test.describe("homepage with no auth", { tag: ["@homepagenoauth", "@regression"] }, () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("sign_in", { tag: ["@signin", "@regression"] }, async ({ page }) => {
  // Ensure on the home page without logging in
  await expect(page.locator('[data-test="nav-sign-in"]')).toHaveText("Sign in");
  });

  test("check_titlepage", { tag: ["@checktitlepage", "@regression"] }, async ({ page }) => {
  // Check title of the page
  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  });

  test("check_count_of_items_displayed", { tag: ["@checkcountofitemsdisplayed", "@regression"] }, async ({ page }) => {
  // Check count of items displayed
  // variable holder
  const productGrid = page.locator(".col-md-9");
  // assertion, expected to have 9
  await expect(productGrid.getByRole("link")).toHaveCount(9);

  // non-assertion, count for me and does it equal to 9
  expect(await productGrid.getByRole("link").count()).toEqual(9);
  });

  test ("search_for_thor_hammer", { tag: ["@searchforthorhammer", "@regression"] }, async ({ page }) => {
  // Search for thor hammer and check the results
  const productGrid = page.locator(".col-md-9");
  await page.getByPlaceholder("Search").fill("Thor Hammer");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(productGrid.getByRole("link")).toHaveCount(1);
  await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });

});


test.describe("homepage with auth", { tag: ["@homepagewithauth", "@regression"] }, () => {

    test.use({ storageState: '.auth/customer02.json' });

    test.beforeEach(async ({ page }) => {
      await page.goto("https://practicesoftwaretesting.com/");
    });

    test.afterEach(async ({ page }) => {
      await page.close();
    });

    test("check customer01 signed in", { tag: ["@signedin", "@regression"] }, async ({ page }) => {
    await expect(page.locator('[data-test="nav-sign-in"]')).not.toBeVisible();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jack Howe");

    });
});
