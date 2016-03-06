var numRoll=(function(doc,win){

  // 生成数字dom
  function roll(id,n){
    if(!id) return;

    this.nums=doc.querySelector(id);
    this.num=n || this.nums.getAttribute("data-num").toString();

    if(!!n) this.nums.setAttribute("data-num",n);

    this.nums.textContent="";

    for(var j=0;j<this.num.length;j++){
      var node=doc.createElement("div"),
          nowN=this.num.substr(j,1);
      node.innerHTML='<div class="box" data-num="'+nowN+'"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>';
      node.className="num";
      this.nums.appendChild(node);
    }

    // start
    setTimeout(this.start.bind(this),1000);
  }

  roll.prototype.start=function(){
    var allNum=this.nums.querySelectorAll(".box");
    Array.prototype.map.call(allNum,function(ele,i){
      this.run(ele,ele.getAttribute('data-num'));
    }.bind(this));
  };

  // 数字滚动
  roll.prototype.run=function(obj,n){
    if(!obj) return;
    n=-1*parseInt(n);
    obj.style.top=n*2+"rem";
  };

  return roll;

})(document, window);