<!DOCTYPE html>
<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{t}default.title{/t}</title>

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

    {str_replace search='/public' replace=""}
        <link rel="stylesheet" href="/public/static/js-base/css/app.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-msg-cropper.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-table.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-wait.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-button.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-common.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-form.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-js-msg-form.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-styled-table.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/js-yusam-tmp.css?rnd={ts}">
        <link rel="stylesheet" href="/public/static/js-base/css/social-icons.css?rnd={ts}">

        <script type="text/javascript" src="/public/static/js-base/js/init_begin.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/prototypes/string.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/prototypes/object.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/prototypes/number.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/prototypes/array.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/prototypes/any.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/functions/any.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsBase.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsInterval.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsCountdown.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsGlob.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsCookie.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsTabs.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsToggles.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/ui/controls/TjsUiControlBase.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/ui/controls/TjsUiAutoCompleteControl.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/data/TjsDataSource.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/data/TjsDataSourceInstance.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/data/TjsDataConnector.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/data/TjsUrlDataConnector.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/lang/TjsWait.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsWait.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/lang/TjsPost.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsPost.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsWs.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsMedia.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsRtcPeer.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsForm.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsMsgBase.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/lang/TjsMsg.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsMsg.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsPaginator.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsStyledTable.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/core/classes/TjsTable.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/app/data/email/TjsEmailJsonDataConnector.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/app/data/email/TjsEmailUrlDataConnector.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/app/data/email/TjsEmailTable.js?rnd={ts}"></script>
        <script type="text/javascript" src="/public/static/js-base/js/app/data/email/TjsEmailStyledTable.js?rnd={ts}"></script>

        <script type="text/javascript" src="/public/static/js-base/js/init_end.js?rnd={ts}"></script>


    {/str_replace}


    {if (isset($defaultComposer))}
    {literal}
    <script type="text/javascript">
        window.jsLocale = '{/literal}{$defaultComposer.locale}{literal}';
    </script>
    {/literal}
    {/if}

</head>
<body>

{if (isset($smartyTemplateFileMainMenu))}
    {include file="{$smartyTemplateFileMainMenu}"}
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
