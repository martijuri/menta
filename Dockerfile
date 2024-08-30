# Usa una imagen base de Ubuntu
FROM ubuntu:20.04

# Establece el directorio de trabajo
WORKDIR /app

# Instala Node.js y npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Verifica la instalación de Node.js y npm
RUN node -v
RUN npm -v

# Copia el contenido del proyecto al directorio de trabajo
COPY . /app

# Instala dependencias y construye el frontend
RUN cd frontend && npm install && npm run build

# Instala dependencias del backend
RUN cd backend && npm install

# Comando para iniciar la aplicación
CMD ["npm", "start", "--prefix", "backend"]