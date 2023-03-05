<?php

return [
    'default' => app_ext_env('LOGGING_CHANNEL', 'app'),

    'channels' => [
        'app' => [
            'class' => \YusamHub\AppExt\Logger\FileLogger::class,
            'config' => [
                'logDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'logs',
                'name' => 'app',
                'fileMaxSize' => 10 * 1024 * 1024,
                'fileRotatorCount' => 10,
                'level' => app_ext_env('LOGGING_LEVEL', \Psr\Log\LogLevel::ERROR),
                'lineFormat' => \YusamHub\AppExt\Logger\FileLogger::LINE_FORMAT_NORMAL,
            ]
        ],
        'queue-logging' => [
            'class' => \App\Queue\QueueLogger::class,
            'config' => [

            ]
        ],
        'http-server-0' => [
            'class' => \YusamHub\AppExt\Logger\FileLogger::class,
            'config' => [
                'logDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'logs',
                'name' => 'http-server-0',
                'fileMaxSize' => 10 * 1024 * 1024,
                'fileRotatorCount' => 10,
                'level' => app_ext_env('LOGGING_LEVEL', \Psr\Log\LogLevel::ERROR),
                'lineFormat' => \YusamHub\AppExt\Logger\FileLogger::LINE_FORMAT_NORMAL,
            ]
        ],
    ],
];
