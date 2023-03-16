<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

    \YusamHub\AppExt\SymfonyExt\Http\Controllers\Api\Debug\DebugController::routesRegister($routes);

    if (app_ext_config('smarty-ext.default') === \App\Http\Controllers\Web\WebInterface::TEMPLATE_SCHEME_DEV) {
        \App\Http\Controllers\Web\WebDevRoutes::routesRegister($routes);
    } else {
        \YusamHub\AppExt\SymfonyExt\Http\Controllers\HomeController::routesRegister($routes);
    }

    \App\Http\Controllers\Api\ApiSwaggerController::routesRegister($routes);
    \App\Http\Controllers\Api\ApiBackRoutes::routesRegister($routes);
    \App\Http\Controllers\Api\ApiFrontRoutes::routesRegister($routes);
};