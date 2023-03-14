let TjsYusam = function(jsDeviceUUID) {

    this.jsDeviceUUID = jsDeviceUUID;

};

TjsYusam.prototype = {
    /**
     *
     * @returns {string}
     */
    getDeviceBrowserId: function()
    {
        let du = this.jsDeviceUUID.parse();
        let dua = [
            du.language,
            du.platform,
            du.os,
            du.cpuCores,
            du.isAuthoritative,
            du.silkAccelerated,
            du.isKindleFire,
            du.isDesktop,
            du.isMobile,
            du.isTablet,
            du.isWindows,
            du.isLinux,
            du.isLinux64,
            du.isMac,
            du.isiPad,
            du.isiPhone,
            du.isiPod,
            du.isSmartTV,
            du.pixelDepth,
            du.isTouchScreen,
            du.source,
        ];
        return du.hashMD5(dua.join(''));
    }
}

