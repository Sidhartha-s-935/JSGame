const canvas = document.getElementById("background");
const ctx = canvas.getContext('2d');
width = canvas.width;
height = canvas.height;

window.addEventListener('load',function(){
    class Input{
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', (e) => {
                this.game.lastkey = e.key;
            });
            window.addEventListener('keyup', (e) => {
                this.game.lastkey = undefined;
            });
        }
    }

    class Player{
        constructor(game){
            this.game = game;
            this.x = 10;
            this.y = 70;
            this.width = 50;
            this.height = 40;
            this.speed = 1;
        }
        draw(context){
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Enemy{

    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.lastkey = undefined;
            this.input = new Input(this);
            this.player = new Player(this);
        }
        render(context){
            this.player.draw(context);
        }
    }
    
    const game = new Game(width, height);
    game.render(ctx);
});