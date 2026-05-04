const { test, expect } = require('@playwright/test');

test.describe('Leather mini-site E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads and shows product cards', async ({ page }) => {
    await expect(page).toHaveTitle(/Leather/i);
    const cardsLocator = page.locator('[data-test="product-card"]');
    const count = await cardsLocator.count();
    expect(count).toBeGreaterThan(0);
  });

  test('can open a product detail and add to cart', async ({ page }) => {
    const firstCard = page.locator('[data-test="product-card"]').first();
    await firstCard.click();

    // Expect product detail content
    await expect(page.locator('[data-test="product-title"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

    // Add to cart and check cart badge / cart page
    await page.click('[data-test="add-to-cart"]');

    // If there's a cart badge
    const badge = page.locator('[data-test="cart-count"]');
    if (await badge.count() > 0) {
      await expect(badge).toBeVisible();
      const text = await badge.innerText();
      expect(Number(text)).toBeGreaterThan(0);
    } else {
      // Fallback: open cart page and expect the item present
      await page.goto('/cart');
      const cartItems = await page.locator('[data-test="cart-item"]').count();
      expect(cartItems).toBeGreaterThan(0);
    }
  });

  test('contact form submits (basic smoke)', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[name="name"]', 'Tester');
    await page.fill('input[name="email"]', 'tester@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    await page.click('[data-test="contact-submit"]');

    // Expect either a success message or redirect to a thank-you area
    const success = page.locator('[data-test="contact-success"]');
    await expect(success).toBeVisible();
  });
});
