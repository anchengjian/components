;(function(doc,win,undefined){
  
  // loading 动画
  // 3个接口
  // loading.start();
  // loading.complete();
  // loading.progress('50%');


  function Loading(opt){
    this.opt={
      'barId': 'loadingBar',
      'barClass': 'loading-bar',
      'spinnerId': 'loadingSpinner',
      'spinnerClass': 'loading-spinner'
    };

    // 传参
    if(opt){
      for(var i in opt){
        this.opt[i]=opt[i];
      }
    }

    // 接收参数并创建
    this.loadingBar=doc.querySelector(this.opt.barId);
    this.loadingSpinner=doc.querySelector(this.opt.spinnerId);
    if(!this.loadingBar){
      var barNode=doc.createElement('div');
      barNode.id=this.opt.barId;
      barNode.className=this.opt.barClass;
      doc.body.appendChild(barNode);
      this.loadingBar=barNode;
    }
    if(!this.loadingSpinner){
      var spinnerNode=doc.createElement('div');
      spinnerNode.id=this.opt.spinnerId;
      spinnerNode.className=this.opt.spinnerClass;
      doc.body.appendChild(spinnerNode);
      this.loadingSpinner=spinnerNode;
    }

    this.start();
  }

  Loading.prototype.progress=function(rate){
    this.loadingBar.style.width=rate;
  };

  Loading.prototype.start=function(){
    // 初始化
    var rate=0,
        self=this;
    // 渐变显示
    setTimeout(function(){
      self.loadingBar.classList.add('in');
      self.loadingSpinner.classList.add('in');
    },250);
    self.timer=setInterval(function(){
      self.progress(rate+'%');
      rate+=1;
      if(rate>99) clearInterval(self.timer);
    },250);
  };

  Loading.prototype.complete=function(){
    var self=this;
    // 一跑到底
    clearInterval(self.timer);
    self.progress('100%');
    // 渐变隐藏
    setTimeout(function(){
      self.loadingBar.classList.remove('in');
      self.loadingSpinner.classList.remove('in');
      self.loadingBar.classList.add('hide');
      self.loadingSpinner.classList.add('hide');
      self.progress('0%');
    },250);
  };

  win.loading=new Loading();

})(document,window);