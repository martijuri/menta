# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Copiar los archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

# Instalar serve globalmente
RUN npm install -g serve

# Copiar los archivos de construcción desde la etapa de construcción
COPY --from=build /app/build /app/build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar serve
CMD ["serve", "-s", "build", "-l", "3000"]