<?php

use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

    $routes
        ->add('home', '/')
        ->controller(
            [\App\Http\Controllers\TestController::class, 'home']
        )
        ->methods(['GET', 'HEAD'])
    ;

    $routes
        ->add('hello', '/hello/{id}')
        ->controller(
            [\App\Http\Controllers\TestController::class, 'hello']
        )
        ->requirements(['name' => '\d+'])
        ->methods(['GET', 'HEAD'])
    ;

    $routes
        ->add('json', '/json/{id}')
        ->controller(
            [\App\Http\Controllers\TestController::class, 'json']
        )
        ->methods(['GET', 'HEAD'])
    ;

    $routes
        ->add('array', '/array/{id}')
        ->controller(
            [\App\Http\Controllers\TestController::class, 'array']
        )
        ->methods(['GET', 'HEAD'])
    ;

    $routes
        ->add('obj', '/obj/{id}')
        ->controller(
            [\App\Http\Controllers\TestController::class, 'obj']
        )
        ->methods(['GET', 'HEAD'])
    ;

    $routes
        ->add('invoke', '/invoke/{id}')
        ->controller(
            \App\Http\Controllers\TestController::class
        )
        ->methods(['GET', 'HEAD'])
    ;
};