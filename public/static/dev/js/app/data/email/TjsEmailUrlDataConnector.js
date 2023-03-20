"use strict";
class TjsEmailUrlDataConnector extends TjsUrlDataConnector
{
    constructor(jsPost = undefined, options = {}) {
        super(
            '/admin/common/example-java-styled-table/id-email-table',
            true,
            jsPost,
            options
        );
    }
}