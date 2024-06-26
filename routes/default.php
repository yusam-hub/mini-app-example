<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

    \YusamHub\AppExt\SymfonyExt\Http\Controllers\Api\Debug\DebugController::routesRegister($routes);

    \App\Http\Controllers\Web\WebDevRoutes::routesRegister($routes);

    \App\Http\Controllers\Api\ApiSwaggerController::routesRegister($routes);
    \App\Http\Controllers\Api\ApiBackRoutes::routesRegister($routes);
    \App\Http\Controllers\Api\ApiFrontRoutes::routesRegister($routes);
};