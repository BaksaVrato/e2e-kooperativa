import { BasePage, CookiesPopup, Notifier, SearchWidget } from '@shared';
import { expect, Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
    protected readonly path: string = '/';

    private readonly cookiesPopup: CookiesPopup;
    private readonly notifier: Notifier;

    private readonly searchWidget: SearchWidget;
    private readonly searchButton: Locator;
    private readonly headerCart: Locator;

    constructor(page: Page) {
        super(page);

        this.cookiesPopup = new CookiesPopup(page);
        this.notifier = new Notifier(page);
        this.searchWidget = new SearchWidget(page);

        this.searchButton = page.getByTestId('linkSearchIcon').first();
        this.headerCart = page.getByTestId('headerCart');
    }

    async open(): Promise<void> {
        await this.goto();
        await this.cookiesPopup.rejectCookies();
    }

    async searchForProduct(searchTerm: string): Promise<void> {
        await this.searchButton.click();
        await this.searchWidget.fillInput(searchTerm);
        await this.searchWidget.submitSearch();
    }

    async addProductToCart(productName: string): Promise<void> {
        await this.page
            .getByTestId('productItem')
            .filter({ hasText: productName })
            .first()
            .getByTestId('buttonAddToCart')
            .click();
        await expect(this.headerCart).toContainText(/\d/);
    }

    searchError(): Locator {
        return this.notifier.message;
    }
}
