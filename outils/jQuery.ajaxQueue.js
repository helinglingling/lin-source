(function($) {
// 声明一个jquery空对象，这个对象用来存放我们的队列
// jQuery on an empty object, we are going to use this as our Queue
var ajaxQueue = $({});

$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();
    // run the actual query
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts );
        jqXHR.done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }

    // 执行 ajax 查询队列
    // queue our ajax request
    ajaxQueue.queue( doRequest );
    // 添加中断ajax方法 abort
    // add the abort method
    promise.abort = function( statusText ) {
        // 判断此ajax是否在运行（想要终结的ajax），如果有正在运行ajax，就将其结束掉ajax
        // proxy abort to the jqXHR if it is active
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        }
        // 将执行完毕的ajax从队列中删除
        // if there wasn't already a jqXHR we need to remove from queue
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );
        // 判断队列中是否存在执行完毕ajax，如有就将其从队列中删除
        if ( index > -1 ) {
            queue.splice( index, 1 );
        }
        // 最后将ajax状态改为失败，rejectWith() 相当于 reject()
        // and then reject the deferred
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    };

    return promise;
};

})(jQuery);
