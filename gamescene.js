import Fire from './fire.js';

export default class GameScene extends Phaser.Scene
{
    constructor (config)
    {
        super(config);
    }

    timer = 30;
    burger;
    fires;

    preload() {
        //Load images
        this.load.image('burger',    'assets/burger.png');
        this.load.image('fire',      'assets/fire.png');
        //Load sounds
        this.load.audio('test-mp3',  'assets/test.mp3');
        this.load.audio('explosion', 'assets/explosion.wav');
    }
    create ()
    {
        //Set the background color
        //Nevermind, I like black for now
        //this.add.rectangle(400, 300, 800, 600, '0x444444');

        //Add the player (burger) to the game
        //TODO need to place the burger where the pointer clicked on title screen
        this.burger = this.physics.add.sprite(400, 600, 'burger');
        this.burger.body.setSize(undefined, 14); //Fix the burger's hitbox
        this.input.on('pointermove', function (pointer) {
            this.burger.setPosition(pointer.x, pointer.y);
        }, this);

        //Add the group of fires
        this.fires = this.physics.add.group({velocityY: 300});
        this.hitboxes = this.physics.add.group();
        this.gameobjects = this.add.group({runChildUpdate: true});
        //Add a first fire instance
        var fire = new Fire(this, Math.random()*800, -32, 'fire');
        this.fires.add(fire);
        this.hitboxes.add(fire.hitbox);
        this.gameobjects.add(fire);

        //Add score readout
        this.scoreText = this.add.text(20, 600-40, 'SCORE: 0');
        this.score = 0;

        this.sound.stopAll();
        this.sound.add('test-mp3');
        this.sound.add('explosion');
        this.sound.play('test-mp3');

        this.timer = 30;

        //Add pause functionality
        //Currently, pausing the scene prevents this event from triggering again!
        //Pausing halts the game, the way I have it set-up!
        this.input.keyboard.on('keydown-P', function () {
            if (this.scene.scene.isPaused())
                this.scene.scene.run();
            else
                this.scene.scene.pause();
        });

        //Adding overlap events between the burger and the fires
        this.physics.add.overlap(this.burger, this.hitboxes, this.blowup, function () {return true;}, this);
    }
    update ()
    {
        this.fires.children.iterate(function (fire) {
            if (fire.y > 600) {
                fire.setPosition(Math.random()*800, -32);
            }
        });
        if (this.timer-- <= 0) {
            //Add another fire!
            var fire = new Fire(this, Math.random()*800, -32, 'fire');
            this.fires.add(fire);
            this.hitboxes.add(fire.hitbox);
            this.gameobjects.add(fire);
            this.timer = 30;
        }
        //Increase score every tick
        this.scoreText.setText('SCORE: ' + this.score++);
    }
    blowup ()
    {
        //All of this is done in the 'World' context?
        this.sound.play('explosion');
        this.scene.stop();
        this.scene.run('score', {score: this.score});
    }
}
