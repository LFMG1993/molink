# Usar una imagen base de PHP con Apache
FROM php:8.2-apache

# Instalar extensiones necesarias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Establecer la zona horaria
RUN echo "America/Bogota" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Copiar el código de la aplicación al contenedor
COPY . /var/www/html/

# Establecer permisos adecuados
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 80
EXPOSE 80