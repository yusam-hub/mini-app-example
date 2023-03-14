<?php

namespace App\Http\Controllers\Web\Dev\Admin\Common;

use App\Http\Controllers\Web\WebBaseHttpController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class WebDevAdminCommonController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-base','actionExampleBase');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java','actionExampleJava');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java-styled-table','actionExampleJavaStyledTable');
        static::routesAdd($routes, ['OPTIONS', 'POST'], '/admin/common/example-java-styled-table/id-email-table','actionExampleJavaStyledTableIdEmailTable');
    }

    /**
     * @param Request $request
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleBase(Request $request): string
    {
        return $this->view('/admin/common/example-base');
    }

    /**
     * @param Request $request
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleJava(Request $request): string
    {
        return $this->view('/admin/common/example-java');
    }

    /**
     * @param Request $request
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleJavaStyledTable(Request $request): string
    {
        return $this->view('/admin/common/example-java-styled-table');
    }

    /**
     * @param Request $request
     * @return array[]
     */
    public function actionExampleJavaStyledTableIdEmailTable(Request $request): array
    {
        return [
            'query' => [
                'page' => 1,
                'limit' => 1,
            ],
            'data' => [
                [
                    'id' => 1,
                    'email' => 'test1@test1.loc'
                ],
                [
                    'id' => 2,
                    'email' => 'test2@test2.loc'
                ]
            ]
        ];
    }
}