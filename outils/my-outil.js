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
css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
2. -webkit-border-image 转换后的结果为 webkitBorderImage
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
