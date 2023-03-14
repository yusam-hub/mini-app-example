<!-- Menu -->
{str_replace search='/public' replace=""}
<link rel="stylesheet" href="/public/static/dev/css/menu-main.css">
{/str_replace}
{tpl_menu_main_loader varName="tpl_menu_main" requestPath=$_request.path}
{tpl_locales_loader varName="tpl_locales"}
{tpl_currencies_loader varName="tpl_currencies"}
<div id="menu_root">
	<div class="container">
		<div class="grid grid-17">
			<ul id="menu_main">
                {if (isset($tpl_menu_main.pathDefault, $tpl_menu_main.paths, $tpl_menu_main.details))}
                    <li>
                        <a href="{$tpl_menu_main.pathDefault}" title="{t}ui.main_menu.home{/t}">^</a>
                        <select size="1" onchange="window.location.href = this.options[this.selectedIndex].value;">
                            {foreach from=$tpl_menu_main.paths key="key" item="title"}
                                 <option value="{$key}" {if ($tpl_menu_main.pathDefault == $key)}selected{/if}>{t}{$title}{/t}</option>
                            {/foreach}
                        </select>
                    </li>
                     {tpl_menu_main_builder menu=$tpl_menu_main.details[$tpl_menu_main.pathDefault]}
                {/if}
                <li class="menu_float_right">
                    <a href="#">{t}User{/t}</a>
                    <ul class="menu_float_right">
                        <li><a href="/user/profile">{t}Profile{/t}</a></li>
                        <li><a href="/user/settings">{t}Settings{/t}</a></li>
                        <li><a href="/user/logout">{t}Logout{/t}</a></li>
                    </ul>
                </li>
                {if (isset($tpl_locales))}
                <li class="menu_float_right">
                    <select size="1" onchange="window.location.href = '/locale?id='+this.options[this.selectedIndex].value+'&return='+window.location.pathname;">
                        {foreach from=$tpl_locales.items key="key" item="title"}
                            <option value="{$key}" {if ($tpl_locales.selected == $key)}selected{/if}>{t}{$title}{/t}</option>
                        {/foreach}
                    </select>
                </li>
                {/if}
                {if (isset($tpl_currencies))}
                <li class="menu_float_right">
                    <select size="1" onchange="window.location.href = '/currency?id='+this.options[this.selectedIndex].value+'&return='+window.location.pathname;">
                        {foreach from=$tpl_currencies.items key="key" item="title"}
                            <option value="{$key}" {if ($tpl_currencies.selected == $key)}selected{/if}>{t}{$title}{/t}</option>
                        {/foreach}
                    </select>
                </li>
                {/if}
			</ul>

		</div>
		<div class="clear"></div>
	</div>
</div>
<!-- Menu End -->

