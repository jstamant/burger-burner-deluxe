import TitleScene from './titlescene.js';
import GameScene from './gamescene.js';
import ScoreScene from './scorescene.js';

var titleScene = new TitleScene({key: 'title'});
var gameScene = new GameScene({key: 'game', active: false});
var scoreScene = new ScoreScene({key: 'score', active: false});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    disableContextMenu: true,
    physics: {
        default: 'arcade'
    },
    scene: [titleScene, gameScene, scoreScene]
};

var game = new Phaser.Game(config);
