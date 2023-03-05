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
    ],
];
