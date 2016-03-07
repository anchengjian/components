// ajax-loading
// 扩展jQuery的ajax方法。
// 给每一个ajax请求中的按钮增加转圈圈的动画交互(css3,IE9及其以下可能会引起不适)，同时disabled掉，避免重复请求。

// 使用方法是在原ajax的opt中新加一个dom属性

// 举个栗子：
// $('.submit-btn').on('click',function(event){
//   // .....check form and do something .......
//   $.ajax({
//     url : '/api/xxxxxxxx',
//     type : 'get',
//     dom : $(this);  // 新增加的参数。需要把当前需要loading动画的按钮元素传过去
//     data : {
//       name : 'admin'
//     },
//     success:function(data){
//       console.log(data);
//     },
//     error:function(data){
//       console.log(data);
//     }
//   });
// });


$(document).ready(function (){
  (function($){
    //备份jquery的ajax方法
    var _ajax=$.ajax,
        style='.loading{position:absolute;display:none;left:50%;margin-left:-50px;top:17px;height:15px;width:15px;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid #666;border-bottom-color:transparent;vertical-align:middle;-webkit-animation:rotate .75s linear infinite;-moz-animation:rotate .75s linear infinite;-o-animation:rotate .75s linear infinite;animation:rotate .75s linear infinite}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-o-keyframes rotate{0%{-webkit-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}';
    // 创建css
    $('head').append('<style>'+style+'</style>');
     
    //重写jquery的ajax方法
    $.ajax=function(opt){
      //备份opt中error和success方法
      var fn = {
            error:function(XMLHttpRequest, textStatus, errorThrown){},
            success:function(data, textStatus){},
            beforeSend:function(XHR){},
            complete:function(XHR, TS){}
          };
      if(opt.error) fn.error=opt.error;
      if(opt.success) fn.success=opt.success;
      if(opt.beforeSend) fn.beforeSend=opt.beforeSend;
      if(opt.complete) fn.complete=opt.complete;
       
      //扩展增强处理
      var _opt = $.extend(opt,{
          error:function(XMLHttpRequest, textStatus, errorThrown){
            //错误方法增强处理
            fn.error(XMLHttpRequest, textStatus, errorThrown);
          },
          success:function(data, textStatus){
            //成功回调方法增强处理
            fn.success(data, textStatus);
          },
          beforeSend:function(XHR){
            //提交前回调方法
            if(opt.hasOwnProperty.dom && opt.dom.length>0) opt.dom.attr('disabled','true').addClass('disabled').addClass('loading');
            fn.beforeSend(XHR);
          },
          complete:function(XHR, TS){
            //请求完成后回调函数 (请求成功或失败之后均调用)。
            if(opt.hasOwnProperty.dom && opt.dom.length>0) opt.dom.removeAttr('disabled').removeClass('disabled').removeClass('loading');
            fn.complete(XHR, TS);
          }
      });
      _ajax(_opt);
    };
  })(jQuery);
});