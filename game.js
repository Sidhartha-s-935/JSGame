import Input from './input.js';
import Player from './player.js';
import Enemy from './enemy.js';

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lastkey = undefined;
        this.keys = [];
        this.input = new Input(this);
        this.player = new Player(this);
        this.enemy = new Enemy(this, this.player);
    }

    render(context) {
        //Draw player and update
        this.player.draw(context);
        this.player.update();

        //Draw enemy and update
        this.enemy.draw(context);
        this.enemy.update();
    }
}
