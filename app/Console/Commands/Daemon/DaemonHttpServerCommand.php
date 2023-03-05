<?php

namespace App\Console\Commands\Daemon;

use App\Console\Commands\BaseCommand;
use App\HttpServer\HttpServer;
use App\Model\HttpServerConfigModel;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class DaemonHttpServerCommand extends BaseCommand
{
    protected function configure(): void
    {
        $this
            ->setName('daemon:http-server')
            ->setDescription('daemon:http-server:description')
            ->setHelp('daemon:http-server:help')
            ->addOption('socket-mode', null, InputOption::VALUE_OPTIONAL, 'socket mode: 1 = ip, 2 = unix-file; default=0=config', 0)
            ->addOption('worker-number', null,InputOption::VALUE_OPTIONAL, 'worker-number: any integer >= 0, default=0', 0)
            ->addOption('testing', null,InputOption::VALUE_OPTIONAL, 'testing: 0,1, default=0', 0)
        ;
    }

    /**
     * @throws \ReflectionException
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $socketMode = intval($input->getOption('socket-mode'));
        $workerNumber = abs(intval($input->getOption('worker-number')));
        $testing = intval(boolval($input->getOption('testing')));

        $httpServerConfigModel = new HttpServerConfigModel(app_ext_config('http-server'));

        if ($socketMode === HttpServerConfigModel::SOCKET_SERVER_MODE_IP) {
            $httpServerConfigModel->socketServerMode = $socketMode;
        }

        if ($socketMode === HttpServerConfigModel::SOCKET_SERVER_MODE_UNIX_FILE) {
            $httpServerConfigModel->socketServerMode = $socketMode;
        }
        $httpServer = new HttpServer(
            $httpServerConfigModel,
            $workerNumber,
            $testing
        );

        $httpServer->logSetOutput($output);

        $httpServer->logSetLogger(
            //app_logger('http-server-' . $workerNumber)
            app_logger('queue-logging', ['channel' => 'http-server-' . $workerNumber])
        );

        return $httpServer->run();
    }
}