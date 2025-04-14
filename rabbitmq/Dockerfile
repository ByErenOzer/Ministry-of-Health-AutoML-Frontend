FROM rabbitmq:3-management

# Cookie dosyası için izinleri ayarla
RUN mkdir -p /var/lib/rabbitmq \
    && chown -R rabbitmq:rabbitmq /var/lib/rabbitmq \
    && chmod -R 777 /var/lib/rabbitmq

ENV RABBITMQ_ERLANG_COOKIE=SWQOKODSQALRPCLNMEQG

USER rabbitmq 
# Cookie dosyası için izinleri ayarla
RUN mkdir -p /var/lib/rabbitmq \
    && chown -R rabbitmq:rabbitmq /var/lib/rabbitmq \
    && chmod -R 777 /var/lib/rabbitmq

ENV RABBITMQ_ERLANG_COOKIE=SWQOKODSQALRPCLNMEQG

 