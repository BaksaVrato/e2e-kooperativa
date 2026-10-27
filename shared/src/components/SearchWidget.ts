import { Locator, Page } from '@playwright/test';

export class SearchWidget {
    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('searchInput');
        this.searchButton = page.getByTestId('searchBtn');
    }

    async fillInput(searchTerm: string): Promise<void> {
        await this.searchInput.fill(searchTerm);
        await this.searchInput.blur();
    }

    async submitSearch(): Promise<void> {
        await this.searchButton.click();
    }
}
