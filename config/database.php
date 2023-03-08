<?php

return [
    'default' => 'mysql',

    'connections' => [
        'mysql' => [
            'user' => app_ext_env('DATABASE_USER'),
            'password' => app_ext_env('DATABASE_PASSWORD'),
            'host' => app_ext_env('DATABASE_HOST'),
            'port' => app_ext_env('DATABASE_PORT'),
            'dbName' => app_ext_env('DATABASE_DBNAME'),
        ],
        'mysql2' => [
            'user' => app_ext_env('DATABASE_USER'),
            'password' => app_ext_env('DATABASE_PASSWORD'),
            'host' => app_ext_env('DATABASE_HOST'),
            'port' => app_ext_env('DATABASE_PORT'),
            'dbName' => app_ext_env('DATABASE_DBNAME'),
        ],
        'mysql3' => [
            'user' => app_ext_env('DATABASE_USER'),
            'password' => app_ext_env('DATABASE_PASSWORD'),
            'host' => app_ext_env('DATABASE_HOST'),
            'port' => app_ext_env('DATABASE_PORT'),
            'dbName' => app_ext_env('DATABASE_DBNAME'),
        ],
    ],
];
