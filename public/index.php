<?php

require __DIR__ . '/../global-inc.php';

use Symfony\Component\HttpFoundation\Request;

$controllerKernel = new \YusamHub\AppExt\SymfonyExt\ControllerKernel(app()->getRootDir() . '/routes', Request::createFromGlobals(), 'default.php');
$controllerKernel->setLogger(app_ext_logger('app'));
$controllerKernel->runIndex();
