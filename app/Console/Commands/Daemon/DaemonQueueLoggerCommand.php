<?php

namespace App\Console\Commands\Daemon;

use App\Queue\QueueDaemon;
use App\Queue\QueueLogger;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;

class DaemonQueueLoggerCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('daemon:queue-logger')
            ->setDescription('daemon:queue-logger:description')
            ->setHelp('daemon:queue-logger:help')
        ;
    }

    /**
     * @throws \RedisException
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $daemon = new QueueDaemon(
            new \YusamHub\Daemon\DaemonConsole(),
            true,
            QueueLogger::QUEUE_NAME,
        );
        return $daemon->run(new \YusamHub\Daemon\DaemonOptions());
    }
}