<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class ApiSwaggerController extends \YusamHub\AppExt\SymfonyExt\Http\Controllers\ApiSwaggerController
{
    protected static function getSwaggerModules(): array
    {
        return [
            'front',
            'back'
        ];
    }
}