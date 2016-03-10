var voicePlayer=(function(doc,win){

  // Element 操作集合
  function Element(tagName,props,children){
    this.tagName=tagName;
    this.props=props;
    this.children=children;
  }
  Element.prototype.render=function (){
    var el=document.createElement(this.tagName),    // 根据tagName构建
        props=this.props;

    for(var propName in props){    // 设置节点的DOM属性
      var propValue=props[propName];
      el.setAttribute(propName,propValue);
    }

    var children=this.children || [];

    children.forEach(function (child){
      // 如果子节点也是虚拟DOM，递归构建DOM节点
      // 如果字符串，只构建文本节点
      var childEl=(child instanceof Element) ? child.render() : document.createTextNode(child ? child : '');
      el.appendChild(childEl);
    });

    return el;
  };
  // 便捷的el
  function el(tagName,props,children){
    return new Element(tagName,props,children);
  }

  function player(opt){
    if(!!opt && !opt.src) return;
    this.opt=opt;

    this.music=null;

    // 开始音乐
    this.isPlay=false;

    // 接收参数并创建dom
    this.targetBox=doc.querySelector(this.opt.box);

    var playerNode= el('section',{'class':'voice-player'},[
                      el('div',{'class':'audio-play'},[
                        el('i',{'class':'horn'})
                      ]),
                      el('p',{'class':'audio-body'},[
                        el('span',{'class':'title'}),
                        el('small',{'class':'sub-title'})
                      ]),
                      el('div',{'class':'audio_length'}),
                      el('div',{'class':'audio-play-progress'}),
                      el('audio',{'src':this.opt.src,'class':'hidden',preload:'none'})
                    ]);

    this.box=playerNode.render();
    // 创建dom
    this.targetBox.parentNode.insertBefore(this.box,this.targetBox);

    // 先加载音乐后填入参数
    this.loadMusic.call(this);
  
    this.music.addEventListener('canplay',function(event){
      this.opt.len=Math.floor(this.music.duration);
      this.box.querySelectorAll('.audio_length')[0].innerText=this.opt.len+' s';
      this.cur=100/this.opt.len;     //进度条速度
    }.bind(this));

    this.rate=0;    //初始化进度

    this.box.addEventListener('click',function(event){
      if(this.isPlay){
        this.paused();
      }else{
        this.start();
      }
      this.isPlay=!this.isPlay;
    }.bind(this));
  }

  player.prototype.loadMusic=function (){
    this.music=this.box.querySelectorAll('audio')[0];
    this.music.src=this.opt.src;

    // 进度条
    this.loadingBar=this.box.querySelectorAll('.audio-play-progress')[0];

    // 重置
    this.music.pause();
    this.music.currentTime=0;
    this.rate=0;

    // 填入参数
    if('title' in this.opt) this.box.querySelectorAll('.title')[0].innerText=this.opt.title;
    if('subTitle' in this.opt) this.box.querySelectorAll('.sub-title')[0].innerText=this.opt.subTitle;
    this.horn=this.box.querySelectorAll('.horn')[0];
    this.progress('0');
    this.horn.classList.remove('animation');
  };

  player.prototype.progress=function(rate){
    this.loadingBar.style.width=rate;
  };

  player.prototype.start=function(){

    this.music.play();

    this.music.addEventListener('canplay',function playStart(event){
      this.rate=this.cur;
      this.progress(this.rate+'%');
      this.music.removeEventListener('canplay',playStart);
    }.bind(this));

    if(this.rate>=100){
      this.rate=0;
      this.progress('0');
    }

    // 渐变显示
    this.loadingBar.classList.add('in');
    this.horn.classList.add('animation');

    this.timer=setInterval(function(){
      this.rate+=this.cur;
      this.progress(this.rate+'%');
      if(this.rate>=100) this.complete();
    }.bind(this),1000);
  };

  player.prototype.paused=function(){
    clearInterval(this.timer);
    this.music.pause();
    this.horn.classList.remove('animation');
  };

  player.prototype.complete=function(){
    // 一跑到底
    this.progress('100%');
    this.stop();
  };

  // 全部停止
  player.prototype.stop=function(){
    // 一跑到底
    clearInterval(this.timer);
    this.isPlay=false;
    this.horn.classList.remove('animation');
  };

  player.prototype.switch=function(opt){
    if(!!opt && !opt.src) return;
    this.opt=opt;
    this.stop();
    this.loadMusic();
  };

  return player;
})(document,window);