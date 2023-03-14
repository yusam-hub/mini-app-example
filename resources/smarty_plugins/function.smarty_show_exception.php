<?php
function smarty_function_smarty_show_exception(): void
{
    app_ext_config_set('smarty-ext.debugSmartyException', true);
}
