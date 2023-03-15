<?php
/**
 * Smarty plugin to format text blocks
 *
 * @package    Smarty
 * @subpackage PluginsBlock
 */
/**
 * @param array $params   parameters
 * @param string $content  contents of the block
 * @param Smarty_Internal_Template $template template object
 * @param boolean &$repeat  repeat flag
 *
 * @return string|void
 */
function smarty_block_t($params, $content, Smarty_Internal_Template $template, &$repeat)
{
    if (is_null($content)) {
        return;
    }
    return app_ext_translate($content);
}
