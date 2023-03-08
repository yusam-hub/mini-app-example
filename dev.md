#### dockers

    docker exec -it yusam-php74 sh -c bash
        cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app
        php console daemon:react-http-server

    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && php console daemon:react-http-server"
    docker exec -it yusam-php74 sh -c "cd /var/www/data/yusam/github/yusam-hub/mini-api-php-app && composer update"