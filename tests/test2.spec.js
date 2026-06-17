const { test, expect } = require('@playwright/test');

test('TEST 2 - Flusso completo acquisti e calcoli carrello', async ({ page }) => {
    // Alziamo il timeout a 60 secondi per gestire i tempi dilatati dello slowMo senza andare in errore
    test.setTimeout(120000);

    // 1. Collegarsi al sito
    await page.goto('https://automationteststore.com/');

    const sezioniMenu = page.locator('nav.subnav ul.nav-pills > li > a');
    const conteggio = await sezioniMenu.count();
    
    // 2. Controllare che tutte le sezioni di acquisto siano cliccabili
    for (let i = 0; i < conteggio; i++) {
        await expect(sezioniMenu.nth(i)).toBeVisible();
        await expect(sezioniMenu.nth(i)).toBeEnabled();
    }

    // 3. Selezionare la prima sezione di acquisto (APPAREL & ACCESSORIES)
    await page.getByRole('link', { name: 'Apparel & accessories' }).first().click();
    await page.getByRole('link', { name: 'Shoes' }).first().click();
    await page.locator('.fixed_wrapper .prdocutname').nth(1).click();
    
    // 4. Selezionare la taglia delle scarpe recuperate
    const tendina = page.locator('select[id^="product_option"]');
    if (await tendina.count() > 0) {
        await tendina.first().selectOption({ index: 1 });
    }
    
    // 5. Inserire nel carrello il primo elemento una volta
    await page.locator('.cart, .productcart').first().click();

    // 6. Selezionare la seconda sezione di acquisto (MAKEUP)
    await page.getByRole('link', { name: 'Makeup', exact: true }).first().click();
    
    // 7. Inserire nel carrello il terzo elemento tre volte
    await page.locator('.fixed_wrapper .prdocutname').nth(3).click();
    await page.locator('#product_quantity').fill('3');
    await page.locator('.cart, .productcart').first().click();

    // 8. Selezionare il carrello
    await page.goto('https://automationteststore.com/index.php?rt=checkout/cart');

    // --- SEZIONE CONTROLLO PREZZI ---
    
    // Estraiamo il testo del Sub-Totale (es: "$45.50")
    const testoSub = await page.locator('.cart_total table td:has-text("Sub-Total") + td span').innerText();
    // Puliamo la stringa tenendo solo numeri e punti tramite espressione regolare, poi la convertiamo in numero decimale
    const subTotale = parseFloat(testoSub.replace(/[^0-9.]/g, ''));

    // Facciamo la stessa identica cosa per estrarre il valore numerico della spedizione
    const testoSped = await page.locator('.cart_total table td:has-text("Flat Shipping Rate") + td span').first().innerText();
    const spedizione = parseFloat(testoSped.replace(/[^0-9.]/g, ''));

    // Estraiamo il valore numerico del Totale complessivo finale riportato dalla pagina
    const testoTot = await page.locator('.cart_total table td:has-text("Total") + td span').last().innerText();
    const totaleGlobale = parseFloat(testoTot.replace(/[^0-9.]/g, ''));

    // 9. Controllare che il prezzo visualizzato nella home sia uguale al sub-totale nella sezione del carrello
    console.log('\n====== VERIFICA CONTEGGI CARRELLO ======');
    console.log(`-> Sub-Totale letto:    $${subTotale}`);
    console.log(`-> Spedizione letta:    $${spedizione}`);
    console.log(`-> Somma calcolata:     $${subTotale + spedizione}`);
    console.log(`-> Totale a schermo:    $${totaleGlobale}`);
    console.log('========================================\n');

    // 10. Controllare che la somma del prezzo compreso di spedizione sia uguale al totale nel carrello
    expect(subTotale + spedizione).toBe(totaleGlobale);

    // 11. Rimuovere tutti gli elementi dal carrello
    await page.waitForSelector('table.table-striped a i.fa-trash-o', { state: 'visible' });
    const trash = page.locator('table.table-striped a i.fa-trash-o');
    
    // Ciclo WHILE: Fino a quando il conteggio dei cestini visibili sulla pagina è superiore a 0...
    while (await trash.count() > 0) {
        await trash.first().click();
        await page.waitForTimeout(500);
    }

    // 12. Controllare che il totale nella home sia uguale a 0
    await page.getByRole('link', { name: 'Home', exact: true }).first().click();
    
    // Verifichiamo che il contatore del carrello in alto a destra mostri la cifra azzerata "0.00"
    await expect(page.locator('ul.topcart .cart_total')).toContainText('0.00');

    // 13. Controllare che nella sezione carrello non ci siano più elementi
    await page.locator('ul.topcart a.dropdown-toggle').click();
    
    // 14. Controllare che nella sezione carrello sia presente il testo "Your shopping cart is empty!"
    await expect(page.locator('.contentpanel')).toContainText('Your shopping cart is empty!');
});
