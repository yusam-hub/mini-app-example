<?php

/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return void
 */
function smarty_function_tpl_show_exception(array $params, Smarty_Internal_Template $template): void
{
    app_ext_config_set('smarty-ext.debugSmartyException', true);
}
