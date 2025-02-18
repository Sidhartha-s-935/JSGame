export default class Input{
    constructor(game){
        this.game = game;
        //Get key down (Press)
        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            this.game.lastkey = e.key;
        });
        //Get Key up (Release)
        window.addEventListener('keyup', (e) => {
            this.game.lastkey = 'R' + e.key;
        });
    }
}