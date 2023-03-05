#### goal
    
    1) use minimum packages
    2) use config - свой, env - свой, logger - свой (normal + json) + file rotator (date + size)
    3) use mysql + migrate up/down - свой
    4) use redis
    5) use routes - свой
    6) use swagger-ui
    7) use controllers (php-fpm + php-react own http server)
    8) use console commands - symfony
    

#### test local

    php console app:http-server --socket-mode 1 --worker-number 0 --testing 0

        INFO: Http Server [App\Console\HttpServer\HttpServer] started at [2023-02-17 21:47:27]
        INFO: --socket-mode: 1
        INFO: --worker-number: 0
        INFO: --testing: 0
        INFO: LISTEN: 0.0.0.0:18080
    
        curl -vvv -X GET http://localhost:18080

    php console app:http-server --socket-mode 2 --worker-number 0 --testing 0

        INFO: Http Server [App\Console\HttpServer\HttpServer] started at [2023-02-17 21:53:27]
        INFO: --socket-mode: 2
        INFO: --worker-number: 0
        INFO: --testing: 0
        INFO: Checking dir: /tmp/http-server-socks
        INFO: Success dir: /tmp/http-server-socks
        INFO: LISTEN: unix:///tmp/http-server-socks/server.worker0.sock

        curl --unix-socket /tmp/http-server-socks/server.worker0.sock -vvv -X GET http://localhost
        curl --unix-socket /tmp/http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc
        curl --unix-socket /tmp/http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/hello/1
        curl --unix-socket /tmp/http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/hello2/1
        curl --unix-socket /tmp/http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/hello3/1

####
    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/favicon.ico
    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/certificate-dummy.jpg

    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/certificate

