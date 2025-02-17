class Input{
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            this.game.lastkey = e.key;
        });
        window.addEventListener('keyup', (e) => {
            this.game.lastkey = 'R' + e.key;
        });
    }
}