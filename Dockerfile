# Usa una imagen base que contenga PHP y Apache
FROM php:apache

# Instala las dependencias necesarias para MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Instala Git
RUN apt-get update && apt-get install -y git

# Clona tu repositorio desde GitHub al contenedor
RUN git clone https://github.com/Marcoperez123/sportifystats.git /var/www/html/

# Configura tu base de datos MySQL
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=sportdb

# Exponer el puerto 80 para que puedas acceder a tu aplicación web
EXPOSE 80
