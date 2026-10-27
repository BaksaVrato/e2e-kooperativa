import { BasePage } from '@shared';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
    protected readonly path: string = '/kosik/';

    private readonly rows: Locator;

    constructor(page: Page) {
        super(page);

        this.rows = page
            .getByTestId('tableCart')
            .locator('[data-testid^="productItem_"]');
    }
    private row(productName: string): Locator {
        return this.rows.filter({ hasText: productName }).first();
    }

    productName(productName: string): Locator {
        return this.row(productName).getByTestId('cartProductName');
    }

    unitPrice(productName: string): Locator {
        return this.row(productName).getByTestId('cartItemPrice');
    }

    async itemCount(): Promise<number> {
        return this.rows.count();
    }
}
