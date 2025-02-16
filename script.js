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
                this.game.lastkey = 'R' + e.key;
            });
        }
    }

    class Player{
        constructor(game){
            this.game = game;
            this.spritewidth = 128;
            this.spriteheight = 126; 
            this.frameX = 0;
            this.frameY = 0;
            this.lastYframe = undefined;
            this.maxframeX = 5;
            this.maxframeY = 7;
            this.x = 10;
            this.y = 70;
            this.width = this.spritewidth;
            this.height = this.spriteheight;
            this.speedX = 0;
            this.speedY = 0;
            this.topspeed = 4;
            this.topmargin = 45;
            this.image = document.getElementById("player");
            this.moving = false;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update(){
            if(this.game.lastkey === 'ArrowUp'){
                this.setSpeed(0, -this.topspeed);
                this.frameY = 0;
                this.moving = true;
            }else if(this.game.lastkey === 'RArrowUp'){
                this.setSpeed(0, 0);
                this.moving = false;
            }else if(this.game.lastkey === 'ArrowDown'){
                this.setSpeed(0, this.topspeed);
                this.frameY = 2;
                this.moving = true;
            }else if(this.game.lastkey === 'RArrowDown'){
                this.setSpeed(0, 0);
                this.moving = false;
            }else if(this.game.lastkey === 'ArrowLeft'){
                this.setSpeed(-this.topspeed, 0);
                this.frameY = 1;
                this.moving = true;
            }else if(this.game.lastkey === 'RArrowLeft'){
                this.setSpeed(0, 0);
                this.frameY = 1;
                this.moving = false;
            }else if(this.game.lastkey === 'ArrowRight'){
                this.setSpeed(this.topspeed, 0);
                this.frameY = 3;
                this.moving = true;
            }else if(this.game.lastkey === 'RArrowRight'){
                this.setSpeed(0, 0);
                this.frameY = 3;
                this.moving = false;
            }else{
                this.setSpeed(0, 0);
            }
            this.x += this.speedX;
            this.y += this.speedY;
            // Check if player is out of bounds X value
            if (this.x < 0){
                this.x = 0;
            }
            if(this.x > this.game.width-this.width){
                this.x = this.game.width-this.width;
            }
            // Check if player is out of bounds Y value
            if (this.y < this.topmargin){
                this.y = this.topmargin;
            }
            if(this.y > this.game.height-this.height){
                this.y = this.game.height-this.height;
            }
            //Animation
            if(this.frameX < this.maxframeX && this.moving){
                this.frameX++;
            }
            else{
                this.frameX = 0;
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