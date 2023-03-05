<?php

namespace App\HttpServer;

use App\HttpServer\Interfaces\HttpServerInterface;
use App\HttpServer\Routes\DateTimeRoute;
use App\Model\HttpServerConfigModel;
use App\Traits\AppLoggingTrait;

class HttpServer implements HttpServerInterface
{
    use AppLoggingTrait;
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
        $this->logInfo(sprintf('Http Server [%s] started at [%s]', __CLASS__, date("Y-m-d H:i:s")));
        $this->logInfo('--socket-mode: ' . $this->httpServerConfig->socketServerMode);
        $this->logInfo('--worker-number: ' . $this->workerNumber);
        $this->logInfo('--testing: ' . $this->testing);

        $loop = \React\EventLoop\Loop::get();

        $http = new \React\Http\HttpServer(
            new \React\Http\Middleware\StreamingRequestMiddleware(),
            new \React\Http\Middleware\LimitConcurrentRequestsMiddleware($this->httpServerConfig->limitConcurrentRequests),
            new \React\Http\Middleware\RequestBodyBufferMiddleware($this->httpServerConfig->limitRequestBodyBuffer),
            new \App\HttpServer\Middleware\RequestBodyParserMiddleware(),
            new \App\HttpServer\Middleware\RoutesMiddleware($this)
        );

        $http->on('error', function (\Exception $e) {
            $this->logError($e->getMessage());
            if ($e->getPrevious() !== null) {
                $this->logError('PREVIOUS: ' . $e->getPrevious()->getMessage());
            }
        });

        if ($this->httpServerConfig->socketServerMode === $this->httpServerConfig::SOCKET_SERVER_MODE_IP) {
            $uri = sprintf($this->httpServerConfig->socketServerIpUri,  $this->workerNumber);
            $socket = new \React\Socket\SocketServer($uri, [], $loop);
        } else {
            $dir = pathinfo($this->httpServerConfig->socketServerPathUri, PATHINFO_DIRNAME);
            $this->logInfo('Checking dir: ' . $dir);
            if (!file_exists($dir)) {
                $this->logInfo('Creating dir: ' . $dir);
                $f = mkdir(pathinfo($this->httpServerConfig->socketServerPathUri, PATHINFO_DIRNAME), 0777, true);
                if ($f) {
                    $this->logInfo('Success dir: ' . $dir);
                } else {
                    $this->logError(sprintf('Dir [%s] not created', $dir));
                    return self::FAILURE;
                }
            } else {
                $this->logInfo('Success dir: ' . $dir);
            }

            $workerFile = sprintf($this->httpServerConfig->socketServerPathUri,  $this->workerNumber);
            if (file_exists($workerFile)) {
                unlink($workerFile);
            }

            $uri = 'unix://' . $workerFile;
            $socket = new \React\Socket\SocketServer($uri, [], $loop);

            if (file_exists($workerFile) && is_readable($workerFile)) {
                if (chmod($workerFile, 0777) === false) {
                    $this->logError(sprintf('Failed to change permission for socket file [%s]', $workerFile));
                    return self::FAILURE;
                }
            } else {
                $this->logError(sprintf('Unix socket file [%s] not found', $workerFile));
                return self::FAILURE;
            }
        }
        $this->logInfo('LISTEN: ' . $uri);

        $stop_func = function ($signal) use ($loop, $socket, &$stop_func) {
            $loop->removeSignal($signal, $stop_func);
            $this->logInfo(sprintf('Unix signal [%d]', $signal));
            $socket->close();
            $this->logInfo(sprintf('Http Server [%s] finished at [%s]', __CLASS__, date("Y-m-d H:i:s")));
            if ($this->httpServerConfig->socketServerMode === $this->httpServerConfig::SOCKET_SERVER_MODE_UNIX_FILE) {
                unlink(sprintf($this->httpServerConfig->socketServerPathUri,  $this->workerNumber));
            }
        };

        $loop->addSignal(SIGTERM, $stop_func);

        $http->listen($socket);

        return self::SUCCESS;
    }
}