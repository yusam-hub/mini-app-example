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

        INFO: Http Server [YusamHub\AppExt\ReactHttpServer\ReactHttpServer] started at [2023-02-17 21:47:27]
        INFO: --socket-mode: 1
        INFO: --worker-number: 0
        INFO: --testing: 0
        INFO: LISTEN: 0.0.0.0:18080
    
        curl -vvv -X GET http://localhost:18080

    php console app:http-server --socket-mode 2 --worker-number 0 --testing 0

        INFO: Http Server [YusamHub\AppExt\ReactHttpServer\ReactHttpServer] started at [2023-02-17 21:53:27]
        INFO: --socket-mode: 2
        INFO: --worker-number: 0
        INFO: --testing: 0
        INFO: Checking dir: /tmp/react-http-server-socks
        INFO: Success dir: /tmp/react-http-server-socks
        INFO: LISTEN: unix:///tmp/react-http-server-socks/server.worker0.sock

        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X GET http://localhost
        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc
        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/json/1
        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/array/1
        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X GET http://mini-api-php-app-8074.loc/obj/1
        curl --unix-socket /tmp/react-http-server-socks/server.worker0.sock -vvv -X POST http://mini-api-php-app-8074.loc/array/1?q=1 -F "foo=test"

####
    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/favicon.ico
    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/certificate-dummy.jpg

    curl -vvv -X GET http://dev.vk-api.wodcom.online.loc/certificate

