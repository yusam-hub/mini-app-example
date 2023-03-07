<?php

require __DIR__ . '/../global-inc.php';

use Symfony\Component\HttpFoundation\Request;

$controllerKernel = new \YusamHub\AppExt\SymfonyExt\ControllerKernel(
    app_ext_config('routes.path'),
    Request::createFromGlobals(),
    app_ext_config('routes.default')
);
$controllerKernel->setLogger(app_ext_logger('app'));
$controllerKernel->runIndex();
