<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Web\Dev\WebDefHomeController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;
class WebDevRoutes extends BaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        WebDefHomeController::routesRegister($routes);
    }

}