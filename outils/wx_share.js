wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    appId: '', 
    timestamp: timestamp,  // 必填，生成签名的时间戳
    nonceStr: nonceStr,    // 必填，生成签名的随机串
    signature: signature,  // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] 
});
    // var url = window.location.href;
    var url = wechatUrl;
    // var iconArr = $('img');
    var icon = 'http://www.intocity.cn/files/marketing/2017-film-festival/images/wechat.png';
    var title = '2017上海国际电影电视节攻略'
    var desc = '电影节影片拍片，官方日程，影院攻略';

wx.ready(function(){
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: url, // 分享链接
        imgUrl: icon, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: title, 
        desc: desc, 
        link: url, 
        imgUrl: icon, 
        type: 'link', // 分享类型，music、video或link，不填默认为link
        dataUrl: '', 
        success: function () { 	    	       
        },
        cancel: function () { 	    	    
        }
    });
    wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: icon, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: icon, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
           // 用户取消分享后执行的回调函数
        }
    });
});
