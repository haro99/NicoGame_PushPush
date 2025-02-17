function main() {
    const scene = new g.Scene({ 
      game: g.game,
      assetPaths: [
        "/image/btn.png",
        "/audio/se",
        "/audio/se1",
        "/fonts/*",
        "/image/spbtn.png",
      ]   //シーン内で利用するアセットのファイルパス
    });
    g.game.vars.gameState = { score: 0 };   //スコアの初期化
    let time = 60; // 制限時間
    scene.onLoad.add(() => {
      // const backgroundRect = new g.FilledRect({
      //   scene: scene,
      //   width: g.game.width,
      //   height: g.game.height,
      //   cssColor: "blue"
      // });
      // scene.append(backgroundRect);

      // for(i = 0; i < 5; i++)
      // {
      //   const rect = createRect(scene);
      //   scene.append(rect);
      // }

      const sprite = new g.Sprite({
        scene: scene,
        src: scene.asset.getImage("/image/btn.png"),
        scaleX: 0.1,  //サイズを変更
        scaleY: 0.1,
        x: 300,
        y: 200
      });

      const spbtn = new g.Sprite({
        scene: scene,
        src: scene.asset.getImage("/image/spbtn.png"),
        scaleX: 0.1,  //サイズを変更
        scaleY: 0.1,
        x: 300,
        y: 200
      });

      const font = new g.DynamicFont({
        game: g.game,
        fontFamily: "sans-serif",
        size: 15
      });

      // スコア表示エンティティの作成
      const scoreLabel = new g.Label({
        scene,
        font,
        fontSize: font.size,
        text: `${g.game.vars.gameState.score}`,
        textColor: "white",
        x: g.game.width - 10,
        y: 10,
        anchorX: 1.0,
        anchorY: 0,
      });
      scene.append(scoreLabel);

      // スコア表示を更新する
      function updateScoreLabel() {
        scoreLabel.text = `${g.game.vars.gameState.score}`;
        scoreLabel.invalidate();
      }

      let remainingTime = time;
      // タイマー表示エンティティの作成
      const timerLabel = new g.Label({
        scene: scene,
        font: font,
        fontSize: font.size,
        text: `${remainingTime}`,
        textColor: "white",
        fontSize: 15,
        textColor: "blue",
        x: 70,
        y: 10,
        width: 70,
        anchorX: 1.0,
        anchorY: 0,
      });
      scene.append(timerLabel);

      // タイマー表示を更新する
      function updateTimer() {
        timerLabel.text = `${remainingTime}`;
        timerLabel.invalidate();
      }

      sprite.touchable = true;  //クリックの処理有効

      // クリックされた時の処理
      sprite.onPointDown.add(() => {
        console.log("Click")
        scene.asset.getAudio("/audio/se").play();
        // スコアを 10 点加算する例
        g.game.vars.gameState.score += 10;
        updateScoreLabel();
        // 位置をランダムに更新
        sprite.x = Math.floor(g.game.random.generate() * 500);
        sprite.y = Math.floor(g.game.random.generate() * 200);
        // 更新する
        sprite.modified();
        
        let rand = g.game.random.generate() * 50;

        if(rand < 20)
        {
          console.log("スペシャルボタンを生成");

          scene.append(spbtn);
        }
      });

      spbtn.touchable = true; //SPクリックの処理有効
      spbtn.onPointDown.add(() => {
        console.log("SPボタンが押されたよ！");
        //SPボタンのSEを鳴らす
        scene.asset.getAudio("/audio/se1").play();
        //1万ポイントを加算
        g.game.vars.gameState.score += 10000;
        updateScoreLabel();
        scene.remove(spbtn); // シーンから削除する
      });

      scene.append(sprite);

        // 残り時間の更新
      const timer = scene.setInterval(() => {
        remainingTime--;
        updateTimer();
      }, 1000);
    });
    g.game.pushScene(scene);
  }

  function createRect(scene) {
    return new g.FilledRect({
      scene: scene,
      x: Math.floor(g.game.localRandom.generate() * 320),
      y: 50,
      width: 50,
      height: 50,
      cssColor: "#7F3F3F"
    });
  }
  
  module.exports = main;