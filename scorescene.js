export default class ScoreScene extends Phaser.Scene
{
    constructor(config) {
        super(config);
    }
    init(data) {
        this.score = data.score;
    }
    preload() {
        //Load images
        this.load.image('score-background', 'assets/burgerburner_darkenmenu.jpg');
    }
    create() {
        //Background image for the score screen
        this.background = this.add.image(400, 300, 'score-background');
        this.background.setDisplaySize(800, 600);

        //Show score readout
        this.heading = this.add.text(-1, -1, 'SCORE', {fontSize: '24px', stroke: '#000', strokeThickness: 4});
        this.heading.setPosition(400-this.heading.width/2, 30);
        this.scoreText = this.add.text(-1, -1, this.score, {fontSize: '48px', stroke: '#000', strokeThickness: 8});
        this.scoreText.setPosition(400-this.scoreText.width/2, 60);

        //Flashing text to instruct how to return to the main menu
        this.text = this.add.text(-1, -1, 'Click the pointer to continue...', {backgroundColor: '#000', padding: {x:10, y:4}});
        this.text.setPosition(400-this.text.width/2, 300-this.text.height);
        this.text.setData('fg_visible', true);
        this.textblink = 30;

        //Click event to return to the title screen
        this.input.on('pointerdown', function (pointer) {
            this.scene.stop();
            this.scene.run('title');
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
