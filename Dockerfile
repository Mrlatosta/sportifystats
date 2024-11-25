# Usa una imagen base que contenga PHP y Apache
FROM php:apache

# Instala las dependencias necesarias para MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Instala Git
RUN apt-get update && apt-get install -y git

# Clona tu repositorio desde GitHub al contenedor
RUN git clone https://github.com/Mrlatosta/sportifystats.git /var/www/html/

# Configura las variables de entorno para la base de datos
ENV MYSQL_HOST=database-sportify.cjyqay84wvgi.us-east-1.rds.amazonaws.com
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=sportify123
ENV MYSQL_DATABASE=sportifydb

# Exponer el puerto 80 para que puedas acceder a tu aplicación web
EXPOSE 80
