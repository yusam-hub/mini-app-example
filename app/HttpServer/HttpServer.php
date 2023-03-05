<?php

namespace App\HttpServer;

use App\HttpServer\Interfaces\HttpServerInterface;
use App\HttpServer\Routes\DateTimeRoute;
use App\Model\HttpServerConfigModel;
use App\Traits\AppLoggingTrait;
use YusamHub\AppExt\Interfaces\GetSetConsoleInterface;
use YusamHub\AppExt\Interfaces\GetSetLoggerInterface;
use YusamHub\AppExt\Traits\GetSetConsoleTrait;
use YusamHub\AppExt\Traits\GetSetLoggerTrait;

class HttpServer implements GetSetConsoleInterface, GetSetLoggerInterface
{
    use GetSetConsoleTrait;
    use GetSetLoggerTrait;
    public const SUCCESS = 0;
    public const FAILURE = 1;
    protected HttpServerConfigModel $httpServerConfig;
    protected int $workerNumber;

    protected int $testing;

    public function __construct(HttpServerConfigModel $httpServerConfig, int $workerNumber = 0, int $testing = 0)
    {
        $this->httpServerConfig = $httpServerConfig;
        $this->workerNumber = $workerNumber;
        $this->testing = $testing;
    }

    /**
     * @return bool
     */
    public function isTesting(): bool
    {
        return $this->testing >= 1;
    }

    /**
     * @return int
     */
    public function run(): int
    {
        $this->info(sprintf('Http Server [%s] started at [%s]', __CLASS__, date("Y-m-d H:i:s")));
        $this->info('--socket-mode: ' . $this->httpServerConfig->socketServerMode);
        $this->info('--worker-number: ' . $this->workerNumber);
        $this->info('--testing: ' . $this->testing);

        $loop = \React\EventLoop\Loop::get();

        $http = new \React\Http\HttpServer(
            new \React\Http\Middleware\StreamingRequestMiddleware(),
            new \React\Http\Middleware\LimitConcurrentRequestsMiddleware($this->httpServerConfig->limitConcurrentRequests),
            new \React\Http\Middleware\RequestBodyBufferMiddleware($this->httpServerConfig->limitRequestBodyBuffer),
            new \App\HttpServer\Middleware\RequestBodyParserMiddleware(),
            new \App\HttpServer\Middleware\RoutesMiddleware($this)
        );

        $http->on('error', function (\Exception $e) {
            $this->error($e->getMessage());
            if ($e->getPrevious() !== null) {
                $this->error('PREVIOUS: ' . $e->getPrevious()->getMessage());
            }
        });

        if ($this->httpServerConfig->socketServerMode === $this->httpServerConfig::SOCKET_SERVER_MODE_IP) {
            $uri = sprintf($this->httpServerConfig->socketServerIpUri,  $this->workerNumber);
            $socket = new \React\Socket\SocketServer($uri, [], $loop);
        } else {
            $dir = pathinfo($this->httpServerConfig->socketServerPathUri, PATHINFO_DIRNAME);
            $this->info('Checking dir: ' . $dir);
            if (!file_exists($dir)) {
                $this->info('Creating dir: ' . $dir);
                $f = mkdir(pathinfo($this->httpServerConfig->socketServerPathUri, PATHINFO_DIRNAME), 0777, true);
                if ($f) {
                    $this->info('Success dir: ' . $dir);
                } else {
                    $this->error(sprintf('Dir [%s] not created', $dir));
                    return self::FAILURE;
                }
            } else {
                $this->info('Success dir: ' . $dir);
            }

            $workerFile = sprintf($this->httpServerConfig->socketServerPathUri,  $this->workerNumber);
            if (file_exists($workerFile)) {
                unlink($workerFile);
            }

            $uri = 'unix://' . $workerFile;
            $socket = new \React\Socket\SocketServer($uri, [], $loop);

            if (file_exists($workerFile) && is_readable($workerFile)) {
                if (chmod($workerFile, 0777) === false) {
                    $this->error(sprintf('Failed to change permission for socket file [%s]', $workerFile));
                    return self::FAILURE;
                }
            } else {
                $this->error(sprintf('Unix socket file [%s] not found', $workerFile));
                return self::FAILURE;
            }
        }
        $this->info('LISTEN: ' . $uri);

        $stop_func = function ($signal) use ($loop, $socket, &$stop_func) {
            $loop->removeSignal($signal, $stop_func);
            $this->info(sprintf('Unix signal [%d]', $signal));
            $socket->close();
            $this->info(sprintf('Http Server [%s] finished at [%s]', __CLASS__, date("Y-m-d H:i:s")));
            if ($this->httpServerConfig->socketServerMode === $this->httpServerConfig::SOCKET_SERVER_MODE_UNIX_FILE) {
                unlink(sprintf($this->httpServerConfig->socketServerPathUri,  $this->workerNumber));
            }
        };

        $loop->addSignal(SIGTERM, $stop_func);

        $http->listen($socket);

        return self::SUCCESS;
    }
}