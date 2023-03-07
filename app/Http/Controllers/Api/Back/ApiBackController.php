<?php

namespace App\Http\Controllers\Api\Back;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;

class ApiBackController extends BaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'],'/api/back', 'getApiHome');
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getApiHome(Request $request): array
    {
        return [];
    }
}