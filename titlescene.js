export default class TitleScene extends Phaser.Scene
{
    constructor(config) {
        super(config);
    }
    preload() {
        //Load images
        this.load.image('background', 'assets/burgerburner_menu.jpg');
    }
    create() {
        //Background image for the title screen
        this.background = this.add.image(400, 300, 'background');
        this.background.setDisplaySize(800, 600);
        this.text = this.add.text(400, 300, 'Click the pointer to start the game', {backgroundColor: '#000', padding: {x:10, y:4}});
        this.text.setPosition(400-this.text.width/2, 300-this.text.height); //Roughly centered
        this.text.setData('fg_visible', true);
        this.textblink = 30;
        this.input.on('pointerdown', function (pointer) {
            this.scene.switch('game');
        }, this);
    }
    update() {
        if (this.textblink-- <= 0) {
            if (this.text.getData('fg_visible')) {
                this.text.setFill('#000');
                this.text.setData('fg_visible', false);
            } else {
                this.text.setFill('#fff');
                this.text.setData('fg_visible', true);
            }
            this.textblink = 30;
        }
    }
}
