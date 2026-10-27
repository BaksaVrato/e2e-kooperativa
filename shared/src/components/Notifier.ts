import { Locator, Page } from '@playwright/test';

export class Notifier {
    readonly message: Locator;

    constructor(page: Page) {
        this.message = page.getByTestId('notifierMessage');
    }

    async text(): Promise<string> {
        return (await this.message.innerText()).trim();
    }
}
