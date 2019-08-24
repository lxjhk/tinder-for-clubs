!(function (win, doc) {
    var bridge;
    function LOOP() {
        
    }
    // ready
    LOOP.prototype.ready = function (callback) {
        setupWebViewJavascriptBridge(function (_bridge){
            bridge = _bridge;
            callback('success');
        })
    } 

    LOOP.prototype.getUserInfo = function (params) {    // 省略代码，举个例子，直接返回参数
        console.log('login'+params)
        bridge.callHandler('login', { appName: params.param.appName,appId: params.param.appId}, function responseCallback(responseData) {
            console.log('111'+responseData)
            params.success(responseData);
        });
    }  

    LOOP.prototype.openUrl = function (url) {
        bridge.callHandler('openUrl', { url: url });
    }  

    function setupWebViewJavascriptBridge(callback) {
        if (this.window.WebViewJavascriptBridge) { return callback(this.window.WebViewJavascriptBridge); }
        // else {
        //     setTimeout(function () { setupWebViewJavascriptBridge(callback) }, 100)
        // }
        if (this.window.WVJBCallbacks) { return this.window.WVJBCallbacks.push(callback); }
        this.window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    win.loop = new LOOP();

})(window, document);