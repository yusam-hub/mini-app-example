<?php

namespace App\Http\Controllers\Web\Dev\Admin\Common;

use App\Http\Controllers\Web\WebBaseHttpController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class WebDevAdminCommonController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-base','actionExampleBase');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function actionExampleBase(Request $request): string
    {
        return $this->view('/admin/common/example-base');
    }
}