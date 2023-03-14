<!-- Menu -->
{str_replace search='/public' replace=""}
<link rel="stylesheet" href="/public/static/dev/css/menu-main.css">
{/str_replace}

<div id="menu_root">
	<div class="container">
		<div class="grid grid-17">
			<ul id="menu_main">
                {if (isset($yusamCommonComposer.mainMenu.options[$yusamCommonComposer.mainMenu.selected]))}
                    <li>
                        <a href="{$yusamCommonComposer.mainMenu.options[$yusamCommonComposer.mainMenu.selected].href}" title="{t}ui.main_menu.home{/t}">^</a>

                        <select size="1" onchange="window.location.href = this.options[this.selectedIndex].value;">
                            {foreach from=$yusamCommonComposer.mainMenu.options key="key" item="option"}
                                 <option value="{$option.href}" {if ($yusamCommonComposer.mainMenu.selected == $key)}selected{/if}>{t}{$option.title}{/t}</option>
                            {/foreach}
                        </select>
                    </li>
                    {if (isset($yusamCommonComposer.mainMenu.options[$yusamCommonComposer.mainMenu.selected].menu))}
                        tpl_menu_builder menu=$yusamCommonComposer.mainMenu.options[$yusamCommonComposer.mainMenu.selected].menu
                    {/if}
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
                {if (!is_null($defaultComposer.auth))}
                <li class="menu_float_right">
                    <a title="{t}ui.main_menu.account.cart.home{/t}" href="/account/cart">
                        <span class="account-cart {if ($yusamCommonComposer.productsCartCounter === 0)}display-none{/if}" id="product_cart_counter">{$yusamCommonComposer.productsCartCounter}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgb(255,255,255)"><path d="M16.0164 15.792C16.7535 15.792 17.4604 16.0848 17.9816 16.606C18.5028 17.1272 18.7956 17.8341 18.7956 18.5712C18.7956 19.3083 18.5028 20.0152 17.9816 20.5364C17.4604 21.0576 16.7535 21.3504 16.0164 21.3504C15.2793 21.3504 14.5724 21.0576 14.0512 20.5364C13.53 20.0152 13.2372 19.3083 13.2372 18.5712C13.2372 17.8341 13.53 17.1272 14.0512 16.606C14.5724 16.0848 15.2793 15.792 16.0164 15.792ZM16.0164 17.532C15.7408 17.532 15.4764 17.6415 15.2815 17.8364C15.0867 18.0313 14.9772 18.2956 14.9772 18.5712C14.9772 18.8468 15.0867 19.1111 15.2815 19.306C15.4764 19.5009 15.7408 19.6104 16.0164 19.6104C16.292 19.6104 16.5563 19.5009 16.7512 19.306C16.9461 19.1111 17.0556 18.8468 17.0556 18.5712C17.0556 18.2956 16.9461 18.0313 16.7512 17.8364C16.5563 17.6415 16.292 17.532 16.0164 17.532ZM5.48037 15.792C6.21746 15.792 6.92436 16.0848 7.44556 16.606C7.96676 17.1272 8.25957 17.8341 8.25957 18.5712C8.25957 19.3083 7.96676 20.0152 7.44556 20.5364C6.92436 21.0576 6.21746 21.3504 5.48037 21.3504C4.74328 21.3504 4.03638 21.0576 3.51518 20.5364C2.99398 20.0152 2.70117 19.3083 2.70117 18.5712C2.70117 17.8341 2.99398 17.1272 3.51518 16.606C4.03638 16.0848 4.74328 15.792 5.48037 15.792ZM5.48037 17.532C5.20476 17.532 4.94043 17.6415 4.74555 17.8364C4.55066 18.0313 4.44117 18.2956 4.44117 18.5712C4.44117 18.8468 4.55066 19.1111 4.74555 19.306C4.94043 19.5009 5.20476 19.6104 5.48037 19.6104C5.75599 19.6104 6.02031 19.5009 6.2152 19.306C6.41009 19.1111 6.51957 18.8468 6.51957 18.5712C6.51957 18.2956 6.41009 18.0313 6.2152 17.8364C6.02031 17.6415 5.75599 17.532 5.48037 17.532ZM5.69037 5.3952L7.87197 12.8472L16.2276 11.2596C16.8953 11.1327 17.4977 10.7768 17.9311 10.2532C18.3644 9.72964 18.6014 9.07124 18.6012 8.3916V5.3952H5.69037ZM5.16237 3.5952H20.4024V8.3916C20.4024 9.49037 20.0189 10.5547 19.3181 11.4009C18.6173 12.2472 17.6431 12.8224 16.5636 13.0272L6.60357 14.922L2.77197 1.8348L4.49997 1.3284L5.16237 3.5952Z"></path></svg>
                     </a>
                </li>
                {/if}
			</ul>

		</div>
		<div class="clear"></div>
	</div>
</div>
<!-- Menu End -->

