const { test, expect } = require('@playwright/test');

test('TEST 4 - Selezione categoria, ordinamento e verifica variazione prodotti', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // 1. Collegarsi al sito: https://automationteststore.com/
    await page.goto('https://automationteststore.com/');

    // 2. Cliccare su books
    await page.locator('a:visible').filter({ hasText: 'Books' }).first().click();

    // 3. Salvare su un elemento il primo item recuperato
    const primoItemPrima = await page.locator('.prdocutname').first().innerText();
    console.log(`\n[EVIDENZA] Prodotto PRIMA del riordinamento: "${primoItemPrima}"`);

    // 4. Cambiare ordine di visualizzazione mettendo "rating lowest"
    await page.locator('#sort').selectOption('rating-ASC');
    await page.waitForTimeout(1000);

    // 5. Salvare su un elemento il primo item recuperato
    const primoItemDopo = await page.locator('.prdocutname').first().innerText();
    console.log(`[EVIDENZA] Prodotto DOPO il riordinamento (Rating Lowest): "${primoItemDopo}"\n`);

    // 6. Controllare che il primo item sia diverso dal secondo item
    expect(primoItemPrima).not.toBe(primoItemDopo);
});
