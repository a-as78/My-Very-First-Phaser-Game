const gameState = {
	score: 0
};

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 25,
    height: window.innerHeight - 25,
    backgroundColor: 'f4c2c2',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        enableBody: true,
      }
    },
    scene: [
        StartScene, 
        GameScene
    ]
  };
  
  const game = new Phaser.Game(config);