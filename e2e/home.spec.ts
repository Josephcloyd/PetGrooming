import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero and every section anchor", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Pampered Paws");
    for (const id of ["services", "how-it-works", "pricing", "gallery", "team", "faq", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("pricing toggle changes the package prices", async ({ page }) => {
    await page.goto("/#pricing");

    const deluxe = page.getByTestId("pricing-card-deluxe");
    await expect(deluxe.getByText("₱999", { exact: true })).toBeAttached();

    await page.getByRole("radio", { name: /large/i }).click();
    await expect(deluxe.getByText("₱1,299", { exact: true })).toBeAttached();
  });

  test("FAQ accordion expands on click", async ({ page }) => {
    await page.goto("/#faq");

    const question = page.getByRole("button", { name: /home service/i });
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/fully equipped van/i)).toBeVisible();
  });

  test("has LocalBusiness structured data", async ({ page }) => {
    await page.goto("/");

    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toContain('"@type":"LocalBusiness"');
  });
});
