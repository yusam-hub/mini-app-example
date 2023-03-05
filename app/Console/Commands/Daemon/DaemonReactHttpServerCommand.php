<?php

namespace App\Console\Commands\Daemon;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use YusamHub\AppExt\ReactHttpServer\HttpServerConfigModel;
use YusamHub\AppExt\ReactHttpServer\ReactHttpServer;
use YusamHub\AppExt\SymfonyExt\Console\Commands\BaseConsoleCommand;

class DaemonReactHttpServerCommand extends BaseConsoleCommand
{
    protected function configure(): void
    {
        $this
            ->setName('daemon:react-http-server')
            ->setDescription('daemon:react-http-server:description')
            ->setHelp('daemon:react-http-server:help')
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

        $httpServerConfigModel = new HttpServerConfigModel(app_ext_config('react-http-server'));

        if ($socketMode === HttpServerConfigModel::SOCKET_SERVER_MODE_IP) {
            $httpServerConfigModel->socketServerMode = $socketMode;
        }

        if ($socketMode === HttpServerConfigModel::SOCKET_SERVER_MODE_UNIX_FILE) {
            $httpServerConfigModel->socketServerMode = $socketMode;
        }
        $httpServer = new ReactHttpServer(
            $httpServerConfigModel,
            $workerNumber,
            $testing
        );

        $httpServer->setConsoleOutput($output);
        $httpServer->setConsoleOutputEnabled(true);
        $httpServer->setLogger(
            app_ext_config('app.isDebugging')
                ? app_ext_logger('react-http-server-' . $workerNumber)
                : app_ext_logger('queue-logging', ['channel' => 'react-http-server-' . $workerNumber])
        );

        return $httpServer->run();
    }
}