<?php

use App\Classes\Logging;
use App\Interfaces\AppLoggingInterface;
use React\MySQL\ConnectionInterface;
use React\MySQL\Factory;
use YusamHub\AppExt\Logger\Logger;

if (! function_exists('app_logger')) {

    /**
     * @param string|null $channel
     * @param array $extra
     * @return Logger
     */
    function app_logger(?string $channel = null, array $extra = []): \Psr\Log\LoggerInterface
    {
        return Logging::instance()->logger($channel, $extra);
    }
}

if (! function_exists('app_create_lazy_connection')) {

    /**
     * @param AppLoggingInterface $appLogging
     * @param Factory $factory
     * @param float|null $idle
     * @param float|null $timeout
     * @return ConnectionInterface
     */
    function app_create_lazy_connection(AppLoggingInterface $appLogging, Factory $factory, ?float $idle = 0.1, ?float $timeout = 5): ConnectionInterface
    {
        $connectionName = app_ext_config("database.default");
        $appLogging->logDebug($connectionName);

        $uri = rawurlencode(app_ext_config("database.connections.{$connectionName}.user")) . ':' . rawurlencode(app_ext_config("database.connections.{$connectionName}.password"))
            . '@' . app_ext_config("database.connections.{$connectionName}.host") . ':' . app_ext_config("database.connections.{$connectionName}.port") . '/' . app_ext_config("database.connections.{$connectionName}.dbName");
        $query = [];
        if (!is_null($idle)) {
            $query[] = 'idle='.$idle;
        }
        if (!is_null($timeout)) {
            $query[] = 'timeout='.$timeout;
        }
        $uri .= count($query) ? "?" . implode("&", $query) : "";

        $appLogging->logDebug($uri);

        $connection = $factory->createLazyConnection($uri);
        $appLogging->logDebug("LazyConnection created");

        $connection->on('error', function (\Exception $e) use($appLogging) {
            $appLogging->logError($e->getMessage());
        });

        $connection->on('close', function () use($appLogging) {
            $appLogging->logDebug("LazyConnection closed");
        });

        return $connection;
    }

}

if (! function_exists('app_create_pdo')) {

    function app_create_pdo(?string $connectionName = null): \PDO
    {
        if (is_null($connectionName)) {
            $connectionName = app_ext_config("database.default");
        }

        $dsn = sprintf(
            'mysql:host=%s;dbname=%s',
            app_ext_config("database.connections.{$connectionName}.host") . ':' . app_ext_config("database.connections.{$connectionName}.port"),
            app_ext_config("database.connections.{$connectionName}.dbName")
        );

        return new \PDO(
            $dsn,
            app_ext_config("database.connections.{$connectionName}.user"),
            app_ext_config("database.connections.{$connectionName}.password"),
            [
                \PDO::ATTR_PERSISTENT => true
            ]
        );
    }

}
