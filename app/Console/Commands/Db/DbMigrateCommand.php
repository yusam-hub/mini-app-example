<?php

namespace App\Console\Commands\Db;

use App\Classes\PdoExt;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;
use YusamHub\DbExt\PdoExtMigrations;

class DbMigrateCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('db:migrate')
            ->setDescription('db:migrate:description')
            ->setHelp('db:migrate:help')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $migrations = new PdoExtMigrations(new PdoExt(), app()->getDatabaseMigrationDir());
        $migrations->migrate();

        return self::SUCCESS;
    }
}