import Phaser from 'phaser';

class MarioStyleScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'MarioStyleScene',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 500},
                    debug: false
                }
            }
        })
    }

    preload() {
        this.load.tilemapTiledJSON('map', './assets/mario-style/map.json');
        this.load.spritesheet('tiles', './assets/mario-style/tiles.png', {frameWidth: 70, frameHeight: 70});
        this.load.image('coin', './assets/mario-style/coinGold.png');
        this.load.atlas('player', './assets/mario-style/player.png', './assets/mario-style/player.json');
        this.load.image('sky', './assets/sprites/sky.png');
    }

    create() {
        //this.add.image(400, 300, 'sky');
        this.map = this.make.tilemap({key: 'map'});

        var groundTiles = this.map.addTilesetImage('tiles');
        this.groundLayer = this.map.createDynamicLayer('World', groundTiles, 0, 0);
        this.groundLayer.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;


        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setBounce(0.7);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'p1_stand'}],
            frameRate: 10,
        });

        this.physics.add.collider(this.groundLayer, this.player);

        this.cursor = this.input.keyboard.createCursorKeys();

        // CAMARA
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor('#ccccff');

        // Hacer visibles las monedas
        var coinTiles = this.map.addTilesetImage('coin');
        this.coinLayer = this.map.createDynamicLayer('Coins', coinTiles, 0, 0);

        this.coinLayer.setTileIndexCallback(17, this.collectCoin, this);
        this.physics.add.overlap(this.player, this.coinLayer);

        this.text = this.add.text(20, 570, '0', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        this.text.setScrollFactor(0);
        this.score = 0;
    }

    update() {

        if (this.cursor.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play('walk', true);
            this.player.flipX = true;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play('walk', true);
            this.player.flipX = false;
        } else {
            this.player.body.setVelocityX(0);
            this.player.anims.play('idle', true);
        }

        if ((this.cursor.space.isDown || this.cursor.up.isDown) && this.player.body.onFloor()) {
            this.player.body.setVelocityY(-500);
        }

    }

    collectCoin(sprite, tile) {
        this.coinLayer.removeTileAt(tile.x, tile.y);
        this.score++;
        this.text.setText(this.score); //Establecer el texto
        return false;
    }


}

export default MarioStyleScene;
