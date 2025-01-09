import { test, expect } from '@playwright/test';


test('print pdf', async ({ page }) => {

  await page.goto('https://en.wikipedia.org/wiki/2024_United_States_presidential_election');

  await page.pdf({ path: 'screenshot.pdf', format: 'A4' });

});


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
