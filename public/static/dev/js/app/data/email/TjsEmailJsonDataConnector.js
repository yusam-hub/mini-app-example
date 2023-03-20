"use strict";
class TjsEmailJsonDataConnector extends TjsDataConnector
{
    constructor(options = {}) {
        super(
            options
        );
    }

    doFetch(params)
    {
        this.dataSource.data = {
            'data' : [
                {'id' : 1, 'email' : 'test1@test1.loc'},
                {'id' : 2, 'email' : 'test2@test2.loc'},
            ],
            'query' : params
        };
    }

}