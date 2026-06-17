const { test, expect } = require('@playwright/test');

test('TEST 7 - Navigazione sezione Specials e verifica presenza badge Sale', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // 1. Collegarsi al sito: https://automationteststore.com/
    await page.goto('https://automationteststore.com/');

    // 2. Cliccare su specials
    await page.locator('a:visible').filter({ hasText: 'Specials' }).first().click();

    // 3. Controllare che ci sia l'item "sale" negli elementi recuperati
    const badgeSale = page.locator('span.sale, a.sale').filter({ behavior: 'visible' }).first();
    await expect(badgeSale).toBeVisible();

    // Saliamo al box contenitore del prodotto usando l'asse XPath per trovare il titolo associato al badge "sale"
    const nomeProdotto = await page.locator('span.sale >> xpath=ancestor::div[contains(@class, "thumbnail")]//a[contains(@class, "prdocutname")]').first().innerText();
    
    console.log(`\n[EVIDENZA] Test superato! Il prodotto in offerta trovato è: "${nomeProdotto.trim()}"\n`);
});
