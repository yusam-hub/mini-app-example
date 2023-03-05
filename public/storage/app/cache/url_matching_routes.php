<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/hello/([^/]++)(*:22)'
            .')/?$}sD',
    ],
    [ // $dynamicRoutes
        22 => [
            [['_route' => 'hello', '_controller' => ['App\\Http\\Controller\\TestController', 'hello']], ['name'], ['GET' => 0, 'HEAD' => 1], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
