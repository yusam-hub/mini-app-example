<?php

namespace App\Console\Commands\Client;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;

class ClientQueueLoggerCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('client:queue-logger')
            ->setDescription('client:queue-logger:description')
            ->setHelp('client:queue-logger:help')
            ->addArgument('message', InputArgument::REQUIRED, 'String to send')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $message = (string) $input->getArgument('message');
        app_ext_logger('queue-logging')->debug($message);
        $output->writeln( $this->tagGreen("Logger was debug with message: " . $message));

        return self::SUCCESS;
    }
}