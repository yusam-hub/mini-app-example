<?php

namespace App\Model;

use YusamHub\JsonExt\JsonObject;
class HttpServerConfigModel extends JsonObject
{
    const SOCKET_SERVER_MODE_IP = 1;
    const SOCKET_SERVER_MODE_UNIX_FILE = 2;
    public int $limitConcurrentRequests = 100;
    public int $limitRequestBodyBuffer = 2097152;
    public int $socketServerMode = self::SOCKET_SERVER_MODE_IP;
    public string $socketServerPathUri = '/tmp/http-server-socks/server.worker%d.sock';
    public string $socketServerIpUri = '0.0.0.0:1808%d';

    /**
     * @throws \ReflectionException
     */
    public function __construct(array $config = []){
        $this->import($config);
    }
}