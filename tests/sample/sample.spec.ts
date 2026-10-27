import { test, expect } from '@playwright/test';
import { loadData } from '@shared';

interface SampleType {
    name: string;
}
interface SampleData {
    sampleData: SampleType[];
}

const data = loadData<SampleData>('tests/sample/sample.data.json');

test('has title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(
        'Palmáreň – Exotické palmy a mrazuvzdorné rastliny | exotickepalmy.sk',
    );
});

for (const { name } of data.sampleData) {
    test(`sample entry for ${name}`, async () => {
        expect(name).toBeTruthy();
    });
}
