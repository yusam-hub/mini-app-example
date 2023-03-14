<!DOCTYPE html>
<html lang="{if (isset($defaultComposer.html.headTitle))}{$defaultComposer.locale|escape}{/if}">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{if (isset($defaultComposer.html.headTitle))}{$defaultComposer.html.headTitle|escape}{/if}</title>

    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width"/>
    <meta name="HandheldFriendly" content="true">

    {if (isset($defaultComposer.html.headTags))}
        {if (count($defaultComposer.html.headTags) > 0)}
            {section name=i loop=$defaultComposer.html.headTags}
                {$defaultComposer.html.headTags[i]}
            {/section}
        {/if}
    {/if}

    {if (isset($defaultComposer))}
    {literal}
    <script type="text/javascript">
        window.jsLang = {/literal}{$defaultComposer.lang}{literal};
    </script>
    {/literal}
    {/if}

    {if (isset($defaultComposer))}
    {literal}
    <script type="text/javascript">
        window.jsLocale = '{/literal}{$defaultComposer.locale}{literal}';
    </script>
    {/literal}
    {/if}

</head>
<body>

{if (isset($smartyTemplateMainMenuFile))}
    {include file="{$smartyTemplateMainMenuFile}"}
{/if}

{if (isset($defaultComposer.html.bodyTitle) || (isset($defaultComposer.pageCrumbs) && count($defaultComposer.html.pageCrumbs) > 0))}
    <!-- Header -->
    <div id="header" class="section transparent-bg">
        <div class="container">
            <div class="header-content grid grid-18">
                <div id="page-title">
                    {if (isset($defaultComposer.html.bodyTitle))}
                        <h3>{$defaultComposer.html.bodyTitle}</h3>
                    {/if}
                    {if (isset($defaultComposer.html.bodyCrumbs))}
                        {if (count($defaultComposer.html.bodyCrumbs) > 0)}
                            <h4>
                                {section name=i loop=$defaultComposer.html.bodyCrumbs}/&nbsp;<a href="{$defaultComposer.html.bodyCrumbs[i].href}">{$defaultComposer.html.bodyCrumbs[i].title}</a>&nbsp;{/section}
                            </h4>
                        {/if}
                    {/if}
                    <div class="h-sep-1"></div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
    <!-- Header End -->
{/if}

<!-- Main Content -->
<div id="main-content">

    <div class="container clearfix">

        <div class="grid grid-18">
            <div class="content-page content-box s-content h-content">

                {if (isset($smartyTemplateFileBody))}
                    {include file="{$smartyTemplateFileBody}"}
                {/if}

            </div>
        </div>

        <div class="clear"></div>
    </div>

</div>
<!-- Main Content End -->

{if (isset($smartyTemplateMainMenuFile))}
    <div id="scroll-to-top">
        <a href="#menu_root" title="Back to top"></a>
    </div>
{/if}

{if (isset($defaultComposer))}
{literal}
<script type="text/javascript">
    window.page = {/literal}{$defaultComposer.page}{literal};
</script>
{/literal}
{/if}

<div class="margin-bottom-20"></div>

{if (isset($smartyTemplateFileCss))}
    {include file="{$smartyTemplateFileCss}"}
{/if}

{if (isset($smartyTemplateFileJs))}
    {include file="{$smartyTemplateFileJs}"}
{/if}

</body>
</html>
{if ($_smarty_debugging)}{debug}{/if}
