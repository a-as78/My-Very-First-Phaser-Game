class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

    preload() {
        this.load.image('baby-unicorn', './assets/baby-unicorn.png');
    }

	create() {
        gameState.babyUnicorn = this.add.sprite(window.innerWidth / 2, window.innerHeight - 200, 'baby-unicorn');
        gameState.babyUnicorn.displayWidth = 100;
        gameState.babyUnicorn.displayHeight = 100;
        gameState.playText = this.add.text(
            window.innerWidth / 2 - 55,
            window.innerHeight / 2 - 100,
            'Play!', 
            { 
                fontSize: 50, 
                fill: '#cd7d96', 
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' 
            });
        this.input.on('pointerdown', () => {
            this.scene.stop('StartScene')
            this.scene.start('GameScene')
        })
	}
}