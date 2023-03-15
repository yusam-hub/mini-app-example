<?php
/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return void
 */
function smarty_function_tpl_currencies_loader(array $params, Smarty_Internal_Template $template): void
{
    if (isset($params['varName']) && !empty($params['varName'])) {
        $template->assignGlobal($params['varName'], [
            'selected' => 'RUB',
            'items' => [
                'RUB',
                'RUP',
                'USD',
                'EUR',
            ],
        ]);
    }
}
