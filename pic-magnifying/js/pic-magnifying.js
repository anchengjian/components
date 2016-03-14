// anchengjian.com
// 图片放大镜特效
// 2016-01-09

// new picMagnifying({
//       target:allPics[i],   // 可以是目标图片的dom对象，也可以目标图片的id
//       isShowAll:true    // 是否需要全部显示图片，默认为局部显示。
//     });

// 或者直接为dom添加class : .preview


// anchengjian.com
// 图片放大镜特效
// 2016-01-09
var picMagnifying=(function (doc,win){

  function magnifying(opt){
    // 先创建dom
    if(typeof opt.target == 'object'){
      this.obj=opt.target;
    }else{
      this.obj=doc.querySelector(opt.target);
    }
    this.src=this.obj.getAttribute('data-original') || this.obj.src; //懒加载的图片
    this.title=this.obj.title || 'pic';
    this.box=this.obj.parentNode;

    // 创建dom
    var innerDom=['<span class="magnifying-pointer"></span>',
                    '<div class="magnifying-show"></div>',
                    '<div class="magnifying-box">',
                      '<img src="'+this.src+'" class="magnifying-preview" />',
                   ' </div>'].join(''),
        magnifyingNode=doc.createElement('div');
    magnifyingNode.innerHTML=innerDom;
    magnifyingNode.className=opt.isShowAll ? "magnifying show-all" : "magnifying";
    this.box.appendChild(magnifyingNode);

    // 选择元素
    this.show=this.box.querySelectorAll('.magnifying-show')[0],
    this.pointer=this.box.querySelectorAll('.magnifying-pointer')[0],
    this.magnifyingBox=this.box.querySelectorAll('.magnifying-box')[0],
    this.preview=this.box.querySelectorAll('.magnifying-preview')[0];

    // 监听事件
    this.show.addEventListener('mouseover',this.mouseoverStart.bind(this));
    this.show.addEventListener('mouseout',this.mouseoutStop.bind(this));
    this.show.addEventListener('mousemove',this.mousemoveRun.bind(this));
  }

  magnifying.prototype.mouseoverStart=function (event){
    this.pointer.style.display='block';
    this.magnifyingBox.style.display='block';

    // 极限右判断
    var nowPos=this.show.getBoundingClientRect();
    if(window.innerWidth - nowPos.right<400){
      this.magnifyingBox.style.left=-(nowPos.width+this.show.clientWidth*2)+'px';
    }
    // 极限底部判断
    if(window.innerHeight < (this.preview.clientHeight+nowPos.top)){
      this.magnifyingBox.style.top=-(this.preview.clientHeight+nowPos.top - window.innerHeight+20)+'px';
    }
  };
  
  magnifying.prototype.mouseoutStop=function (event){
    this.pointer.style.display='none';
    this.magnifyingBox.style.display='none';
  };
  
  magnifying.prototype.mousemoveRun=function (event){
    var x = event.clientX - this.box.offsetLeft - this.pointer.offsetWidth / 2,
        y = event.clientY - this.box.offsetTop - this.pointer.offsetHeight / 2;

    if(x<0){
      x=0;
    }else if(x>this.show.offsetWidth - this.pointer.offsetWidth){
      x=this.show.offsetWidth - this.pointer.offsetWidth;
    }

    if(y<0){
      y=0;
    }else if(y>this.show.offsetHeight - this.pointer.offsetHeight){
      y=this.show.offsetHeight - this.pointer.offsetHeight
    }

    this.pointer.style.left = x + 'px';
    this.pointer.style.top = y + 'px';
    var percentX=x / (this.show.offsetWidth - this.pointer.offsetWidth),
        percentY=y / (this.show.offsetHeight - this.pointer.offsetHeight);
    this.preview.style.left=-percentX * (this.preview.offsetWidth - this.magnifyingBox.offsetWidth) + 'px';
    this.preview.style.top=-percentY * (this.preview.offsetHeight - this.magnifyingBox.offsetHeight) + 'px';
  };

  return magnifying;

})(document,window);
