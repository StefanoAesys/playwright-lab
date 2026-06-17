const { test, expect } = require('@playwright/test');

// Importa la classe Rubrica dal file separato.
const Rubrica = require('../src/Rubrica');

test('TEST 1 - Unit Test Rubrica CRUD', async () => {
    // 1. Creare una rubrica con comandi CRUD suddivisi tra di loro
    const rubrica = new Rubrica();
    
    // 2. Controllare che l'aggiunta di un nuovo utente vada a buon fine
    rubrica.create('Mario Rossi', '3331234567');
    expect(rubrica.read('Mario Rossi')).toBe('3331234567');
    
    // 3. Controllare che la modifica dell'utente appena aggiunto vada a buon fine
    rubrica.update('Mario Rossi', '3339999999');
    expect(rubrica.read('Mario Rossi')).toBe('3339999999');
    
    // 4. Controllare che la rimozione dell'utente appena modificato vada a buon fine
    rubrica.delete('Mario Rossi');
    expect(rubrica.read('Mario Rossi')).toBeUndefined();
    
    // 5. Controllare che la modifica di un utente inesistente ritorni errore
    expect(() => {
        rubrica.update('Finto', '1');
    }).toThrow('Utente inesistente');
    
    // 6. Controllare che la rimozione di un utente inesistente ritorni errore
    expect(() => {
        rubrica.delete('Finto');
    }).toThrow('Utente inesistente');
});
