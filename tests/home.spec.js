const { test, expect } = require('@playwright/test');

test('homepage basic smoke: responds and shows product list & contact form', async ({ page }) => {
  const response = await page.goto('/');
  // Ensure page loaded (2xx/3xx)
  expect(response && response.status()).toBeLessThan(400);

  // Try to find at least one product-list / product-card using several common selectors
  const productSelectors = ['.product-card', '[data-test="product-card"]', '.product-list', 'ul.products'];
  let hasProducts = false;
  for (const sel of productSelectors) {
    const count = await page.locator(sel).count();
    if (count > 0) { hasProducts = true; break; }
  }
  expect(hasProducts).toBeTruthy();

  // Check there is a contact form or contact page link
  const contactFormSelectors = ['form#contact', 'form[name="contact"]', 'a[href="/contact"]', 'a:has-text("Contact")', 'a:has-text("Контак")'];
  let hasContact = false;
  for (const sel of contactFormSelectors) {
    const count = await page.locator(sel).count();
    if (count > 0) { hasContact = true; break; }
  }
  expect(hasContact).toBeTruthy();

  // Try a lightweight "add to cart" interaction if there's an obvious button
  const addBtn = page.locator('text=/Add to cart|Add|В корзину/i').first();
  if (await addBtn.count() > 0) {
    await addBtn.click();
    // Expect cart count or cart drawer to appear
    const cartIndicators = ['.cart-count', '[data-test="cart-count"]', '.cart .count', '.cart-badge'];
    let cartVisible = false;
    for (const sel of cartIndicators) {
      const count = await page.locator(sel).count();
      if (count > 0) { cartVisible = true; break; }
    }
    expect(cartVisible).toBeTruthy();
  }
});
