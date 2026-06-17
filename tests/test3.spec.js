const { test, expect } = require('@playwright/test');

test('TEST 3 - Ricerca prodotto, aggiunta e svuotamento carrello', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // 1. Collegarsi al sito: https://automationteststore.com/
    await page.goto('https://automationteststore.com/');

    // 2. Cliccare sulla ricerca
    const campoRicerca = page.locator('#filter_keyword');
    await campoRicerca.click();

    // 3. Scrivere book
    await campoRicerca.fill('book');
    await campoRicerca.press('Enter');

    // 4 e 5. Cliccare su add to cart
    await page.locator('.cart, .productcart').first().click();

    // 6. Fare check che sul carrello ho 1 elemento
    const cestini = page.locator('table.table-striped a i.fa-trash-o');
    await expect(cestini).toHaveCount(1);
    
    const widgetCarrello = page.locator('.topcart');
    await expect(widgetCarrello).toContainText('1 Item', { ignoreCase: true });

    // 7. Rimuovere l'elemento dal carrello
    await cestini.first().click();
    
    // Aspettiamo che la pagina abbia terminato il caricamento post-rimozione
    await page.waitForLoadState('networkidle');

    // 8. Fare check che sul carrello ho 0 elementi
    await expect(page.locator('ul.topcart .cart_total')).toContainText('0.00');

    const testoCarrelloVuoto = page.locator('.contentpanel');
    await expect(testoCarrelloVuoto).toContainText('Your shopping cart is empty!');
});
