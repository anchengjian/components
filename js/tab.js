// 封装tab切换
function navTab(id){
  var obj=document.querySelector(id),
      navTabs=obj.querySelectorAll(".nav-tabs")[0],
      tabLi=navTabs.querySelectorAll("li"),
      tabA=navTabs.querySelectorAll("a"),
      tabContent=obj.querySelectorAll(".tab-content")[0],
      tabPanel=tabContent.querySelectorAll(".tab-pane"),
      tabALen=tabA.length,
      activeIndex=0;

  // 点击事件的添加
  for(var i=0;i<tabALen;i++){
    tabA[i].addEventListener('click', changeTab);
  }
  function changeTab(){
    
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    // 清空
    delStatusCls(activeIndex);
    // 改变全局顺序
    activeIndex=this.getAttribute("data-slide-to");
    // 添加
    addStatusCls(activeIndex);
  }

  // 移动端手势操作
  obj.addEventListener('touchstart', tabTouchStart);
  obj.addEventListener('touchend', tabTouchEnd);
  var hasTouch='ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion),  //移动端兼容
      setX=0;
  function tabTouchStart(){
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var point=hasTouch ? event.touches[0] : event;
    setX=point.pageX;
  }
  function tabTouchEnd(){
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var point=hasTouch ? event.changedTouches[0] : event,
        offsetX=point.pageX-setX,
        oldV=activeIndex;
    if(offsetX>=50){
      --activeIndex;
      if(activeIndex<0) activeIndex=0;
      touchChangeTab(oldV,activeIndex);
      return;
    }
    if(offsetX<=-50){
      ++activeIndex;
      if(activeIndex>=tabALen) activeIndex=tabALen-1;
      touchChangeTab(oldV,activeIndex);
      return;
    }
  }
  function touchChangeTab(oldV,newV){
    // 清空
    delStatusCls(oldV);
    // 添加
    addStatusCls(newV);
  }

  // 全局的class状态操作
  function delStatusCls(index){
    tabLi[index].classList.remove('active');
    tabPanel[index].classList.remove('active');
  }
  function addStatusCls(index){
    tabLi[activeIndex].classList.add('active');
    tabPanel[activeIndex].classList.add('active');
  }
}

// 设置navtab初始化
var tabContent=new navTab('#tabContent');