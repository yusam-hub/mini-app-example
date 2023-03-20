"use strict";
class TjsEmailUrlDataConnector extends TjsUrlDataConnector
{
    constructor(dataSource, jsPost = undefined, options = {}) {
        super(
            dataSource,
            '/admin/common/example-java-styled-table/id-email-table',
            true,
            jsPost,
            options
        );
    }
}