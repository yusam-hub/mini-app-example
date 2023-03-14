<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Web\Dev\Admin\Common\WebDevAdminCommonController;
use App\Http\Controllers\Web\Dev\Admin\WebDevAdminController;
use App\Http\Controllers\Web\Dev\Ajax\WebDevAjaxController;
use App\Http\Controllers\Web\Dev\WebDevHomeController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;
class WebDevRoutes extends BaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        WebDevHomeController::routesRegister($routes);
        WebDevAdminController::routesRegister($routes);
        WebDevAdminCommonController::routesRegister($routes);
        WebDevAjaxController::routesRegister($routes);
    }

}