"use strict";

class TjsCookie extends TjsBase
{
    constructor(options = {}) {
        super(options);
    }

    isEnabled()
    {
        return navigator.cookieEnabled;
    }

    set(name, value, days = 365)
    {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    setWithOptions(name, value, options = {})
    {
        options = {
            'path' : '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    get(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    unset(name) {
        this.setWithOptions(name, "", {
            'max-age' : -1,
        });
    }

    keys()
    {
        return Object.keys(this.all());
    }

    all()
    {
        let pairs = document.cookie.split(";");
        let cookies = {};
        for (let i=0; i<pairs.length; i++){
            let pair = pairs[i].split("=");
            cookies[(pair[0]+'').trim()] = decodeURIComponent(pair.slice(1).join('='));
        }
        return cookies;
    }

    toObject()
    {
        let o = super.toObject();
        o = {
            ...o,
            ...this.all()
        };
        return o;
    }
}