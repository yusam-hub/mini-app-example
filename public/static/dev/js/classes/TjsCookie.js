let TjsCookie = function() {

};

TjsCookie.prototype = {

    /**
     *
     * @returns {boolean}
     */
    isCookieEnabled: function()
    {
        return navigator.cookieEnabled;
    },

    /**
     *
     * @param name
     * @param value
     * @param days
     */
    setCookie: function(name, value, days = 365) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    /**
     *
     * @param name
     * @param value
     * @param options
     */
    setCookieWithOptions: function(name, value, options = {})
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
    },
    /**
     *
     * @param name
     * @returns {string|undefined}
     */
    getCookie: function(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    /**
     *
     * @param name
     */
    unsetCookie: function(name) {
        this.setCookieWithOptions(name, "", {
            'max-age' : -1,
        });
    }
}
