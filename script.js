var t = 0; //time
var mode = 0; //mode 0タイトル画面　1セレクト画面　2プレイ画面　3リザルト画面　
var animationmax = 1; //nextmodeにうつるタイミング
var animationcnt=0; //アニメーションのカウンター 1でスタート -1処理前
var nextmode=0; //次にうつるモード
var testPoints=[{top:0.05,left:0.5},{top:0.75,left:0.2},{top:0.75,left:0.8}]
// ページの読み込みを待つ


function keypress(mykey,mykeycode){ //キー入力イベント
    if(mykey=="z"){
        window.alert("z");
    }
}

window.addEventListener('load', init); //ロードイベント登録
window.addEventListener('DOMContentLoaded', function(){ ///キー入力イベント登録
    window.addEventListener("keydown", function(e){
      keypress(e.key,e.keyCode);
    });
});

function init() {
    //ローディング処理////////////////////////////////////////

    // サイズを指定
    const width = 960;
    const height = 540;

    //2Dの処理
    ctx2d=document.getElementById("myCanvas").getContext("2d");
    ctx2d.width = width;
    ctx2d.height = height;

    tick();

    function tick() {
        t++;//システム系の処理
        //2次元のリセット処理
        ctx2d.clearRect(0,0,width,height);
        ctx2d.beginPath();
        ctx2d.strokeStyle="rgba(255,0,0,1)";
        ctx2d.lineWidth=5;
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
        ctx2d.stroke();
        for (i = 0;i < testPoints.length;i++){
            ctx2d.beginPath();
            ctx2d.strokeStyle="rgba(0,0,0,0)";
            ctx2d.fillStyle="rgba(255,255,255,1)";
            ctx2d.arc(width*testPoints[i].left,width*testPoints[i].top,10,0,Math.PI*2);
            ctx2d.fill();
        }

        requestAnimationFrame(tick);
    }
}