# Estágio de Build
FROM node:20-alpine AS build

WORKDIR /app

# 1. Copia APENAS o package.json (Ignora o lockfile do Windows/Mac)
COPY package.json ./

# 2. Instala dependências do zero (Isso baixa o Rollup correto para Linux)
RUN npm install

# 3. Copia o restante do código
COPY . .

# 4. Faz o build
RUN npm run build

# Estágio de Servidor (Produção)
FROM nginx:alpine

# 5. Copia o build gerado para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 6. CRÍTICO: O Nginx roda na porta 80, não na 5173
EXPOSE 80

# 7. Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]