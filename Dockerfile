# Utilizamos una imagen base de Node.js
FROM node:14-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de la aplicación al contenedor
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instalamos las dependencias de la aplicación
RUN npm install

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto 3000
EXPOSE 3000

# Iniciamos la aplicación
CMD [ "npm", "start" ]