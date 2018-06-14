import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

    }

    create() {
        this.scene.start('MarioStyleScene');
    }
}

export default BootScene;
