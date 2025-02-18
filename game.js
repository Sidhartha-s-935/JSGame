import Input from './input.js';
import Player from './player.js';
import Enemy from './enemy.js';

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lastkey = undefined;
        this.input = new Input(this);
        this.player = new Player(this);
        this.enemy = new Enemy(this, this.player);
    }

    render(context) {
        this.player.draw(context);
        this.player.update();
        this.enemy.draw(context);
        this.enemy.update();
    }
}
