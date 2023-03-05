<?php

const ROOT_DIR = __DIR__;

define('APP_START', microtime(true));

if (!defined('YUSAM_HUB_IS_DEBUGGING')) {
    define('YUSAM_HUB_IS_DEBUGGING', true);
}

if (!defined('YUSAM_HUB_DEBUG_LOG_DIR')) {
    define('YUSAM_HUB_DEBUG_LOG_DIR', realpath(ROOT_DIR . DIRECTORY_SEPARATOR . "logs"));
}

require __DIR__ . '/vendor/autoload.php';

function app(): \App\AppKernel
{
    return \App\AppKernel::instance([
        'rootDir' => ROOT_DIR,
        'appDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'app',
        'configDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'config',
        'databaseDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'database',
        'databaseMigrationDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'database' . DIRECTORY_SEPARATOR .'migrations',
        'envDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'env',
        'publicDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'public',
        'storageDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'storage',
        'storageLogDir' => ROOT_DIR . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR .'logs',
    ]);
}

\YusamHub\AppExt\Config::$CONFIG_DIR = app()->getConfigDir();
\YusamHub\AppExt\Env::$ENV_DIR = app()->getEnvDir();

