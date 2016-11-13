/**
 * Created by chen on 2016/6/22.
 */
window.onload = function(){
    var oDiv = document.getElementById('div');
    var p=document.getElementById('p');
    var l=10;
    var t=15;
    var listX=0;
    var listY=0;
    var time = null;
    var w = document.documentElement.clientWidth - oDiv.offsetWidth;
    var h = document.documentElement.clientHeight - oDiv.offsetHeight;
    oDiv.onmousedown = function(ev){
        clearInterval(time);
        p.style.display='none';
        var oEv = ev || event;
        var disX = oEv.clientX - this.offsetLeft;
        var disY = oEv.clientY - this.offsetTop;
        document.onmousemove = function(ev){
            var oEv = ev || event;
            oDiv.style.left = oEv.clientX - disX + 'px';
            oDiv.style.top = oEv.clientY - disY + 'px';
            l=oEv.clientX - listX;
            t=oEv.clientY - listY;
            listX = oEv.clientX;
            listY = oEv.clientY;
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            fnMove();
        };
        return false;
    };
    fnMove();
    function fnMove(){
        time = setInterval(function(){
            t+=3;
            var oleft = oDiv.offsetLeft;
            var otop = oDiv.offsetTop;
            oleft +=l;
            otop +=t;
            if(oleft<=0){
                oleft = 0;
                l*=-.8;
                t*=.8;
            }
            if(oleft>=w){
                oleft = w;
                l*=-.8;
                t*=.8;
            }
            if(otop<=0){
                otop = 0;
                l*=.8;
                t*=-.8;

            }
            if(otop>=h){
                otop = h;
                l*=.8;
                t*=-.8;
                oDiv.style.backgroundImage='/img/qiu.jpg'
            }
            oDiv.style.left = oleft + 'px';
            oDiv.style.top = otop + 'px';
            if(Math.abs(l)<1)l=0;
            if(Math.abs(t)<1)t=0;
            if(Math.round(l) == 0 && Math.round(t) == 0 && otop == h){
                clearInterval(time);
                p.style.display='block';
            }
        },1000/60);
    }
}