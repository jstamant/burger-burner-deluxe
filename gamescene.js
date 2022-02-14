import Fire from './fire.js';

import * as global from './globals.js';

export default class GameScene extends Phaser.Scene
{
    constructor (config)
    {
        super(config);
    }
    preload() {
        //Load images
        this.load.image('burger',          'assets/burger.png');
        this.load.image('fire',            'assets/fire.png');
        this.load.image('game-background', 'assets/background.png');
        //Load sounds
        this.load.audio('einswei',         'assets/einswei.mp3');
        this.load.audio('explosion',       'assets/explosion.wav');
    }
    create ()
    {
        //Set the background
        this.background = this.add.tileSprite(global.GAME_WIDTH/2, 0, 0, 0, 'game-background');

        //Add the player (burger) to the game
        //TODO need to place the burger where the pointer clicked on title screen
        this.burger = this.physics.add.sprite(global.GAME_WIDTH/2, global.GAME_HEIGHT, 'burger');
        this.burger.body.setSize(undefined, 14); //Fix the burger's hitbox
        this.input.on('pointermove', function (pointer) {
            this.burger.setPosition(pointer.x, pointer.y);
        }, this);

        //Add the group of fires
        this.fires = this.physics.add.group({velocityY: global.DEFAULT_VELOCITY});
        this.hitboxes = this.physics.add.group();
        this.gameobjects = this.add.group({runChildUpdate: true});
        //Add a first fire instance
        var fire = new Fire(this, Math.random()*global.GAME_WIDTH, -32, 'fire');
        this.fires.add(fire);
        this.hitboxes.add(fire.hitbox);
        this.gameobjects.add(fire);

        //Add score readout
        this.scoreText = this.add.text(20, global.GAME_HEIGHT-40, 'SCORE: 0');
        this.score = 0;

        this.sound.stopAll();
        this.sound.add('einswei');
        this.sound.add('explosion');
        this.sound.play('einswei');

        this.timer = global.SPAWN_RATE;

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
        //Scroll background
        this.background.tilePositionY -= global.DEFAULT_SPEED;

        this.fires.children.iterate(function (fire) {
            if (fire.y > global.GAME_HEIGHT+32) {
                fire.setPosition(Math.random()*global.GAME_WIDTH, -32);
            }
        });
        if (this.timer-- <= 0) {
            //Add another fire!
            var fire = new Fire(this, Math.random()*global.GAME_WIDTH, -32, 'fire');
            this.fires.add(fire);
            this.hitboxes.add(fire.hitbox);
            this.gameobjects.add(fire);
            this.timer = global.SPAWN_RATE;
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
