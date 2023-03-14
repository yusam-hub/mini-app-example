<?php

/**
 * @param array $params
 * @param Smarty_Internal_Template $template
 * @return string
 */
function smarty_function_tpl_menu_main_builder(array $params, Smarty_Internal_Template $template): string
{
    if (!isset($params['menu'])) return '';

    $s = "";

    if (isset($params['ul'])) {
        $s .= '<ul>';
    }
    foreach($params['menu'] as $menuItem) {
        $s .= '<li><a href="'.$menuItem['href'].'">'.$menuItem['title'].'</a>';
        if (isset($menuItem['menu']) && !empty($menuItem['menu'])) {
            $s .= smarty_function_tpl_menu_main_builder(['menu' => $menuItem['menu'], 'ul' => true], $template);
        }
        $s .= '</li>';
    }
    if (isset($params['ul'])) {
        $s .= '</ul>';
    }
    return $s;
}
