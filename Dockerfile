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

# Usa una imagen base de Node.js para el contenedor final
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos al directorio de trabajo
COPY --from=build /app .

# Instala Nginx
RUN apt-get update && apt-get install -y nginx

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Inicia el backend y Nginx
CMD ["sh", "-c", "cd /app/backend && npm start & nginx -g 'daemon off;'"]