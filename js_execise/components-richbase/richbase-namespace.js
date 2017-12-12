var textCount = {
    input: null,
    init: function(config){
        this.input = $(config.id);
        this.bind();
        // 这边范围对应的对象，可以实现链式调用
        return this;
    },
    bind:function(){
        var self = this;
        this.input.on('keyup', function(event) {
            // 注意使用 self ，当前方法的 this
            self.render();
        });
    },
    getNum:function(){
        return this.input.val().length;
    },
    // 渲染元素
    render:function(){
        var num = this.getNum();
        if ($("#J_input_count").length == 0) {
            this.input.after("<span id='J_input_count'></span>");
        };
        $("#J_input_count").html(num+"个字");
    }
};

$(function(){
    // 在 domready 后调用
    textCount.init({id:'#J_input'}).render();
})


// 函数闭包
// 这种写法，把所有的东西都包在了一个自动执行的闭包里面，所以不会受到外面的影响，
// 并且只对外公开了TextCountFun构造函数，生成的对象只能访问到init,render方法。
// 这种写法已经满足绝大多数的需求了。事实上大部分的jQuery插件都是这种写法。
var TextCount = (function(){
    // 私有方法，外面访问不到
    var _bind = function(that){
        that.input.on('keyup',function(){
            that.render();
        });
    }
    var _getNum = function(that){
        return that.input.val().length;
    }

    var TextCountFun = function(config){

    }

    TextCountFun.prototype.init = function(config){
        this.input = $(config.id);
        _bind(this);
        return this;
    };

    TextCountFun.prototype.render = function(){
        var num = _getNum(this);
        if ($("#J_input_count").length == 0) {
            this.input.after("<span id='J_input_count'></span>");
        };
        $("#J_input_count").html(num+"个字");
    };
    // 返回构造函数
    return TextCountFun;

})();

$(function(){
    new TextCount().init({id:'#J_input'}).render();
})


