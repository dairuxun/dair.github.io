/**
 * Created by chen on 2016/6/10.
 */
function $(id){
    return document.getElementById(id);
}
function fnRand(n,m){
    return parseInt(Math.random()* (m-n) + n)
}
function getStyle(obj,name){
    return (obj.columnRuleStyle || getComputedStyle(obj,false))[name]
}
function fnParent(obj){
    var l= 0;
    var t= 0;
    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {left:l,top:t}
}
function fnDrag(obj){
    obj.onmousedown = function(ev){
        var oEv = ev || event;
        var x = oEv.clientX - obj.offsetLeft;
        var y = oEv.clientY - obj.offsetTop;
        document.onmousemove = function(ev){
            var oEv = ev || event;
            obj.style.left = oEv.clientX - x +'px';
            obj.style.top = oEv.clientY - y +'px';
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false;
    }
}
window.onload = function(){
    //轮播分散图片
    var nClw = document.documentElement.clientWidth || document.body.clientWidth;
    var nClh = document.documentElement.clientHeight || document.body.clientHeight;
    var oBody = document.getElementById('box');
    var num3D=true;
    for(var i=0;i<18;i++){
    var oI = document.createElement('i');
    oI.style.left = fnRand(0,(nClw-60))+"px";
    oI.style.top = fnRand(0,(nClh-60))+"px";
    oBody.appendChild(oI);
    };
    var aI = document.getElementsByTagName('i');
    function fnXing(){
        for(var i=0;i<18;i++){
            (function(i){
                move(aI[i],{left:fnRand(0,(nClw-60)),top:fnRand(0,(nClh-60))},{time:15000,end:function(){
                    fnXing();
                }})
            })(i);
        }
    }
    fnXing();
    //个人头像运
    function photo(){
        var oDiv = $('photo');
        var ow = document.documentElement.clientWidth;
        
        var l=0;
        var t=0;
        var send = 0;
        var oleft = oDiv.offsetLeft;
        var time = null;
        time = setInterval(function(){
            send -= (l-(ow/4))/20;
           
            send *=.8;
            l+=send;
            oDiv.style.left = l+'px';
            if(l==(ow/4)){
                clearInterval(time);
                fnAudio();
            }
        },1000/60)
    }
    photo();
    //移动
    function findDir(oDiv,ev){
        var oEvent=ev||event;
        var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
        var scrollL=document.body.scrollLeft || document.documentElement.scrollLeft;

        var y=oDiv.offsetHeight/2+getPos(oDiv).top-(oEvent.clientY+scrollT);
        var x=oDiv.offsetWidth/2+getPos(oDiv).left-(oEvent.clientX+scrollL);

        return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
    }
    function getPos(obj){
        var l=0;
        var t=0;
        while(obj){
            l+=obj.offsetLeft;
            t+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return {left:l,top:t};
    }
    function fnAudio(){
        var apple = false;
        $('photo').onclick = function(){
            var rotate = getStyle($('div'),'transform');
            if(apple){
                $('audio').play();
                $('div').style.transform = rotate;
                $('div').className = 'yinyue';
                $('apply').style.transform='rotate(0deg)';
                setTimeout(function(){
                    $('show').style.display='block';
                },500)
                apple = false;
            }else{
                $('audio').pause();
                $('div').className = '';
                $('show').style.display='none';
                $('apply').style.transform='rotate(-30deg)';
                $('div').style.transform=rotate;
                apple = true;
            };
        }
    }
    function fnDrag(){
        var aLi = $('jn_ul').getElementsByTagName('li');
        for(var i=0;i<aLi.length;i++){
            aLi[i].onmouseover = function(ev){
                var oEvent=ev||event;
                var oSon=this.children[0];
                var oFrom=oEvent.fromElement || oEvent.relatedTarget;
                if(this.contains(oFrom))return false;
                switch(findDir(this,ev)){
                    case 0:
                        oSon.style.left=275+'px';
                        oSon.style.top=0;
                        break;
                    case 1:
                        oSon.style.left=0;
                        oSon.style.top=275+'px';
                        break;
                    case 2:
                        oSon.style.left=-300+'px';
                        oSon.style.top=0;
                        break;
                    case 3:
                        oSon.style.top=-275+'px';
                        oSon.style.left=0;
                        break;
                }
                move(oSon,{left:0,top:0},{time:300});
            };
            aLi[i].onmouseout=function(ev){
                var oEvent=ev||event;
                var oSon=this.children[0];
                var to=oEvent.toElement || oEvent.relatedTarget;
                if(this.contains(to))return false;
                switch(findDir(this,ev)){
                    case 0:
                        move(oSon,{left:275,top:0},{time:300});
                        break;
                    case 1:
                        move(oSon,{left:0,top:300},{time:300});
                        break;
                    case 2:
                        move(oSon,{left:-275,top:0},{time:300});
                        break;
                    case 3:
                        move(oSon,{top:-300,left:0},{time:300});
                        break;
                }
            };
        }
    }
    fnjn();
    fnDrag();
     
    function fnjn(){
        var aLi = $('jn_ul').getElementsByTagName('li');
      
        doMove(aLi[2],{left:800},{end:function(){
            doMove(aLi[1],{left:420},{end:function(){
                doMove(aLi[0],{left:30})
            }})
        }})
    }


    //3D选择试图
    function fn3D(){
        var aLi = $('oul').getElementsByTagName('li');
        var n = 360/aLi.length;
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.transition = '.8s all ease ' + (aLi.length-i)*300 + 'ms';
            (function(i){
                setTimeout(function(){
                    aLi[(aLi.length-1)-i].style.transform = 'rotateY('+(n * ((aLi.length-1)-i))+'deg) translateZ(400px) ';
                },30);
            })(i)
        }
        var listX=-10;
        var listY=0;
        document.onmousedown = function(ev){
            var oEv = ev || event;
            var disX = oEv.clientX-listX;
            var disY = oEv.clientY-listY;
            document.onmousemove = function(ev){
                var oEv = ev || event;
                listX = oEv.clientX - disX;
                listY = oEv.clientY - disY;
                $('zwarp').style.transform ='perspective(800px) rotateX('+(-(listY/20))+'deg) rotateY('+(listX/8)+'deg)';
            };
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false
        };
    }
    window.onscroll=function(){
        var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
        var wHeight=document.documentElement.clientHeight;//window
        var dHeight=document.documentElement.offsetHeight;//整个文档高度
        if(dHeight-(sHeight+wHeight)<200)
        {
            if(num3D){
                fn3D();
                num3D = false;
            }
        }

    };
};






























































