<?php

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
