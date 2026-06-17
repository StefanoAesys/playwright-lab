// src/Rubrica.js

class Rubrica {
    constructor() { 
        this.contatti = {}; 
    }
    
    create(nome, tel) { 
        this.contatti[nome] = tel; 
    }
    
    read(nome) { 
        return this.contatti[nome]; 
    }
    
    update(nome, tel) {
        if (!this.contatti[nome]) {
            throw new Error("Utente inesistente");
        }
        this.contatti[nome] = tel;
    }
    
    delete(nome) {
        if (!this.contatti[nome]) {
            throw new Error("Utente inesistente");
        }
        delete this.contatti[nome];
    }
}

// Spiegazione: Rende la classe Rubrica disponibile per essere importata in altri file
module.exports = Rubrica;
