var Class = (function(){
	var _mix = function(r,s){
		for(var p in s){
			if (s.hasOwnProperty(p)) {
				r[p] = s[p];
			}
		}
	}

	var _extend = function(){
		//开关 用来使生成原型时，不调用真正的构造流程init
		this.initPrototype = true;
		var prototype = new this();
		this.initPrototype = false;

		var items = Array.prototype.slice.call(arguments) || [];
		var item;

		// 支持混入多个属性，并且就是我们返回的子类
		while(item = items.shift()){
			_mix(prototype,item.prototype || item);
		}

		// 这边是返回的类，其实就是我们返回的子类
		function SubClass(){
			if (!SubClass.initPrototype && this.init) {
				this.init.apply(this,arguments); // 调用init真正的构造函数
			}
		}

		// 赋值原型链，完成继承
		SubClass.prototype = prototype;

		// 改变constructor引用
		SubClass.prototype.constructor = SubClass;

		// 为子类也添加extend方法
		SubClass.extend = _extend;

		return SubClass;
	}
	// 超级父类
	var Class = function(){};
	// 为超级父类添加extend方法
	Class.extend = _extend;

	return Class;
})();

// 辅助函数，获取数组里某个元素的索引 index
var _indexOf = function(array,key){
	if (array === null) return -1;
	var i=0,length = array.length;
	for (i = 0; i < length; i++) {
		if (array[i] === item) {
			return i;
		}
	}
	return -1;
}

var Event = Class.extend({
	// 添加监听
	on:function(key,listener){
		// this._events存储所有的处理函数
		if (!this.__events) {
			this.__events = {};
		}
		if (!this.__events[key]) {
			this.__events[key] = [];
		}
		if (_indexOf(this.__events,listener) === -1 && typeof listener === 'function') {
			this.__events[key].push(listener);
		}
		return this;
	},
	// 触发一个事件，也就是通知
	fire:function(key){
		if (!this.__events || !this.__events[key]) return;
		var args = Array.prototype.slice.call(arguments,1) || [];
		var listeners = this.__events[key];
		var i = 0;
		var l = listeners.length;
		for (i = 0; i < l; i++) {
			listeners[i].apply(this,args);
		}
		return this;
	},
	// 取消监听
	off:function(key,listener){
		if (!key && !listener) {
			this.__events = {};
		}
		// 不传监听函数，就去掉当前key下面的所有的监听函数
		if (key && !listener) {
			delete this.__events[key];
		}
		if (key && listener) {
			var listeners = this.__events[key];
			var index = _indexOf(listeners,listener);
			(index > -1) && listeners.splice(index,1);
		}
		return this;
	}
})

var a = new Event();
// 添加test事件
a.on("test",function(msg){
	alert(msg);
})

a.fire('test',"我是第一次触发");
a.fire('test',"我又触发");
a.off('test');
a.fire('test',"我应该看不到我了");

var Base = Class.extend(Event,{
	init: function(config){
		// 自动保存配置项
		this._config = config;
		this.bind();
		this.render();
	},
	// 可以使用get来设置配置项
	get:function(key){
		return this._config[key];
	},
	// 可以用set来设置配置项
	set:function(key,value){
		return this._config[key] = value;
	},
	bind:function(){

	},
	render:function(){

	},
	// 定义销毁的方法，一些收尾工作都应该在这里
	destroy:function(){
		this.off();
	}
});

var TextCount = Base.extend({
	_getNum:function(){
		return this.get('input').val().length;
	},
	bind:function(){
		var self = this;
		self.get('input').on('keyup',function(){
			// 通知，每当有输入的时候，就报告出去
			self.fire("Text.input",self._getNum());
			self.render();
		})
	},
	render:function(){
		var num = this._getNum();
		if ($("#J_input_count").length == 0) {
            this.get('input').after("<span id='J_input_count'></span>");
        };
        $("#J_input_count").html(num+"个字");
	},
	
});

$(function(){
	var t = new TextCount({
		// 这边直接传input的节点了，因为属性的赋值都是自动的
		input:$('#J_input')
	});
	// 监听这个输入事件
	t.on("Text.input",function(num){
		if (num > 5) {
			alert("超过5个字了。。。");
		}
	})
})



