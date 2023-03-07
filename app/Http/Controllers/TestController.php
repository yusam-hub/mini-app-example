<?php

namespace App\Http\Controllers;

use App\Classes\TestJsonObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;

class TestController extends BaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET', 'POST'],'/hello/{id}', 'actionHello');
        static::routesAdd($routes, ['OPTIONS', 'GET', 'POST'],'/json/{id}', 'actionJson');
        static::routesAdd($routes, ['OPTIONS', 'GET', 'POST'],'/array/{id}', 'actionArray');
        static::routesAdd($routes, ['OPTIONS', 'GET', 'POST'],'/obj/{id}', 'actionObj');
        static::routesAdd($routes, ['OPTIONS', 'GET', 'POST'],'/exception/{id}', 'actionException');
    }

    public function actionHello(Request $request, int $id): Response
    {
        return new Response(
            $id
        );
    }

    public function actionJson(Request $request, int $id): Response
    {
        return new Response(
            json_encode(
                [
                    'status' => 'ok',
                    'data' => [
                        'id' => $id,
                        'id_get' => $request->get('id'),
                    ],
                ],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ),
            200,
            [
                'Content-Type' => 'application/json',
            ]
        );
    }

    public function actionArray(Request $request, int $id): array
    {
        return [
            'status' => 'ok',
            'data' => [
                'args' => [
                    $id
                ],
                'id' => $request->get('id'),
            ],
        ];
    }


    public function actionObj(Request $request, int $id): object
    {
        $source = '{"id":1}';
        $o = new TestJsonObject();
        $o->import($source);
        return (object) $o->toArray();
    }

    public function actionException(Request $request, int $id): array
    {
        throw new \RuntimeException("Some error");
        return [
        ];
    }


}