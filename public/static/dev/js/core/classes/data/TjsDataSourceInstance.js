"use strict";
class TjsDataSourceInstance extends TjsBase
{
    #dataSource;
    get dataSource()
    {
        return this.#dataSource;
    }
    set dataSource(dataSource)
    {
        this.#dataSource = dataSource;
        if (!(this.#dataSource instanceof TjsDataSource)) {
            throw Error("Invalid dataSource");
        }
    }
}