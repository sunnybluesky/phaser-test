const bgm = {
    playing: new Audio("assets/UsagiFlap.m4a"),
}
bgm.playing.addEventListener("canplaythrough", () => {
    bgm.playing.loop = true
    bgm.playing.play()
})
// Pixiアプリケーション生成
let app = new PIXI.Application({
    width: 1280,     // スクリーン(ビュー)横幅 
    height: 720,    // スクリーン(ビュー)縦幅  
    backgroundColor: 0x1099bb,  // 背景色 16進 0xRRGGBB
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById('app');
el.appendChild(app.view);

// スプライトシートからアニメーションを作成
var textures = [];
for (let i = 0; i < 24; i++) {
    var num = i == 0 ? "" : i + 1
    textures.push(PIXI.Texture.from(`assets/img/al-1s/aris${num}.png`));  // run0.png, run1.png, ...
}
// スプライトを作成
const player = new PIXI.AnimatedSprite(textures);  // 最初のフレームを使ってスプライト作成


// プレイヤーキャラクターを作成
player.scale.set(0.5)
player.x = app.screen.width / 2;
player.y = app.screen.height - 100; // 画面下部に配置
player.animationSpeed = 0.5;
player.play()
app.stage.addChild(player);

// スプライトシートからアニメーションを作成
var textures = [];
for (let i = 0; i < 3; i++) {
    textures.push(PIXI.Texture.from(`assets/img/death-momoi/dm${i+1}.png`));  // run0.png, run1.png, ...
}
// スプライトを作成
const deathMomoi = new PIXI.AnimatedSprite(textures);  // 最初のフレームを使ってスプライト作成
app.stage.addChild(deathMomoi);
deathMomoi.animationSpeed = 0.1;
deathMomoi.play()
deathMomoi.scale.set(0.10)

// 物理演算用の変数
let velocityY = 0; // 垂直速度
let isJumping = false;
const gravity = 1; // 重力
const jumpStrength = -20; // ジャンプの強さ

// ジャンプ処理
function jump() {
    if (!isJumping) {
        velocityY = jumpStrength;
        isJumping = true;
    }
}

// 更新処理
app.ticker.add(() => {
    // 重力の影響を受けてプレイヤーが下降
    velocityY += gravity;

    // プレイヤーの位置を更新
    player.y += velocityY;

    // プレイヤーが地面に到達したらジャンプ可能状態に戻す
    if (player.y >= app.screen.height - 300) {
        player.y = app.screen.height - 300;
        velocityY = 0;
        isJumping = false;
    }
});

// キーボードの入力を処理
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space') {
        jump();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// 毎フレーム更新: プレイヤーの移動
app.ticker.add(() => {
    if (keys['ArrowLeft']) {
        player.x -= 5;
    }
    if (keys['ArrowRight']) {
        player.x += 5;
    }
    if (keys["ArrowUp"]) {
        jump(15)
    }
});





function createEvent(name,obj = {}){
    const event = new CustomEvent(name, obj);
    window.dispatchEvent(event); // -> 'Hello world'
}

var deathMomoiCounter = 0
deathMomoi.y = 550
window.addEventListener('death-momoi', function(e) {
    deathMomoiCounter = 0

});
app.ticker.add(()=>{
    var speed = 15
    deathMomoi.x = 1280 - (deathMomoiCounter*speed)
    if(deathMomoi.x < -200){
        return null;
    }else{
    deathMomoiCounter++
    }
});
setInterval(()=>{
    createEvent("death-momoi")
},3000)