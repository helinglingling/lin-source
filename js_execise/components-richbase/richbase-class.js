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
})()

var TextCount = Class.extend({
	init:function(config){
		this.input = $(config.id);
		this._bind();
		this.render();
	},
	render:function(){
		var num = this._getNum();
		if ($("#J_input_count").length == 0) {
            this.input.after("<span id='J_input_count'></span>");
        };
        $("#J_input_count").html(num+"个字");
	},
	_getNum:function(){
		return this.input.val().length;
	},
	_bind:function(){
		var self = this;
		self.input.on('keyup',function(){
			self.render();
		})
	}
});

$(function(){
	new TextCount({
		id:'#J_input'
	});
})



// 例子
// 继承超级父类，生成子类Animal，并且混入一些方法。这些方法会到Animal的原型上
// 另外这边不仅支持混入{},还支持混入Function
var Animal = Class.extend({
	init:function(opts){
		this.msg = opts.msg;
		this.type = "animal";
	},
	say:function(){
		console.log(this.msg+":i m a "+this.type);
	}
});
// 继承Animal，并且汇入一些方法
var Dog = Animal.extend({
	init:function(opts){
		// 并未实现super方法，直接简单使用父类原型调用即可
		Animal.prototype.init.call(this,opts);
		// 修改了type类型
		this.type = "dog";
	}
});
new Dog({msg:"hihi"}).say();







