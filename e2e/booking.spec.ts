import { expect, test } from "@playwright/test";

test("completes a booking end to end", async ({ page }) => {
  await page.goto("/booking?service=full-haircut");

  await page.getByLabel(/pet's name/i).fill("Luna");
  // Radio inputs are visually hidden; click the card label like a user would.
  await page.getByText("Dog", { exact: true }).click();
  await page.getByRole("textbox", { name: /^breed$/i }).fill("Goldendoodle");
  await page.getByText("Medium", { exact: true }).click();
  await expect(page.getByRole("radio", { name: /medium/i })).toBeChecked();
  await page.getByLabel(/age/i).fill("3");
  await page.getByRole("button", { name: /continue/i }).click();

  await expect(page.getByRole("heading", { name: /choose your services/i })).toBeVisible();
  await expect(page.getByLabel(/full haircut/i)).toBeChecked();
  await page.getByRole("button", { name: /continue/i }).click();

  await expect(page.getByRole("heading", { name: /pick a date and time/i })).toBeVisible();
  await page.locator('[aria-labelledby="date-label"] [role="radio"]').first().click();
  await page.getByRole("radio", { name: "2:00 PM", exact: true }).click();
  await page.getByRole("button", { name: /continue/i }).click();

  await page.getByLabel(/your name/i).fill("Jess Rivera");
  await page.getByLabel(/email/i).fill("jess@example.com");
  await page.getByLabel(/phone/i).fill("09123456789");
  await page.getByRole("button", { name: /continue/i }).click();

  await expect(page.getByRole("heading", { name: /review and confirm/i })).toBeVisible();
  await page.getByRole("checkbox", { name: /vaccinations/i }).check();
  await page.getByRole("button", { name: /confirm booking/i }).click();

  await expect(page.getByRole("heading", { name: /luna is booked in/i })).toBeVisible();
  await expect(page.getByText(/^PP-/)).toBeVisible();
});

test("validation stops an empty first step", async ({ page }) => {
  await page.goto("/booking");

  await page.getByRole("button", { name: /continue/i }).click();

  await expect(page.getByText(/please enter your pet's name/i)).toBeVisible();
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
});
