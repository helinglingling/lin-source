// whatwg-fetch 用来兼容旧版本
fetch('http://new.mobapi.intocity.cn/api/sw/index')
    .then(function(response){
        // 最佳实践，response.status  response.statusText   response.ok
        if(response.headers.get('content-type') === 'application/json'){
            return response.json();
        }else{
            console.log('没有拿搭拿到son数据')
        }
        
    })
    .then(function(myData){
        console.log(myData)
    })


function postData(url,data){
    return fetch(url,{
        body: JSON.stringify(data),  // JSON 数据
        cache: 'no-cahe',
        credentials: 'include',  // 发送带凭证请求，'same-origin',(同源时发送凭证)'omit'（不包含凭证）,'include'
        headers: {
            'user-agent': '',
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'   // 是否跨域  ;cors 允许跨域  no-cors  same-origin(同源，不可以跨域)    navigate(html导航)
    })
    .then(response => {
        if(response.ok){   // 检测是否成功
           return response.json()
        }
    
    })
}

postData('http://new.mobapi.intocity.cn/api/sw/article-list-by-type',{type_id:122})
    .then(data => console.log(data))
    .catch(err => console.log(err))
// 上传文件
var formData = new FormData();
var fieldFile = document.querySelector('input[type="file"]')
formData.append("username",'lili');
formData.append('avator',fieldFile.files[0])
fetch('http://example',{
    method:'POST',
    body: formData
})
.then(response => response.json())

// 自定义对象，request和fetch接受一样的参数
var myInit = {
    cache: 'default',
    method: 'POST',
    mode: 'cors',
    headers: myHeader
}
var myRequest = new Request('flower.jpg',myInit);
fetch(myRequest).then(function(response){
    return response.blob()
}).then(function(myBlob){
    var objUrl = URL.createObjectURL(myBlob);
    myImg.url = objUrl;
})
// Header
var myHeader = new Headers({
    'content-type': 'text/plain'
});
myHeader.append('content-length',content.length.toString())
myHeader.append("X-Custom-Header", "ProcessThisImmediately");
myHeader.set("X-Custom-Header", "AnotherValue");
console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
console.log(myHeader.has('content-length'))   // true
console.log(myHeader.get('content-type'))   // 'text/plain'
myHeader.delete('X-Custom-Header')

// Guard
// body 可以是很多种类型，body的方法被 request response 实现
var form = new FormData(document.getElementById("myForm"))
fetch(url,{
    method:"POST",
    body: form
})