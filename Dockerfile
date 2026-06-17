FROM mcr.microsoft.com/playwright:v1.60.0-jammy

WORKDIR /app

# Copia i file delle dipendenze ed esegui un'installazione pulita
COPY package*.json ./
RUN npm ci

# Copia tutto il resto del progetto (configurazione e test)
COPY . .

# Comando predefinito per avviare i test
CMD ["npx", "playwright", "test"]
