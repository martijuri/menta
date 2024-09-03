# Usa una imagen base de Node.js para construir la aplicación
FROM node:16 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el contenido del proyecto al directorio de trabajo
COPY . .

# Instala las dependencias y construye el frontend
RUN cd frontend && npm install && npm run build

# Instala las dependencias del backend
RUN cd backend && npm install

# Usa una imagen base de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia el backend al contenedor de Nginx
COPY --from=build /app/backend /app/backend

# Instala Node.js en la imagen de Nginx
RUN apk add --no-cache nodejs npm

# Exponer el puerto 4000 para Nginx
EXPOSE 4000

# Inicia el backend y Nginx
CMD ["sh", "-c", "cd /app/backend && npm start & nginx -g 'daemon off;'"]