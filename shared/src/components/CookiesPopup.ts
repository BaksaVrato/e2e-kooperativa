import { Locator, Page } from '@playwright/test';

export class CookiesPopup {
    private readonly page: Page;
    private readonly rejectButton: Locator;
    private readonly acceptButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rejectButton = page.getByTestId('buttonCookiesReject');
        this.acceptButton = page.getByTestId('buttonCookiesAccept');
    }

    async rejectCookies(): Promise<void> {
        if (await this.rejectButton.isVisible().catch(() => false)) {
            await this.rejectButton.click();
        }
    }

    async acceptCookies(): Promise<void> {
        if (await this.acceptButton.isVisible().catch(() => false)) {
            await this.acceptButton.click();
        }
    }
}
