class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.heights = [4, 7, 5, null, 5, 4, null, 4, 4];
  }

  preload() {
    this.load.image('background', './assets/BG/BG.png');
    this.load.image('cloud', './assets/Object/cloud.png');
    this.load.image('girl', './assets/girl/Idle1.png');
    this.load.image('goal', './assets/Object/candy.png');
  }

  create() {
    gameState.background = this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.6);
    gameState.platforms = this.physics.add.staticGroup();
    gameState.player = this.physics.add.sprite(150, 110, 'girl').setScale(.15);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.goal = this.physics.add.sprite((150 * 8) + 150, 100, 'goal').setScale(.05);
  
    for (const [xIndex, yIndex] of this.heights.entries()) {
        this.createPlatform(xIndex, yIndex);
    } 
    this.physics.add.overlap(gameState.player, gameState.goal, function() {
        this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.stop('GameScene');
            this.scene.start('StartScene');
          }
        });
    }, null, this);

    gameState.background.width = window.innerWidth;
    gameState.background.height = window.innerHeight;
    const game_width = parseFloat(gameState.background.getBounds().width)
    gameState.width = game_width;
    const window_width = config.width

    const background_width = gameState.background.getBounds().width

    gameState.background.setScrollFactor((background_width - window_width) / (game_width - window_width));

    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.goal, gameState.platforms);

    this.cameras.main.setBounds(0, 0, gameState.background.width);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.background.height + gameState.player.height);

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

    gameState.player.setCollideWorldBounds(true);
  }

  update() {
    if (gameState.cursors.right.isDown) {
        gameState.player.flipX = false;
        gameState.player.x += 5;          
    } else if (gameState.cursors.left.isDown) {
        gameState.player.flipX = true;
        gameState.player.x -= 5;
    } else if (gameState.cursors.up.isDown) {
        gameState.player.flipX = true;
        gameState.player.y -= 10;
    } else {
        gameState.player.setVelocityX(0);
    }
    if (gameState.player.y > window.innerHeight) {
        this.cameras.main.shake(240, .01, false, function(camera, progress) {
            if (progress > .9) {
                this.scene.restart('GameScene');
            }
        });
    }
  }

  createPlatform(xIndex, yIndex) {
    gameState.platforms.create((150 * xIndex) + 100,  yIndex * 70 + 100, 'cloud').setScale(0.1).setOrigin(0, 0.5).refreshBody();
  }
}
