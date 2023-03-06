<?php

namespace App\Console\Commands\Daemon;

use Psr\Log\LoggerInterface;

class DaemonReactHttpServerCommand extends \YusamHub\AppExt\SymfonyExt\Console\Commands\Daemon\DaemonReactHttpServerCommand
{
    protected function getLoggerFromConfig(int $workerNumber): LoggerInterface
    {
        return app_ext_config('app.isDebugging')
            ? parent::getLoggerFromConfig($workerNumber)
            : app_ext_logger('queue-logging', ['channel' => 'react-http-server-' . $workerNumber]);
    }
}