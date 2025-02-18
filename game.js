import Input from './input.js';
import Player from './player.js';
import Enemy from './enemy.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;

        this.input = new Input(this);
        this.player = new Player(this);
        this.enemy = new Enemy(this);

        this.turn = "player"; 
        this.damageAmount = 10; //damage per attack
    }

    render(context) {
        this.player.draw(context);
        this.player.update();
        this.enemy.draw(context);
        this.enemy.update();
    }

    switchTurn() {
        if (this.player.health <= 0) {
            console.log("Game Over");
            return;
        }

        if (this.enemy.health <= 0) {
            this.enemy.x = -1000; 
            return;
        }

        this.turn = this.turn === "player" ? "enemy" : "player";

        if (this.turn === "enemy") {
            setTimeout(() => {
                this.enemy.attack();
                this.player.takeDamage(this.damageAmount);
                this.switchTurn();
            }, 1000);
        }
    }

    handleInput(key) {
        if (this.turn === "player" && key === "k") {
            this.player.attack();
            this.enemy.takeDamage(this.damageAmount);
            this.switchTurn();
        }
    }
}
