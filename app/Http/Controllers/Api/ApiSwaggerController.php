<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use YusamHub\AppExt\Api\OpenApiExt;
use YusamHub\AppExt\Api\SwaggerUiExt;
use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;

class ApiSwaggerController extends BaseHttpController
{
    /**
     * @param RoutingConfigurator $routes
     * @return void
     */
    public static function routesRegister(RoutingConfigurator $routes): void
    {
        static::routesAdd($routes, ['GET'],'/api/front', 'getApiHome');
        static::routesAdd($routes, ['GET'],'/api/back', 'getApiHome');
        static::routesAdd($routes, ['GET'],'/swagger-ui/front', 'getSwaggerUiFront');
        static::routesAdd($routes, ['GET'],'/swagger-ui/back', 'getSwaggerUiBack');
        static::routesAdd($routes, ['GET'],'/swagger-ui/front/open-api', 'getSwaggerUiFrontOpenApi');
        static::routesAdd($routes, ['GET'],'/swagger-ui/back/open-api', 'getSwaggerUiBackOpenApi');
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getApiHome(Request $request): array
    {
        return [];
    }

    /**
     * @param Request $request
     * @param string $subPath
     * @return string
     */
    private function getSwaggerUiOpenApi(Request $request, string $subPath): string
    {

        $openApiExt = new OpenApiExt([
            'paths' => [
                __DIR__ . DIRECTORY_SEPARATOR . ucfirst($subPath)
            ],
            'replaceKeyValuePair' => [
                '__OA_INFO_TITLE__' => sprintf('Api %s Server', ucfirst($subPath)),
                '__OA_INFO_VERSION__' => '1.0.0',
                '__OA_SERVER_HOSTNAME__' => $request->getHost(),
                '__OA_SERVER_PATH__' => '/api/' . strtolower($subPath),
                '__OA_SERVER_SCHEMA__' => $request->getScheme(),
                '__OA_SECURITY_SCHEME_TOKEN_HEADER_NAME__' => 'X-Token',
                '__OA_SECURITY_SCHEME_SIGN_HEADER_NAME__' => 'X-Sign',
                '__OA_METHOD_GET_HOME_PATH__' => '/',
            ]
        ]);

        try {
            //todo: use cache for production
            return $openApiExt->generateOpenApi();

        } catch (\Throwable $e) {

            $this->error($e->getMessage());

            return '{}';
        }
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getSwaggerUiFrontOpenApi(Request $request): string
    {
        return $this->getSwaggerUiOpenApi($request, 'front');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getSwaggerUiBackOpenApi(Request $request): string
    {
        return $this->getSwaggerUiOpenApi($request, 'back');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getSwaggerUiFront(Request $request): string
    {
        return SwaggerUiExt::replaceIndexHtml(app()->getPublicDir() . '/swagger-ui', '/swagger-ui','/front/open-api');
    }

    /**
     * @param Request $request
     * @return string
     */
    public function getSwaggerUiBack(Request $request): string
    {
        return SwaggerUiExt::replaceIndexHtml(app()->getPublicDir() . '/swagger-ui', '/swagger-ui','/back/open-api');
    }

}