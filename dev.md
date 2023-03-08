#### dockers

###### composer

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && composer update"

###### console

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console"

###### console client

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console client:rabbit-mq-publisher test"

###### console daemon

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console daemon:queue-logger"

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console daemon:rabbit-mq-consumer"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console daemon:react-http-server"

###### console openapi + swagger-ui

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console open-api:generate-json"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console swagger-ui install"

###### console db

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console db:check"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console db:migrate"

###### console show

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console show:env"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console show:server"

#### todo
    
    -   добавить проверку token и sign для api
    -   добавить таблицу для регистрации и проверки токенов