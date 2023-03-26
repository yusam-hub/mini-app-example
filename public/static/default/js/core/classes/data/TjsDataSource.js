"use strict";
class TjsDataSource extends TjsBase
{
    #dataConnector;
    #data;
    #onDataChangeListener = [];
    constructor(data = {}, options = {}) {
        super(options);
        this.#data = data;
        this.#doDataChange();
    }

    get data()
    {
        return this.#data;
    }

    set data(data)
    {
        this.#data = data;
        this.#doDataChange();
    }

    #doDataChange()
    {
        let self = this;
        this.#onDataChangeListener.forEach(function(callback)
        {
            if (typeof callback === "function") {
                callback(self.#data);
            } else {
                throw Error("Invalid callback");
            }
        });
    }

    onDataChangeListener(callback)
    {
        this.#onDataChangeListener[this.#onDataChangeListener.length] = callback;
    }

    get dataConnector()
    {
        return this.#dataConnector;
    }

    set dataConnector(dataConnector)
    {
        this.#dataConnector = dataConnector;
        if (!(this.#dataConnector instanceof TjsDataConnector)) {
            throw Error("Invalid dataConnector");
        }
    }

    doDataUndefined()
    {
        this.#data = undefined;
        this.#doDataChange();
    }

    doDataFetch(params = {})
    {
        this.#dataConnector.doFetch(params);
    }

}