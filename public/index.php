<?php

require __DIR__ . '/../global-inc.php';

use Symfony\Component\HttpFoundation\Request;

try {
    $controllerKernel = new \App\Http\ControllerKernel(app()->getRootDir() . '/routes', Request::createFromGlobals(), 'default.php');
    $controllerKernel->runIndex();
} catch (\Throwable $e) {
    echo "Exception: " . $e->getMessage() , ' ' . get_class($e) .', ' . $e->getFile() . ':'. $e->getLine();
}
