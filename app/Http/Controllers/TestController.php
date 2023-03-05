<?php

namespace App\Http\Controllers;

use App\Classes\TestJsonObject;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TestController extends BaseController
{
    public function __invoke(Request $request, int $id): Response
    {
        return new Response(
            json_encode(
                [
                    'request' => [
                        $request->getBasePath(),
                        $request->getPathInfo(),
                        $request->getRequestUri(),
                        $request->getQueryString(),
                        $request->query->all()
                    ],
                    'status' => 'ok',
                    'data' => [
                        'id' => $id,
                        'id_get' => $request->get('id'),
                    ],
                    'duration' => sprintf("%.6F", microtime(true) - APP_START),
                ],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ),
            200,
            [
                'Content-Type' => 'application/json',
            ]
        );
    }

    public function home(Request $request): Response
    {
        return new Response(
            __METHOD__
        );
    }

    public function hello(Request $request, int $id): Response
    {
        return new Response(
            $id
        );
    }

    public function json(Request $request, int $id): Response
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

    public function array(Request $request, int $id): array
    {
        return [
            'status' => 'ok',
            'data' => [
                'id' => $id,
                'id_get' => $request->get('id'),
            ],
        ];
    }

    public function obj(Request $request, int $id): object
    {
        $source = '{"id":1}';
        $o = new TestJsonObject();
        $o->import($source);
        return (object) $o->toArray();
    }

}