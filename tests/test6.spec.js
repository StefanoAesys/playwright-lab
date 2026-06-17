const { test, expect } = require('@playwright/test');

test('TEST 6 - Registrazione nuovo utente e verifica creazione account', async ({ page }) => {
    // Timeout a 60 secondi
    test.setTimeout(60000);

    // Generiamo dati univoci per evitare l'errore di account duplicato nei test successivi
    const IDUnivoco = Date.now();
    const loginName = `stefano_test_${IDUnivoco}`;
    const emailTest = `stefano_${IDUnivoco}@testing.com`;

    // 1. Collegarsi al sito: https://automationteststore.com/
    await page.goto('https://automationteststore.com/');

    // 2. Creare un nuovo account
    await page.locator('a:visible').filter({ hasText: 'Login or register' }).first().click();
    await page.locator('button:visible').filter({ hasText: 'Continue' }).first().click();

    // Compilazione del form: Your Personal Details
    await page.locator('#AccountFrm_firstname').fill('Stefano');
    await page.locator('#AccountFrm_lastname').fill('Aesys');
    await page.locator('#AccountFrm_email').fill(emailTest);
    await page.locator('#AccountFrm_telephone').fill('3331234567');

    // Compilazione del form: Your Address
    await page.locator('#AccountFrm_address_1').fill('Via Roma 10');
    await page.locator('#AccountFrm_city').fill('Torino');
    
    // Selezioniamo PRIMA il Paese (Italy) così il dropdown delle regioni si aggiorna
    await page.locator('#AccountFrm_country_id').selectOption('105'); 
    // Pausa tecnica obbligatoria per permettere il caricamento AJAX delle province italiane
    await page.waitForTimeout(500);
    // Ora che la lista è caricata, selezioniamo la regione (es. Piemonte o la seconda opzione disponibile)
    await page.locator('#AccountFrm_zone_id').selectOption({ index: 2 });

    await page.locator('#AccountFrm_postcode').fill('10100');

    // Compilazione del form: Login Details & Password
    await page.locator('#AccountFrm_loginname').fill(loginName);
    await page.locator('#AccountFrm_password').fill('PasswordSicura123!');
    await page.locator('#AccountFrm_confirm').fill('PasswordSicura123!');

    await page.locator('#AccountFrm_agree').check();
    await page.locator('button:visible').filter({ hasText: 'Continue' }).first().click();

    // 3. Controllare che la creazione sia avvenuta con successo
    const messaggioSuccesso = page.locator('.maintext');
    await expect(messaggioSuccesso).toContainText('Your Account Has Been Created!');
    
    // Stampiamo i dati utilizzati come evidenza del test passato
    console.log('\n[EVIDENZA] Account registrato con successo!');
    console.log(`[EVIDENZA] Username generato: "${loginName}"`);
    console.log(`[EVIDENZA] Email generata: "${emailTest}"\n`);
});
