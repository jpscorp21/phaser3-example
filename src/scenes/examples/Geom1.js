import Phaser from 'phaser';

class Geom1Scene extends Phaser.Scene {

    constructor() {
        super({key: 'Geom1Scene'})
    }

    create() {
        let rect1 = new Phaser.Geom.Rectangle(50, 50, 300, 200);
        let rect2 = new Phaser.Geom.Rectangle(400, 50, 300, 200);
        let rect3 = new Phaser.Geom.Rectangle(50, 300, 300, 200);
        let rect4 = new Phaser.Geom.Rectangle(400, 300, 300, 200);

        let graphics = this.add.graphics({fillStyle: {color: 0x0000ff}});

        graphics.fillRectShape(rect1);
        graphics.fillRectShape(rect2);
        graphics.fillRectShape(rect3);
        graphics.fillRectShape(rect4);
    }

}

export default Geom1Scene
