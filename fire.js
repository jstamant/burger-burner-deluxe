export default class Fire extends Phaser.GameObjects.Image
{
    constructor (scene, x, y, texture, frame=0)
    {
        super(scene, x, y, texture, frame);
        this.setOrigin(0.5, 1);
        this.hitbox = new Phaser.GameObjects.Rectangle(scene, this.x, this.y, this.width*0.8, 1);
        scene.add.existing(this);
    }
    update()
    {
        this.hitbox.setPosition(this.x, this.y);
    }
}
