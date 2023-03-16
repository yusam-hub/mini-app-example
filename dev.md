#### dockers

###### composer

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && composer update"

###### console

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console"

###### console client

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:rabbit-mq-publisher test"

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:web-socket-internal"
    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:web-socket-external my-test-message"

###### console daemon

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:queue-logger"

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:rabbit-mq-consumer"
    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:react-http-server"

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:web-socket-server"

###### console openapi + swagger-ui

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console open-api:generate-json"
    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console swagger-ui install"

###### console db

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console db:check"
    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console db:migrate"

###### console show

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console show:env"
    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console show:server"

###### console smarty

    docker exec -it nginx-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console smarty:check"

