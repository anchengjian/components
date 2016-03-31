// cookie 操作集合
// cookies('testcookie')              // 获取cookie
// cookies('testcookie',1024,365)     // 设置cookie，第二个参数为value，第三个参数是过期时间（单位：天，空参数则默认30天）
// cookies('testcookie',1,-1)         // 删除cookie（关键在于第三个参数为-1）
// cookies('testcookie',1,0)         // 设置了一个 Session，关闭浏览器失效（关键在于第三个参数为0）
var cookies=(function (){
  return function (name,value,days){
    if(!name) return;
    if(!!value || value === 0){        // 如果有值执行设置操作
      days = toString.call(days) === '[object Number]' ? days : 30;
      var exdate=new Date();
      exdate.setTime(exdate.getTime() + days * 24 * 60 * 60 * 1000);
      
      if(days === 0) return document.cookie = name + '=' + escape(value);
      return document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toGMTString();
    }else{        // 否则执行获取操作
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
          arr = document.cookie.match(reg);
      return arr ? unescape(arr[2]) : arr;
    }
  }
})();