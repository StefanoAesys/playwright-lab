# 🧪 Playwright Lab - Dockerized Test Suite

Questo repository contiene una suite di 9 test (unitari ed e-commerce) automatizzati tramite **Playwright**, completamente isolati e containerizzati con **Docker**. L'infrastruttura garantisce l'esecuzione identica dei test sia sul PC locale che nell'ambiente di CI/CD su GitHub Actions.

---

## 📋 Prerequisiti

Per eseguire i test in locale, non è necessario installare Node.js, Playwright o i browser sulla macchina ospite. L'unico requisito è:
* **Docker** (Docker Desktop o Docker Engine attivo)
* **Git**

---

## 🚀 Guida all'Uso in Locale

I comandi vanno eseguiti all'interno della cartella principale del progetto (`playwright-lab/`).

### 1. Build (o aggiornamento) dell'immagine
Esegui questo comando la prima volta, o ogni volta che modifichi la struttura del progetto, il file `package.json` o aggiungi nuovi file di test:
```bash
docker build -t playwright-lab:latest .
