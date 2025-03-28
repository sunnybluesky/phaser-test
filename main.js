// Pixiアプリケーション生成
let app = new PIXI.Application({
    width: 1280,     // スクリーン(ビュー)横幅 
    height: 720,    // スクリーン(ビュー)縦幅  
    backgroundColor: 0x1099bb,  // 背景色 16進 0xRRGGBB
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById('app');
el.appendChild(app.view);

        // プレイヤーキャラクターを作成
        const player = new PIXI.Graphics();
        player.beginFill(0xFF0000); // 赤色
        player.drawRect(-25, -50, 50, 100); // キャラクターのサイズ
        player.endFill();
        player.x = app.screen.width / 2;
        player.y = app.screen.height - 100; // 画面下部に配置

        app.stage.addChild(player);

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
            if (player.y >= app.screen.height - 100) {
                player.y = app.screen.height - 100;
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
            if (keys["ArrowUp"]){
                velocityY = -10
            }
        });