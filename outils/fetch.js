import {baseUrl} from './env'

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	
	// 把data 转为字符串拼接
	if (type == 'GET') {
		let dataStr = '';
		Object.keys(data).forEach( key =>{
			dataStr += key + "=" + data[key] + "&";
		});
		if (dataStr !== '') {
			dataStr = dataStr.substr(0,dataStr.lastIndexOf("&"));
			url = url + "?" + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials:'include',
			method:type,
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			cache: 'force-cache'
		}
		if (type == 'POST') {
			// 创建一些不能被修改的对象的属性
			Object.defineProperty(requestConfig,'body',{
				value: JSON.stringify(data)
			})
		}

		try{
			var response = await fetch(url,requestConfig);
			var responseJson = await response.json();
		}catch(error){
			throw new Error(error);
		}
		return responseJson;
	}else{
		// 不支持fetch的情况，动用原生的XMLHttpRequest
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj =  new XMLHttpRequest();
		}else{
			requestObj = new ActiveXObject();
		}
		let sendData = '';
		if (type == "POST") {
			sendData = JSON.stringify(data);
		}
		requestObj.open(type,url,true);
		requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		requestObj.send(sendData);

		requestObj.onreadystatechange = () => {
			if (requestObj.readyState == 4) {
				if (requestObj.status >= 200 && requestObj.status < 304) {
					let obj = requestObj.response;
					if (typeof obj !== 'object') {
						obj = JSON.parse(obj);
					}
					return obj;
				}else{
					throw new Error(requestObj);
				}
			}
		}
	}


}
