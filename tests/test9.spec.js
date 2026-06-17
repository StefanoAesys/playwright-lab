const { test, expect } = require('@playwright/test');

test('TEST 9 - Flusso completo: Navigazione, Cart e Update', async ({ page }) => {
    test.setTimeout(60000);

    // 1. Collegarsi al sito
    await page.goto('https://automationteststore.com/');

    // 2. Cliccare su Men
    await page.getByRole('link', { name: 'Men', exact: true }).click();

    // 3. Cambiare ordine
    await page.selectOption('#sort', { label: 'Name A - Z' });
    await page.waitForLoadState('networkidle');

    // 4. Hover sul .thumbnail
    const firstProduct = page.locator('.thumbnail').first();
    await firstProduct.hover();

    const viewBtn = firstProduct.locator('a.details');
    await expect(viewBtn).toBeVisible();
    await viewBtn.click();

    // 5. Aggiungere al carrello
    await page.locator('.cart').first().click();

    // 6. Vai diretto al carrello
    await page.goto('https://automationteststore.com/index.php?rt=checkout/cart');

    // 7. Identificazione riga prodotto e Totale
    const productRow = page.locator('table.table tr').filter({ has: page.locator('input[name^="quantity"]') });
    
    // Il "Total" è la 6ª colonna (Indice 5)
    const totalLocator = productRow.locator('td').nth(5); 
    
    // Attendiamo che la riga sia visibile
    await expect(totalLocator).toBeVisible();
    
    const prezzo1Text = await totalLocator.textContent();
    const prezzo1 = parseFloat(prezzo1Text.replace('$', '').trim());
    console.log(`Prezzo iniziale: ${prezzo1}`);

    // 8. Modificare la quantity da 1 a 2
    const quantityInput = productRow.locator('input[name^="quantity"]');
    await quantityInput.fill('2');

    // 9. Click Update
    await page.locator('#cart_update').click();
    await page.waitForLoadState('networkidle');

    // 10. Salvare il nuovo prezzo
    const prezzo2Text = await totalLocator.textContent();
    const prezzo2 = parseFloat(prezzo2Text.replace('$', '').trim());
    console.log(`Prezzo aggiornato: ${prezzo2}`);

    // 11. Verifica
    expect(prezzo2).toBeGreaterThan(prezzo1);
    console.log('✓ Prezzo aumentato correttamente');

    // 12. Rimuovere l'item
    await page.locator('a[href*="remove="]').first().click();
    await page.waitForLoadState('networkidle');

    // 13. Verifica carrello vuoto
    await expect(page.locator('.contentpanel')).toContainText('Your shopping cart is empty!');
    console.log('✓ Carrello vuoto verificato');
});
