<?php

return [
    'default' => \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV,

    'templates' => [
        \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV => [
            'smarty' => [
                'debugging' => false,
                'force_compile' => true,
                'caching' => false,
                'cache_lifetime' => 120,
            ],
            'smartyDirs' => [
                'pluginDir' => __DIR__ .'/../resources/smarty_plugins',
                'templateDir' => __DIR__ .'/../resources/views/' . \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV,
                'configDir' => __DIR__ .'/../resources/views/' . \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV,
                'compileDir' => __DIR__ .'/../storage/smarty/compiles/' . \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV,
                'cacheDir' => __DIR__ .'/../storage/smarty/caches/' . \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV,
            ],
            'smartyExt' => [
                'extension' => '.tpl',
                'vendorDir' => __DIR__ . '/../vendor',
            ],
        ],
    ],

    'debugSmartyException' => true,
];
