import { test, expect } from '@shared';
import { loadData, Product } from '@shared';

interface SearchProduct extends Product {
    searchTerm: string;
}

interface SearchData {
    products: SearchProduct[];
}
const { products } = loadData<SearchData>('tests/search/search.data.json');

test.describe('Search feature', () => {
    test('Search for a product and add it to cart', async ({
        homePage,
        cartPage,
    }) => {
        const product = products[0];

        await homePage.open();
        await homePage.searchForProduct(product.searchTerm);
        await homePage.addProductToCart(product.name);

        await cartPage.goto();

        expect(await cartPage.itemCount()).toBe(1);
        await expect(cartPage.productName(product.name)).toHaveText(
            product.name,
        );
        await expect(cartPage.unitPrice(product.name)).toHaveText(
            product.price,
        );
    });

    test('Display validation error when searching with fewer than 3 characters', async ({
        homePage,
    }) => {
        await homePage.open();
        await homePage.searchForProduct('ab');

        await expect(homePage.searchError()).toBeVisible();
        await expect(homePage.searchError()).toHaveText(
            'Prosím, použite minimálne 3 znaky!',
        );
    });
});
