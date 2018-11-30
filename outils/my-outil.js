
    // 处理图片显示尺寸  jquery
    window.initImgSize = function(box,img){
        img.each(function(index,el){
            if (el.complete) {
                var box_w = box.width(),
                    box_h = box.height(),
                    img_w = $(el).width(),
                    img_h = $(el).height();

                if (parseFloat(box_w/box_h) > parseFloat(img_w/img_h)) {
                    $(el).css({'width':'100%','height':'auto'});
                    var move_h = -(($(el).height() - box_h)/2);
                    $(el).css({'margin-top':move_h + 'px'});
                }else{
                    $(el).css({'width':'auto','height':'100%'});
                    var move_w = -(($(el).width() - box_w)/2);
                    $(el).css({'margin-left':move_w + 'px'});
                }
            }else{
                $(el).load(function(){
                    var box_w = box.width(),
                        box_h = box.height(),
                        img_w = $(el).width(),
                        img_h = $(el).height();

                    if (parseFloat(box_w/box_h) > parseFloat(img_w/img_h)) {
                        $(el).css({'width':'100%','height':'auto'});
                        var move_h = -(($(el).height() - box_h)/2);
                        $(el).css({'margin-top':move_h + 'px'});
                    }else{
                        $(el).css({'width':'auto','height':'100%'});
                        var move_w = -(($(el).width() - box_w)/2);
                        $(el).css({'margin-left':move_w + 'px'});
                    }
                })
            }

        });
    }


// 判断输入是否是正确的邮箱格式
function isAvailableEmail(sEmail) {
    var emailReg = /^([\w\.])+\@(([\w])+\.)+([\w]+)+$/;
    return emailReg.test(sEmail);
}

/*
给定字符串 str，检查其是否符合美元书写格式
1、以 $ 开始
2、整数部分，从个位起，满 3 个数字用 , 分隔
3、如果为小数，则小数部分长度为 2
4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3
*/
function isUSD(str) {
	var reg = /^\$(0|[1-9]|[1-9]\d{0,2})(,\d{3})*(\.\d{2})?$/;
    return reg.test(str);
}

/*
如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2
*/
function strLength(s, bUnicode255For1) {
    var len = 0;
    if(bUnicode255For1 === true){
        len = s.length;
    }else{
        for(var i=0;i<s.length;i++){
            if(s.charCodeAt(i) > 255){
               len += 2;
                continue;
            }
            len++;
        }
    }
    return len;
}


/*
获取 url 中的参数
1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组
*/
function getUrlParam(sUrl, sKey) {
    var urlArr = sUrl.split("?");
    var paramArr = urlArr[1].split("#")[0].split("&");
    var obj = {};
    for(var i=0,len=paramArr.length;i<len;i++){
        var param = paramArr[i].split("=");
        param[1] = param[1] ? decodeURI(param[1]): true;
        if(obj[param[0]]){
            var arr = typeof obj[param[0]] == "object" ? obj[param[0]] : [obj[param[0]]];
            arr.push(param[1]);
            obj[param[0]] = arr;
        }else{
            obj[param[0]] = param[1];
        }
       
    }
    if(sKey){
        return obj[sKey] != null ? obj[sKey] : "";
    }else{
        return obj;
    }
}

// 小芋头君
// 2.实现一个最简单的模板引擎
// render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
// 	name:'姓名',
// 	age:18
// })

// 结果： 我是姓名，年龄18，性别undefined。
var render = function(tpl,data){
	return tpl.replace(/\{\{(.+?)\}\}/g,function(m,m1){
		return data[m1]
	})
}

// 3.将一个任意长的数字变成逗号分割的格式
// 	// 1234.56 => "1,234.56" , 123456789 => "123,456,789"
// parseToMoney(1234.56) // return "1,234.56"
function parseToMoney(money){
    // 小数点不支持
    return (''+money).replace(/(\d+?)(?=(\d{3})+$)/g, '$1,')

}

function toMoney(num){
    num = num.toFixed(2);
    num = parseFloat(num)
    num = num.toLocaleString();
    return num;//返回的是字符串23,245.12保留2位小数
}

function parseToMoney00(money){
    var moneys = (money+'').split('.');
    var zhen = (moneys[0]+"x").split('').reverse();
    for(var i=1;i<zhen.length;i++){
        if(i%4 === 0){
            zhen.splice(i,0,',')
        }
    }
    zhen = zhen.reverse().join('').slice(0,-1);
    if(moneys[1]){
        zhen = zhen + '.'+moneys[1]
    }
    return zhen;
}


// var string = "我的账户余额：2,235,467.20";
// console.log(?);
// 请用js计算出我到底有多少钱（输出Number类型数字，代码尽量简洁，考虑通用情况）
function parseToNumber(string){
    return new Number(string.replace(/[^0-9.]/g,''));
}

// 有一个全局变量 a，有一个全局函数 b，实现一个方法bindData，执行后，a的任何赋值都会触发b的执行。
// var a = 1;
// function b(){
// 	console.log('a的值发生改变');
// }
// bindData();
// a = 2; // 此时输出 a的值发生改变

function bindData(target,event){
    for(var key in target){
        if(target.hasOwnProperty(key)){
            (function(){   
                var v= target[key] 
                Object.defineProperty(target,key,{
                    get:function(){
                        return v
                    },  
                    set:function(newValue){
                        v = newValue;
                        event.call(this)
                    }
                })                        
            })()
        }
    }
}



//6, 实现一个 js 的 class ，名字叫做：AnimateToNum，功能是从某个数字递增或者递减到另外一个数字，并且不管数字如何变化，都可以在指定的时间内完成。
// var AnimateToNum = require("animate-num");
// var numAnim = new AnimateToNum({
//   animTime:2000, //每次数字变动持续的时间（ms），
//   initNum:500, //初始化的数字
//   onChange:function(num){
//     console.log(num);
//   }
// });
// numAnim.toNum(100); // 从500变化到100，用2000ms的时间，在onChange回调中会一直从500倒数到100
function AnimateToNum(animTime,initNum){
    this.animTime = animTime;
    this.initNum = initNum;
}
AnimateToNum.prototype.log = function(){
    console.log(this.animTime,this.initNum)
}
AnimateToNum.prototype.onChange = function(num){
    console.log(num)
}
AnimateToNum.prototype.toNum = function(toNum){
    var isPlus = toNum > this.initNum ? true : false; 
    var per_time = Math.abs(this.animTime/(toNum - this.initNum));
    var goChange = setInterval(function(){
        if(isPlus){
            console.log(this.initNum++);
        }else{
            console.log(this.initNum--);
        }
    },per_time);
    if(toNum === this.initNum){
        clearInterval(goChange);
    }
}


var numAnim = new AnimateToNum({
  animTime:2000, //每次数字变动持续的时间（ms），
  initNum:500, //初始化的数字
//   onChange:function(num){
//     console.log(num);
//   }
});
numAnim.toNum(200);

//7， 请封装一个 CustomFetch 方法，利用原生的 fetch api，但是实现以下几个需求：
// 所有请求默认带上一个 token，值是 xxx
// 请求返回的时候，内部解析内容，并且判断 success 字段是否是 true，如果不是，在 catch 中可以拿到一个Error，message 和 code 是接口返回的对应的内容

// CustomFetch("http://api.com/api").then((data)=>{
//     console.log(data); // 如果后台返回 true
// }).catch((e)=>{
//     console.log(e.message); // 输出 “查询错误”
// });
 
// // 接口的返回模式
// {
//     success: false,
//     code: 'QUERY_ERROR',
//     data: {},
//     message: '查询错误'
// }
function customFetch(url){
    var myresponse = {};
    var myHeader = new Headers();
    myHeader.append('token',"test-token");
    var request = new Request(url,{
        headers: myHeader,
        'content-type':'application/json',
        
    })
    return fetch(request).then(function(response){
        if(response.ok){
            myresponse.success = true;
            myresponse.code = "success";
            myresponse.data = response.json();
            myresponse.message = "查询成功"
            return myresponse;
        }else{
            myresponse.success = false;
            myresponse.code = "QUERY_ERROR";
            myresponse.data = {};
            myresponse.message = "查询错误"
            return myresponse;
        }
    }).catch(function(err){
        myresponse.success = false;
            myresponse.code = "QUERY_ERROR";
            myresponse.data = {};
            myresponse.message = err.message;
            return myresponse;
    })
}
customFetch('http://new.mobapi.intocity.cn/api/sw/index').then(function(data){
    if(data.success){
        console.log('sucess',data)
    }
    console.log('sucess00')
}).catch(function(err){
    console.log('err',err);
})

//8， 将数字转换成中文大写的表示，处理到万级别，例如 12345 -> 一万二千三百四十五
// function toLowerNum(){
 
// }
// console.log(toLowerNum(12345)); // 输出 一万二千三百四十五
// console.log(toLowerNum(10001)); // 输出 一万零一
// console.log(toLowerNum(10011)); // 输出 一万零十一
// console.log(toLowerNum(10000)); // 输出 一万
function toUpperNum(){
    var num = ['零','一','二','三','四','五','六','七','八','九'];
    var unit = ['万','千','百','十'];


}
function toLowerNum(num){
	var number = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // 定义中文数字
	var unit = ['', '十', '百', '千', '万'] // 定义中文基
	var resultStr = []
	var len = 0 // 数字长
	var lastNumNotZero = false
	while(num){
		let n = num % 10
		let u = len >= unit.length ? len % 5 + 1 : len % 5

		// console.log(n, u, len)
		// 添加基
		// if(n || (len >= unit.length && lastNumNotZero))
		if(
			n // 当前位存在
			|| // 或者
			( u == unit.length - 1 && // u 和 长度均为 最后一位unit
				len == unit.length - 1
			)
		)
			resultStr.unshift(unit[u])

		// 处理数
		if(
			n || lastNumNotZero // 当前位和前一位不都为零则处理
			&& 
			u !== unit.length - 1 // 且当前位不为最后一位基
		) 
			resultStr.unshift(number[n])
		lastNumNotZero = !!n
		len++
		num = Math.floor(num / 10)
	}
	return resultStr.join('')
}



// 9. 算法题，实现一个函数，可以判断 a 字符串是否被包含在 b 字符串中
// KMP 算法
function isInString(){
    var j = 0;
    var m=0;
    var result = false;
    for(var i=0;i<a.length;i++){
        while(j<b.length&&a[i] != b[j]){
            j++;
           m<a.length? 0: m;
        }
       
        if(a[i]== b[j]){
            console.log(a[i],b[j]);
            m++;
        }else{
        m=0
        }
        j++;
    }
    if(m==a.length) result = true
    return result;
}
var b='abcabcdef'
var a='cdf'
isInString(a,b)

//10. 判断一个点是否在多边形内
// 答案：从当前点画一条水平射线，判断射线与多边形各条边相交多少次，偶数次就是在多边形内




/*
找出元素 item 在给定数组 arr 中的位置
如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
*/
function indexOf(arr, item) {
    for(var i=0,len=arr.length;i<len;i++){
        if(item == arr[i]){
            return i;
        }
    }
    return -1;
}


/*
计算给定数组 arr 中所有元素的总和
数组中的元素均为 Number 类型
*/
function sum(arr) {
    return arr.reduce(function(pre,cur){
        return pre+cur;
    })
}

// 如何知道一串字符串中每个字母出现的次数
var arrString = 'abcdaabc';
arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})



/*
数组找出重复的值
输入：[1,2,3,3,36,3,4,3,5,4,1,2,5,6,6]
输出： [1, 2, 3, 4, 5, 6]
*/ 
function duplicates(arr){
  var arrNew;
  var arrCover = [];//用于存档重复的数值
  for(var i=0;i<arr.length;i++){
   arrNew = arr.slice(i+1,arr.length);
   if(arrNew.indexOf(arr[i])!=-1&&arrCover.indexOf(arr[i])==-1){//存在重复  且尚未加入到arrCover中
    
    arrCover.push(arr[i]);
   }
  }
  return arrCover;
 }

function duplicates1(arr) {
	var result = [],len=arr.length;
    var temp = {};
    
    for(var i=0;i<len;i++){
       temp[arr[i]] = i;
    }
    for(var j=0;j<len;j++){
        if(temp[arr[j]] !== j){
            var contain = false;
            for(var w=0;w<result.length;w++){
                if(arr[j] == result[w]){
                    contain = true;
                    break;
                }
            }
            if(!contain){
                result.push(arr[j]);
            }       
        }
    }
    
    return result;
}

function duplicates2(arr) {
 var obj = {};
    var repeatList = [];
    //遍历数组，将数组的值作为obj的索引，出现次数为值
    arr.forEach(function(item){
        if(obj[item]){
            obj[item] +=1;
        }else{
            obj[item] = 1;
        }
    });
    //获取对象自身属性
    var propertyNames = Object.getOwnPropertyNames(obj);
    //遍历对象，将重复出现的元素取出
    propertyNames.forEach(function(item){
        if(obj[item] > 1){
            repeatList.push(parseInt(item));
        }
    });
    return repeatList;  
}

/*
字符串字符统计
统计字符串中每个字符的出现频率，返回一个 Object，key 为统计字符，value 为出现频率
1. 不限制 key 的顺序
2. 输入的字符串参数不会为空
3. 忽略空白字符
*/
function count(str) {
  var strArr = str.split("");
    var obj = {};
    for(var i=0;i<strArr.length;i++){
        if(strArr[i] == " "){
            continue;
        }
        if(!obj[strArr[i]]){
            obj[strArr[i]] = 1;
        }else{
            obj[strArr[i]]++;
        }
    }
    return obj;
}

/*
斐波那契数列
用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等
*/
function fibonacci(n) {
    if(n==1 || n==2){
        return 1;
    }else{
        return fibonacci(n-2)+fibonacci(n-1);
    }
}

/*
css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
2. -webkit-border-image 转换后的结果为 webkitBorderImage
*/
function cssStyle2DomStyle(sName) {
  var sArr = sName.split("-");
    var result = "";
    for(var i=0;i<sArr.length;i++){
        if(i == 0 && sArr[i] || (i == 1 && !sArr[0])){
            result = sArr[i];
        }else{
             result += sArr[i].slice(0,1).toUpperCase() + sArr[i].slice(1);
        }
    }
    return result;
}

/*
颜色字符串转换
将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
1. rgb 中每个 , 后面的空格数量不固定
2. 十六进制表达式使用六位小写字母
3. 如果输入不符合 rgb 格式，返回原始输入
*/
function rgb2hex(sRGB) {
    var regexp=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var ret=sRGB.match(regexp);
    if(!ret){
        return sRGB;
    }else{
        var str='#';
        for(var i=1;i<=3;i++){
            var m=parseInt(ret[i]);
            if(m<=255&&m>=0){
                str+=(m<16?'0'+m.toString(16):m.toString(16));
            }else{
                return sRGB;
            }
        }
        return str;
    }
}


/*
查找两个节点的最近的一个共同父节点，可以包括节点自身
*/
function commonParentNode(oNode1, oNode2) {
    if(oNode1.parentNode == oNode2){
        return oNode2;
    }else if(oNode2.parentNode == oNode1){
        return oNode1;
    }else{

     for(;oNode1;oNode1=oNode1.parentNode){
            if(oNode1.contains(oNode2)){
                return oNode1;
            }
        }
    }
}


/*
定时器
*/
function countTimer(start, end) {
    var obj = {};
    var timer;
    obj.cancel = function(){
    	clearInterval(timer);
    }
    console.log(start);
    timer = setInterval(function(){
        console.log(++start);
        if(start >= end){
            clearInterval(timer);
        }
    },100);
    return obj;
}

// underscore.js
_.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
  };

  // _.isEmpty = function(obj) {
  //   if (obj == null) return true;
  //   if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
  //   return _.keys(obj).length === 0;
  // };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };
