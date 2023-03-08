<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

    \YusamHub\AppExt\SymfonyExt\Http\Controllers\HomeController::routesRegister($routes);
    \App\Http\Controllers\Api\ApiSwaggerController::routesRegister($routes);
    \App\Http\Controllers\Api\Back\ApiBackController::routesRegister($routes);
    \App\Http\Controllers\Api\Front\ApiFrontController::routesRegister($routes);

};