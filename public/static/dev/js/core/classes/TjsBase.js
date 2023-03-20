"use strict";

class TjsBase
{
    #lang;
    #options;

    /**
     *
     * @param options object
     */
    constructor(options = {}) {
        this.#options = options;
        this.#lang = js_lang_func(this.class);
    }

    /**
     *
     * @returns {*}
     */
    get lang()
    {
        return this.#lang;
    }

    /**
     *
     * @returns {string}
     */
    get class()
    {
        return this.constructor.name;
    }

    /**
     *
     * @returns {string[]}
     */
    getExtendClasses()
    {
        let out = [];

        let o = this.constructor;

        while (typeof o === "function") {
            o = Object.getPrototypeOf(o);
            if (typeof o === "function") {
                if (o.name !== '') {
                    out.push(o.name);
                }
            }
        }

        return out;
    }

    /**
     *
     * @returns {*}
     */
    get options()
    {
        return this.#options;
    }

    /**
     *
     * @param value
     */
    /*set options(value)
    {
        this.#options = value;
    }*/

    /**
     *
     * @returns {*}
     */
    toObject()
    {
        return {};
    }
}