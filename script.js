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
            this.speedX = 0;
            this.speedY = 0;
            this.topspeed = 3;
            this.topmargin = 45;
        }
        draw(context){
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update(){
            if(this.game.lastkey === 'ArrowUp'){
                this.setSpeed(0, -this.topspeed);
            }else if(this.game.lastkey === 'ArrowDown'){
                this.setSpeed(0, this.topspeed);
            }else if(this.game.lastkey === 'ArrowLeft'){
                this.setSpeed(-this.topspeed, 0);
            }else if(this.game.lastkey === 'ArrowRight'){
                this.setSpeed(this.topspeed, 0);
            }
            else{
                this.setSpeed(0, 0);
            }
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0){
                this.x = 0;
            }
            if(this.x > this.game.width-this.width){
                this.x = this.game.width-this.width;
            }
            if (this.y < this.topmargin){
                this.y = this.topmargin;
            }
            if(this.y > this.game.height-this.height){
                this.y = this.game.height-this.height;
            }
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
            this.player.update();
        }
    }
    
    const game = new Game(width, height);
    function animate(){
        ctx.clearRect(0, 0, width, height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});