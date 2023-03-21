<?php

namespace App\Console\Commands\Demo;

use App\Model\EmailJsTableRow;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;

class DemoTestCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('demo:test')
            ->setDescription('demo:test:description')
            ->setHelp('demo:test:help')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        EmailJsTableRow::createExamples();

        return self::SUCCESS;
    }
}