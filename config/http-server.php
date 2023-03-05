<?php

return [
    'limitConcurrentRequests' => intval(app_ext_env('HTTP_SERVER_LIMIT_CONCURRENT_REQUESTS', 100)),
    'limitRequestBodyBuffer' => intval(app_ext_env('HTTP_SERVER_LIMIT_REQUEST_BODY_BUFFER', 2097152)),
    'socketServerMode' => \App\Model\HttpServerConfigModel::SOCKET_SERVER_MODE_UNIX_FILE,
    'socketServerPathUri' => '/tmp/http-server-socks/server.worker%d.sock',
    'socketServerIpUri' => '0.0.0.0:1808%d',
    'xApiToken' => app_ext_env('HTTP_SERVER_API_TOKEN', ''),
];
