// 封装tab切换
var navTab=(function (){

  function tab(opt){
    if( !opt.hasOwnProperty('id') || opt.id.length<1 ) return;
    this.box=document.querySelector(opt.id);
    this.navTabs=this.box.querySelectorAll(".nav-tabs")[0];
    this.tabLi=this.navTabs.querySelectorAll("li");
    this.tabA=this.navTabs.querySelectorAll("a");
    this.tabContent=this.box.querySelectorAll(".tab-content")[0];
    this.tabPanel=this.tabContent.querySelectorAll(".tab-pane");
    this.tabALen=this.tabA.length;
    this.activeIndex=0;

    // 点击事件的添加
    Array.prototype.map.call(this.tabA,function(ele,i){
      ele.addEventListener('click', this.changeTab.bind(this));
    }.bind(this));

    // 移动端手势操作
    this.box.addEventListener('touchstart', this.tabTouchStart.bind(this));
    this.box.addEventListener('touchend', this.tabTouchEnd.bind(this));
    this.hasTouch='ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion); //移动端兼容
    this.setX=0;
  }

  tab.prototype.changeTab=function (event){
    var nowObj=event.target;

    event.preventDefault();
    // 清空
    this.delStatusCls(this.activeIndex);
    // 改变全局顺序
    this.activeIndex=nowObj.getAttribute("data-slide-to");
    // 添加
    this.addStatusCls(this.activeIndex);
  }

  tab.prototype.tabTouchStart=function (event){
    event.preventDefault();
    var point=this.hasTouch ? event.touches[0] : event;
    this.setX=point.pageX;
  };
  tab.prototype.tabTouchEnd=function (event){
    event.preventDefault();

    var point=this.hasTouch ? event.changedTouches[0] : event,
        offsetX=point.pageX-this.setX,
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
  };
  tab.prototype.touchChangeTab=function (oldV,newV){
    // 清空
    this.delStatusCls(oldV);
    // 添加
    this.addStatusCls(newV);
  };

  // 全局的class状态操作
  tab.prototype.delStatusCls=function (index){
    this.tabLi[index].classList.remove('active');
    this.tabPanel[index].classList.remove('active');
  };
  tab.prototype.addStatusCls=function (index){
    this.tabLi[index].classList.add('active');
    this.tabPanel[index].classList.add('active');
  };

  return tab;

})();