<?php

namespace App\Http\Controllers\Web\Dev\Admin;

use App\Http\Controllers\Web\WebInterface;
use App\Http\Controllers\Web\WebBaseHttpController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class WebDevAdminController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {

    }
}