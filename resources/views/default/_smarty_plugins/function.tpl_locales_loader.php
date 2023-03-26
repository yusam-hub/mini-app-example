<?php
/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return void
 */
function smarty_function_tpl_locales_loader(array $params, Smarty_Internal_Template $template): void
{
    if (isset($params['varName']) && !empty($params['varName'])) {

        $values = [
            'selected' => '',
            'items' => [],
        ];

        if ($template->smarty instanceof \YusamHub\SmartyExt\SmartyEngine) {
            $translate = $template->smarty->getLinkedValue('translate');
            if ($translate instanceof \YusamHub\AppExt\Translate) {
                $values['selected'] = $translate->getLocale()->getLocale();
                $values['items'] = $translate->getTranslate()->get('default.locales');
            }
        }

        $template->assignGlobal($params['varName'], $values);
    }
}
