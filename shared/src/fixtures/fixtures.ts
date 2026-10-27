import { CartPage, HomePage } from '@shared';
import { test as base } from '@playwright/test';

interface Fixtures {
    homePage: HomePage;
    cartPage: CartPage;
}

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

export { expect } from '@playwright/test';
