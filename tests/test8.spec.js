const { test, expect } = require('@playwright/test');

test('TEST 8 - Ricerca prodotto inesistente "qwerty"', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // 1. Collegarsi al sito
    await page.goto('https://automationteststore.com/');

    // 2. & 3. Cliccare sulla barra di ricerca e scrivere "qwerty"
    const searchBar = page.locator('#filter_keyword');
    await searchBar.fill('qwerty');
    
    // Premiamo Invio
    await searchBar.press('Enter');

    // 4. Controllare che nessun risultato sia recuperato
    const messaggioErrore = page.locator('.contentpanel');
    
    await expect(messaggioErrore).toContainText('There is no product that matches the search criteria.');
    
    console.log('\n[EVIDENZA] Test superato: Ricerca "qwerty" ha correttamente restituito il messaggio di "nessun prodotto trovato".\n');
});
