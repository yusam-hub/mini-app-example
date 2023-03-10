<?php

return [
    'default' => 'default',

    'connections' => [
        'default' => [
            'user' => app_ext_env('DATABASE_USER'),
            'password' => app_ext_env('DATABASE_PASSWORD'),
            'host' => app_ext_env('DATABASE_HOST'),
            'port' => app_ext_env('DATABASE_PORT'),
            'dbName' => app_ext_env('DATABASE_DBNAME'),
        ],
    ],

    'migrations' => [
        'paths' => [
            app()->getRootDir('/vendor/yusam-hub/app-ext/database/migrations'),
            app()->getDatabaseDir('/migrations'),
        ],
        'savedDir' => app()->getStorageDir('/app/migrations')
    ],
];
