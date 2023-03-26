"use strict";
class TjsDataConnector extends TjsBase
{
    #dataSource;
    constructor(dataSource, options = {})
    {
        if (!(dataSource instanceof TjsDataSource)) {
            throw Error("Invalid dataSource");
        }
        super(options);
        this.#dataSource = dataSource;
    }

    get dataSource()
    {
        return this.#dataSource;
    }

    doFetch(params)
    {
        throw Error("Method is not implemented");
    }
}