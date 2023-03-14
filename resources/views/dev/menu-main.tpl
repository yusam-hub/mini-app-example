<!-- Menu -->
{str_replace search='/public' replace=""}
<link rel="stylesheet" href="/public/static/dev/css/menu-main.css">
{/str_replace}
{tpl_menu_main_loader varName="tpl_menu_main" requestPath=$_request.path}
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

                {if (isset($yusamCommonComposer.mainMenu.user) && !empty($yusamCommonComposer.mainMenu.user))}
                <li class="menu_float_right">
                    <a href="{$yusamCommonComposer.mainMenu.user.href}">{t}{$yusamCommonComposer.mainMenu.user.title}{/t}</a>
                    <ul class="menu_float_right">
                        {section name=i loop=$yusamCommonComposer.mainMenu.user.menu}
                        <li><a href="{$yusamCommonComposer.mainMenu.user.menu[i].href}">{t}{$yusamCommonComposer.mainMenu.user.menu[i].title}{/t}</a></li>
                        {/section}
                    </ul>
                </li>
                {/if}
                <li class="menu_float_right">
                    <select size="1" onchange="window.location.href = '/locale?locale_id='+this.options[this.selectedIndex].value+'&return='+window.location.pathname;">
                        {section name=i loop=$defaultComposer.locales}
                            <option value="{$defaultComposer.locales[i]}" {if ($defaultComposer.locales[i] == $defaultComposer.locale)}selected{/if}>{t}ui.locale.{$defaultComposer.locales[i]}{/t}</option>
                        {/section}
                    </select>
                </li>
                <li class="menu_float_right">
                    <select size="1" onchange="window.location.href = '/currency?currency_id='+this.options[this.selectedIndex].value+'&return='+window.location.pathname;">
                        {section name=i loop=$defaultComposer.currencies}
                            <option value="{$defaultComposer.currencies[i]}" {if ($defaultComposer.currencies[i] == $defaultComposer.currency)}selected{/if}>{$defaultComposer.currencies[i]}</option>
                        {/section}
                    </select>
                </li>
			</ul>

		</div>
		<div class="clear"></div>
	</div>
</div>
<!-- Menu End -->

