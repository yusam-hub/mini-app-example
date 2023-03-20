"use strict";

class TjsUiControlBase extends TjsBase
{
    #fieldName;
    #fieldValue;
    constructor(options = {}) {
        super(options);
    }

    get fieldName()
    {
        return this.#fieldName;
    }

    set fieldName(name)
    {
        this.#fieldName = name;
    }

    get fieldValue()
    {
        return this.#fieldValue;
    }

    set fieldValue(value)
    {
        this.#fieldValue = value;
    }

    toObject()
    {
        let o = super.toObject();
        o[this.fieldName] = this.fieldValue;
        return o;
    }
}