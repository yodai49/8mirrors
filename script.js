var t = 0; //time
var adjustMode=0;//調整モード
var adjustNum=0;//調整中の番号
var testPoints=[{top:0.05,left:0.5},{top:0.75,left:0.2},{top:0.75,left:0.8}]
var width=960;
var guideMode=0;
const INITIAL_TIME=performance.now();
// ページの読み込みを待つ


function keypress(event,mykey){ //キー入力イベント
    if(mykey=="a"){//調整モード切り替え
        adjustMode=1-adjustMode;
    }
    if(adjustMode==1){
        var adjustDif=0.02
        if(event.shiftKey) adjustDif*=0.1;
        if(mykey=="ArrowUp"){
            testPoints[adjustNum].top-=adjustDif;
        }
        if(mykey=="ArrowDown"){
            testPoints[adjustNum].top+=adjustDif;
        }
        if(mykey=="ArrowLeft"){
            testPoints[adjustNum].left-=adjustDif;
        }
        if(mykey=="ArrowRight"){
            testPoints[adjustNum].left+=adjustDif;
        }
        if(mykey=="s"){
            adjustNum=(adjustNum+1) % testPoints.length;
        }
    }
    if(mykey=="g"){
        guideMode=(guideMode+1)%3
        if(guideMode==1){
            document.getElementById("howToUse").style.display="none";
        } else if(guideMode==0){
            document.getElementById("howToUse").style.display="block";
        }
    }
}
function drawGuides(){
    //ガイドの描画
    if(guideMode!=2){
        ctx2d.beginPath();
        ctx2d.strokeStyle="rgba(255,0,0,1)";
        ctx2d.lineWidth=3;
        ctx2d.moveTo(30,0);
        ctx2d.lineTo(0,0);
        ctx2d.lineTo(0,30);
        ctx2d.moveTo(width-30,0);
        ctx2d.lineTo(width,0);
        ctx2d.lineTo(width,30);
        ctx2d.moveTo(width-30,width);
        ctx2d.lineTo(width,width);
        ctx2d.lineTo(width,width-30);
        ctx2d.moveTo(30,width);
        ctx2d.lineTo(0,width);
        ctx2d.lineTo(0,width-30);
        ctx2d.moveTo(width/2,width/2-30);
        ctx2d.lineTo(width/2,width/2+30);
        ctx2d.moveTo(width/2-30,width/2);
        ctx2d.lineTo(width/2+30,width/2);
        ctx2d.stroke();
    }
}
window.addEventListener('load', init); //ロードイベント登録
window.addEventListener('DOMContentLoaded', function(){ ///キー入力イベント登録
    window.addEventListener("keydown", function(e){
      keypress(e,e.key);
    });
});

function init() {
    //ローディング処理////////////////////////////////////////

    //2Dの処理
    ctx2d=document.getElementById("myCanvas").getContext("2d");

    tick();

    function tick() {
        t=performance.now()-INITIAL_TIME;
        //2次元のリセット処理
        ctx2d.clearRect(0,0,width,width);
        drawGuides();
        for (i = 0;i < testPoints.length;i++){
            ctx2d.beginPath();
            ctx2d.strokeStyle="rgba(0,0,0,0)";
            ctx2d.fillStyle="rgba(255,255,255,1)";
            if(adjustMode && adjustNum==i){
                ctx2d.fillStyle="rgba(255,255,0," + (0.6+0.4*Math.sin(t/100)) + ")";
            }
            ctx2d.arc(width*testPoints[i].left,width*testPoints[i].top,10,0,Math.PI*2);
            ctx2d.fill();
        }

        requestAnimationFrame(tick);
    }
}