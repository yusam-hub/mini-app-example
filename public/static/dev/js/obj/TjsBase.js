"use strict";

class TjsBase
{
    #settings;
    constructor(settings = {}) {
        this.#settings = settings;
    }
    get settings()
    {
        return this.#settings;
    }
}