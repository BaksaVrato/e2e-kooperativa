import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(
        'Palmáreň – Exotické palmy a mrazuvzdorné rastliny | exotickepalmy.sk',
    );
});
