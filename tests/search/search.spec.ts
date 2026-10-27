import { test } from '@playwright/test';
import { loadData, Product } from '@shared';

interface SearchProduct extends Product {
    searchTerm: string;
}

interface SearchData {
    products: SearchProduct[];
}
const { products } = loadData<SearchData>('tests/search/search.data.json');

test.describe('Search feature', () => {
    test('Search for a product and add it to cart', async ({ page }) => {});

    test('Display validation error when searching with fewer thatn 3 characters', async ({
        page,
    }) => {});
});
