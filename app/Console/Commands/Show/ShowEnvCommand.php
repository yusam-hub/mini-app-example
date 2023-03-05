<?php

namespace App\Console\Commands\Show;

use App\Console\Commands\BaseCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ShowEnvCommand extends BaseCommand
{
    protected function configure(): void
    {
        $this
            ->setName('show:env')
            ->setDescription('show:env:description')
            ->setHelp('show:env:help')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        print_r($_ENV);
        return self::SUCCESS;
    }
}