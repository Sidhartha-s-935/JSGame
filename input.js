export default class Input {
    constructor(game) {
        this.game = game;

        // Initialize keys array in Game
        this.game.keys = [];

        // Listen for key presses
        window.addEventListener("keydown", (e) => {
            if (!this.game.keys.includes(e.key)) {
                this.game.keys.push(e.key);
            }
            this.game.lastKey = e.key;
        });

        // Listen for key releases
        window.addEventListener("keyup", (e) => {
            this.game.keys = this.game.keys.filter((key) => key !== e.key);
        });
    }
}
