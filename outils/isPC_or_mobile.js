 function is_weixn() {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    function NotPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = [ "iPhone", "iPad", "iPod"];
        // "Android","SymbianOS", "Windows Phone",
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    function not_qq(){
        var qqAgent = navigator.userAgent.toLowerCase();
        if (qqAgent.match(/QQ/i) == "qq") {
            return false;
        } else {
            return true;
        }
    };

    function jump(){
       location.href = 'https://itunes.apple.com/app/id985516094';
    }


    // 长按图片下载
    // 长按底部下载   pc兼容       2016.11.18去掉
    var isweb = parseInt(location.search.replace(/^\?id=+(.*?)+isweb=/, ""));
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
                    return {         //移动终端浏览器版本信息
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    function isWeb(){
         var userAgentInfo = navigator.userAgent;
    }
    //判断是否是app引用，如果是isweb=0，不跳转
    window.onload=function(){
      if ( !not_qq() || is_weixn() || !browser.versions.webApp) {
           setTimeout(function(){
             jump();
           },100);
        }
    }
