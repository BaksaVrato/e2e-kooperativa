import { Locator, Page } from '@playwright/test';

export class CookiesPopup {
    private readonly rejectButton: Locator;

    constructor(page: Page) {
        this.rejectButton = page.getByTestId('buttonCookiesReject');
    }

    async rejectCookies(): Promise<void> {
        if (await this.rejectButton.isVisible().catch(() => false)) {
            await this.rejectButton.click();
        }
    }
}
