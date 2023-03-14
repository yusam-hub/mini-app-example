<?php

return [
    'default' => 'default',

    'templates' => [
        'default' => [
            'smarty' => [
                'debugging' => true,
                'force_compile' => true,
                'caching' => false,
                'cache_lifetime' => 120,
            ],
            'smartyDirs' => [
                'pluginDir' => __DIR__ .'/../resources/smarty_plugins',
                'templateDir' => __DIR__ .'/../resources/views/default',
                'configDir' => __DIR__ .'/../resources/views/default',
                'compileDir' => __DIR__ .'/../storage/smarty/compiles/default',
                'cacheDir' => __DIR__ .'/../storage/smarty/caches/default',
            ],
            'smartyExt' => [
                'extension' => '.tpl',
                'vendorDir' => __DIR__ . '/../vendor',
            ],
        ],
        'dev' => [
            'smarty' => [
                'debugging' => true,
                'force_compile' => true,
                'caching' => false,
                'cache_lifetime' => 120,
            ],
            'smartyDirs' => [
                'pluginDir' => __DIR__ .'/../resources/smarty_plugins',
                'templateDir' => __DIR__ .'/../resources/views/dev',
                'configDir' => __DIR__ .'/../resources/views/dev',
                'compileDir' => __DIR__ .'/../storage/smarty/compiles/dev',
                'cacheDir' => __DIR__ .'/../storage/smarty/caches/dev',
            ],
            'smartyExt' => [
                'extension' => '.tpl',
                'vendorDir' => __DIR__ . '/../vendor',
            ],
        ],
    ],
];
