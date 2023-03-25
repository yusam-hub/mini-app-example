<?php

namespace App\Http\Controllers\Web;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class WebLocaleController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/locale','actionLocale');
    }

    /**
     * @param Request $request
     * @return null
     */
    public function actionLocale(Request $request)
    {
        if ($request->get('id')) {
            if ($this->getLocale()->setLocale($request->get('id'))) {
                $request->getSession()->set('locale', $request->get('id'));
            }
        }
        return new RedirectResponse("/");
    }
}