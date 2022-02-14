import TitleScene from './titlescene.js';
import GameScene from './gamescene.js';
import ScoreScene from './scorescene.js';

import * as global from './globals.js';

var titleScene = new TitleScene({key: 'title'});
var gameScene = new GameScene({key: 'game', active: false});
var scoreScene = new ScoreScene({key: 'score', active: false});

var config = {
    gameTitle: 'Burger Burner! Deluxe',
    gameURL: 'https://jstamant.itch.io/burger-burner',
    type: Phaser.AUTO,
    width: global.GAME_WIDTH,
    height: global.GAME_HEIGHT,
    disableContextMenu: true,
    fps: {
        target: global.GAME_FPS
    },
    physics: {
        default: 'arcade'
    },
    scene: [titleScene, gameScene, scoreScene]
};

var game = new Phaser.Game(config);
