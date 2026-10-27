import { Locator, Page } from '@playwright/test';

export class Notifier {
    private readonly page: Page;

    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.message = page.getByTestId('notifierMessage');
    }

    async text(): Promise<string> {
        return (await this.message.innerText()).trim();
    }
}
