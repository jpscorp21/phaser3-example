import Phaser from 'phaser'

class SimpleBodyScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SimpleBodyScene',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: {y: 200}
                }
            }
        })
    }

    preload() {
        this.load.image('diamond', './assets/sprites/diamond.png');
    }

    create() {
        let diamond = this.physics.add.image(400, 100, 'diamond');

        diamond.setCollideWorldBounds(true);
        diamond.setVelocity(100, 200);
        diamond.setBounce(1, 1);
    }
}

export default SimpleBodyScene;
