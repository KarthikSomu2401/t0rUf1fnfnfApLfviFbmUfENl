import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    expect(await page.locator('h2').innerText()).toContain('Hacker News');
  });

  test('has pagination visible', async ({ page }) => {
    await expect(page.getByText('Items per page')).toBeVisible();
  });

  test('has types select visible', async ({ page }) => {
    await expect(page.locator('#mat-select-value-0')).toBeVisible();
  });

  test('has stories', async ({ page }) => {
    await page.locator('mat-card-header').nth(0).click();
    await page.getByRole('button').nth(5).click();
    await expect(
      page.getByRole('button').filter({ hasText: 'close' })
    ).toBeVisible();
  });

  test('has comments', async ({ page }) => {
    await page.locator('mat-card-header').nth(0).click();
    await page.getByRole('button').nth(5).click();
    await expect(
      page.getByRole('button').filter({ hasText: 'close' })
    ).toBeVisible();

    await expect(page.getByRole('list').nth(0)).toBeVisible();
  });
});
