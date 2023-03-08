<?php

error_reporting(E_ALL);

const ROOT_DIR = __DIR__;

define('APP_START', microtime(true));

if (!defined('YUSAM_HUB_IS_DEBUGGING')) {
    define('YUSAM_HUB_IS_DEBUGGING', true);
}

if (!defined('YUSAM_HUB_DEBUG_LOG_DIR')) {
    define('YUSAM_HUB_DEBUG_LOG_DIR', realpath(ROOT_DIR . "/logs"));
}

require __DIR__ . '/vendor/autoload.php';

\YusamHub\AppExt\Config::$CONFIG_DIR = __DIR__ . '/config';
\YusamHub\AppExt\Env::$ENV_DIR = __DIR__ . '/env';

