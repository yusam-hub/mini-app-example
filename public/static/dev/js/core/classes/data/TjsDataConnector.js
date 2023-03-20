"use strict";
class TjsDataConnector extends TjsBase
{
    #dataSource;
    constructor(options = {}) {
        super(options);
    }

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
        if (typeof this.#dataSource.dataConnector === "undefined"){
            this.#dataSource.dataConnector = this;
        } else if (this.#dataSource.dataConnector.constructor.name !== this.constructor.name) {
            this.#dataSource.dataConnector = this;
        }
    }

    doFetch(params)
    {
        throw Error("Method is not implemented");
    }

}