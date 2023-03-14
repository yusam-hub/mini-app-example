<?php
/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return void
 */
function smarty_function_tpl_menu_main_loader(array $params, Smarty_Internal_Template $template): void
{
    if (isset($params['varName']) && !empty($params['varName'])) {
        $jsonMenuMain = rtrim((string) $template->smarty->getTemplateDir()[0]??'','/') . "/menu-main.json";
        if (file_exists($jsonMenuMain)) {
            $template->assignGlobal($params['varName'], json_decode(file_get_contents($jsonMenuMain), true));
        }
    }
}
