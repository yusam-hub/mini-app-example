#### dockers

    docker exec -it yusam-php74 sh

    docker exec -it yusam-php74 sh -c "php -m"

###### tail

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example/storage/logs && tail -f app-2023-03-21.log"

###### composer

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && composer update"

###### console

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console"

###### db migrate

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console db:migrate"

###### demo

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console demo:test"

###### console client

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:rabbit-mq-publisher hello-message"

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:web-socket-internal"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console client:web-socket-external hello-message"

###### console daemon

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:queue-logger"

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:rabbit-mq-consumer"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:react-http-server"

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console daemon:web-socket-server"

###### console openapi + swagger-ui

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console open-api:generate-json"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console swagger-ui install"

###### console db

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console db:check"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console db:migrate"

###### console show

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console show:env"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console show:server"

###### console smarty

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-app-example && php console smarty:check"

