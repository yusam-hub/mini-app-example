<?php

namespace App\Http\Controllers\Web;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;

class HomeController extends BaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/','actionHomeIndex');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function actionHomeIndex(Request $request): string
    {
        return app_ext_smarty_global()
            ->smartyExt()
            ->view('index');
    }
}