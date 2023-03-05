<?php

namespace App\Console\Commands\Show;

use App\Console\Commands\BaseCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ShowServerCommand extends BaseCommand
{
    protected function configure(): void
    {
        $this
            ->setName('show:server')
            ->setDescription('show:server:description')
            ->setHelp('show:server:help')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        print_r($_SERVER);
        return self::SUCCESS;
    }
}