FROM mysql:8.0

COPY ./init.sh /docker-entrypoint-initdb.d/init.sh
COPY ./seed.sql /seed.sql
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

EXPOSE 3306
