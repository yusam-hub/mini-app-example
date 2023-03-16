<?php

namespace App\Http\Controllers\Web\Dev\Admin\Common;

use App\Http\Controllers\Web\WebBaseHttpController;
use App\Model\EmailJsTableRow;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\JsTable\JsTableQuery;

class WebDevAdminCommonController extends WebBaseHttpController
{
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-base','actionExampleBase');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java','actionExampleJava');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java-styled-table','actionExampleJavaStyledTable');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java-table','actionExampleJavaTable');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java-ws','actionExampleJavaWs');
        static::routesAdd($routes, ['OPTIONS', 'GET'], '/admin/common/example-java-rtc-peer','actionExampleJavaRtcPeer');

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
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleJavaTable(Request $request): string
    {
        return $this->view('/admin/common/example-java-table');
    }

    /**
     * @param Request $request
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleJavaWs(Request $request): string
    {
        return $this->view('/admin/common/example-java-ws');
    }

    /**
     * @param Request $request
     * @return string
     * @throws \SmartyException
     */
    public function actionExampleJavaRtcPeer(Request $request): string
    {
        return $this->view('/admin/common/example-java-rtc-peer');
    }

    /**
     * @param Request $request
     * @return array
     * @throws \ReflectionException
     */
    public function actionExampleJavaStyledTableIdEmailTable(Request $request): array
    {
        $jsTableQuery = new JsTableQuery($request->request->all());
        $emailsJsTableResponse = EmailJsTableRow::getEmailsJsTableResponse($jsTableQuery);
        return $emailsJsTableResponse->toArray();
    }
}