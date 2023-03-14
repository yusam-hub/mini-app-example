<?php

namespace App\Http\Controllers\Web\Dev\Ajax;

use App\Http\Controllers\Web\WebBaseHttpController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class WebDevAjaxController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['POST'], '/ajax/test','postTest');
    }

    /**
     * @param Request $request
     * @return array
     */
    public function postTest(Request $request): array
    {
        return [
            'query' => $request->query->all(),
            'params' => $request->request->all(),
            'files' => app_ext_get_files($request),
        ];
    }
}