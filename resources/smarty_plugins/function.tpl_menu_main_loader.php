<?php
/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return void
 */
function smarty_function_tpl_menu_main_loader(array $params, Smarty_Internal_Template $template): void
{
    if (isset($params['varName']) && !empty($params['varName']) && isset($params['requestPath']) && !empty($params['requestPath'])) {
        $jsonMenuMain = rtrim((string) $template->smarty->getTemplateDir()[0]??'','/') . "/menu-main.json";
        if (file_exists($jsonMenuMain)) {
            $menuMain = json_decode(file_get_contents($jsonMenuMain), true);
            if ($params['requestPath'] !== '/') {
                $subPath = "/".explode("/", trim($params['requestPath'],'/'), 1)[0]??'';
                $menuMain['pathDefault'] = isset($menuMain['paths'][$subPath]) ? $subPath : '/';
            }
            $template->assignGlobal($params['varName'], $menuMain);
        }
    }
}
