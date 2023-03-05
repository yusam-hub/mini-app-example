<?php

namespace App\Console\Commands\Db;

use App\Classes\PdoExt;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Helper\TableSeparator;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;

class DbCheckCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('db:check')
            ->setDescription('db:check:description')
            ->setHelp('db:check:help')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        try {
            $pdoExt = new PdoExt();

            $mysqlDt = $pdoExt->fetchOneColumn('SELECT NOW() as dt','dt');

            $phpDt = date("Y-m-d H:i:s");
            $output->writeln("");
            $table = new Table($output);
            $table
                ->setHeaders(['src', 'datetime'])
                ->setRows([
                    ['mysql', $mysqlDt],
                    new TableSeparator(),
                    ['php', $phpDt],
                ])
            ;
            $table->render();
            $output->writeln("");
            if ($mysqlDt != $phpDt) {
                $output->writeln(sprintf('<warning>WARNING: %s</>', "Invalid date time between mysql & php"));
                $output->writeln("");
            } else {
                $output->writeln('<success>SUCCESS</>');
            }

        } catch (\Throwable $e) {

            $output->writeln(sprintf('<error>ERROR: %s</>', $e->getMessage()));

        }

        return self::SUCCESS;
    }
}