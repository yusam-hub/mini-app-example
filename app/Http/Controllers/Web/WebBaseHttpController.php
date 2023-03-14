<?php

namespace App\Http\Controllers\Web;

use YusamHub\AppExt\SymfonyExt\Http\Controllers\BaseHttpController;

abstract class WebBaseHttpController extends BaseHttpController
{
    protected function getTemplateScheme(): string
    {
        return app_ext_config('smarty-ext.default');
    }

    protected function view(string $template, array $params = []): string
    {
        return app_ext_smarty_global()
            ->smartyExt($this->getTemplateScheme())
            ->view($template, $params);
    }
}