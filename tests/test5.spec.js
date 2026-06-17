const { test, expect } = require('@playwright/test');

test('TEST 5 - Navigazione Mappa del Sito, ricerca Shampoo e verifica scheda prodotto', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // 1. Collegarsi al sito: https://automationteststore.com/
    await page.goto('https://automationteststore.com/');

    // 2. Fare uno scroll in basso alla pagina web
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // 3. Cliccare su "site map"
    await page.locator('a:visible').filter({ hasText: 'Site Map' }).first().click();

    // 4. Trovare il testo "shampoo" e cliccare
    await page.locator('a:visible').filter({ hasText: 'Shampoo' }).first().click();

    // 5. Cliccare l'item con test "Eau Parfumee au The Vert Shampoo"
    await page.locator('a:visible').filter({ hasText: 'Eau Parfumee au The Vert Shampoo' }).first().click();

    // 6. Controllare che il model sia 522823
    const infoProdotto = page.locator('ul.productinfo');
    await expect(infoProdotto).toContainText('522823');
    console.log('\n[EVIDENZA] Modello prodotto verificato con successo: "522823"');

    // 7. Controllare che ci sia il button add to cart
    const btnAddToCart = page.locator('.cart');
    await expect(btnAddToCart).toBeVisible();
    console.log('[EVIDENZA] Pulsante "Add to Cart" trovato e visibile a schermo');

    // 8. Controllare che ci sia il button print
    const btnPrint = page.locator('a:visible').filter({ hasText: 'Print' }).first();
    await expect(btnPrint).toBeVisible();
    console.log('[EVIDENZA] Pulsante "Print" trovato e visibile a schermo');

    // 9. Controllare che la description non sia vuota
    const descrizioneTesto = await page.locator('#description, #tab_description').innerText();
    expect(descrizioneTesto.trim().length).toBeGreaterThan(0);
    console.log(`[EVIDENZA] Descrizione verificata (Lunghezza caratteri: ${descrizioneTesto.trim().length})\n`);
});
