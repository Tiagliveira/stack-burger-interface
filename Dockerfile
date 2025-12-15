
FROM node:20-alpine AS build

WORKDIR /app


COPY package.json ./


RUN npm install


COPY . .

# 4. Faz o build
RUN npm run build


FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]