// canvas 转换成图片下载
        function base64Img2Blob(code){
                var parts = code.split(';base64,');
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                  uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], {type: contentType}); 
            }
            function downloadFile(fileName, content){
               
                var aLink = document.createElement('a');
                var blob = base64Img2Blob(content); //new Blob([content]);
              
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
                aLink.download = fileName;
                aLink.href = URL.createObjectURL(blob);
         
                aLink.dispatchEvent(evt);
            }           
downloadFile('ship.png', canvas.toDataURL("image/png"));