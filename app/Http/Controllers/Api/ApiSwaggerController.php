<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Request;

class ApiSwaggerController extends \YusamHub\AppExt\SymfonyExt\Http\Controllers\ApiSwaggerController
{
    protected static function getSwaggerModules(): array
    {
        return [
            'front',
            'back',
            'debug'
        ];
    }

    protected function getOpenApiScanPaths(Request $request, string $module): array
    {
        return [
            __DIR__ . DIRECTORY_SEPARATOR . ucfirst($module),
            app()->getRootDir('/vendor/yusam-hub/app-ext/src/SymfonyExt/Http/Controllers/Api/' . ucfirst($module))
        ];
    }
}