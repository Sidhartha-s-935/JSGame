const canvas = document.getElementById("background");
const ctx = canvas.getContext('2d');
width = canvas.width;
height = canvas.height;

window.addEventListener('load',function(){
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

    class Player{
        constructor(game){
            this.game = game;
            this.spritewidth = 128;
            this.spriteheight = 126; 
            this.frameX = 0;
            this.frameY = 0;
            this.frameXattack = 0;
            this.maxframeXmove = 8;
            this.maxframeY = 7;
            this.maxframeXattack = 5;
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
            this.attacking = false;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        setFrame(frameY,moving){
            this.frameY = frameY;
            this.moving = moving;
        }
        setAttack(frameY,attacking){
            this.frameY = frameY;
            this.attacking = attacking;
        }
        update(){
            //Attacking
            if(this.game.lastkey === 'k'){
                if (this.frameY === 0){
                    this.setAttack(4,true);
                    this.moving = false;
                }else if (this.frameY === 2){
                    this.setAttack(6,true);
                    this.moving = false;
                }else if (this.frameY === 1){
                    this.setAttack(5,true);
                    this.moving = false;
                }else if (this.frameY === 3){
                    this.setAttack(7,true);
                    this.moving = false;
                }
            }
            if (this.game.lastkey === 'Rk'){
                if (this.frameY === 0){
                    this.setAttack(4,false);
                }else if (this.frameY === 2){
                    this.setAttack(6,false);
                }else if (this.frameY === 1){
                    this.setAttack(5,false);
                }else if (this.frameY === 3){
                    this.setAttack(7,false);
                }
            }

            //Moving
            if(this.game.lastkey === 'w'){
                this.setSpeed(0, -this.topspeed);
                this.setFrame(0,true);
            }else if(this.game.lastkey === 'Rw'){
                this.setSpeed(0, 0);
                this.setFrame(0,false);
            }else if(this.game.lastkey === 's'){
                this.setSpeed(0, this.topspeed);
                this.setFrame(2,true);
            }else if(this.game.lastkey === 'Rs'){
                this.setSpeed(0, 0);
                this.setFrame(2,false);
            }else if(this.game.lastkey === 'a'){
                this.setSpeed(-this.topspeed, 0);
                this.setFrame(1,true);
            }else if(this.game.lastkey === 'Ra'){
                this.setSpeed(0, 0);
                this.setFrame(1,false);
            }else if(this.game.lastkey === 'd'){
                this.setSpeed(this.topspeed, 0);
                this.setFrame(3,true);
            }else if(this.game.lastkey === 'Rd'){
                this.setSpeed(0, 0);
                this.setFrame(3,false);
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
            // if (this.y < this.topmargin){
            //     this.y = this.topmargin;
            // }
            // if(this.y > this.game.height-this.height){
            //     this.y = this.game.height-this.height;
            // }
            //Movement Animation
            if(this.frameX < this.maxframeXmove && this.moving){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
            //Attack Animation
            if(this.frameXattack < this.maxframeXattack && this.attacking){
                this.frameXattack++;
            }
            else{
                this.frameXattack = 0;
            }

        }
    }

    class Enemy{
        constructor(game,player){
            this.game = game;
            this.player = player;
            this.spritewidth = 128;
            this.spriteheight = 126; 
            this.frameX = 0;
            this.frameY = 0;
            this.frameXattack = 0;
            this.maxframeXmove = 8;
            this.maxframeY = 7;
            this.maxframeXattack = 5;
            this.x = 10;
            this.y = 10;
            this.width = this.spritewidth;
            this.height = this.spriteheight;
            this.speedX = 0;
            this.speedY = 0;
            this.topspeed = 1;
            this.topmargin = 45;
            this.image = document.getElementById("enemy");
            this.moving = false;
            this.attacking = false;
            this.dead = false;
        }
        draw(context){
            context.drawImage(this.image, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
        }
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        setFrame(frameY,moving){
            this.frameY = frameY;
            this.moving = moving;
        }
        setAttack(frameY,attacking){
            this.frameY = frameY;
            this.attacking = attacking;
        }
        update(){
            if (this.player.x > this.x-3){
                this.setSpeed(this.topspeed, 0);
                this.setFrame(3,true);
            }
            else if(this.player.x<this.x+3){
                this.setSpeed(-this.topspeed,0);
                this.setFrame(1,true);
            }
            if (this.player.y>this.y-3){
                this.setSpeed(0,this.topspeed);
                this.setFrame(2,true);
            }
            else if (this.player.y<this.y+3){
                this.setSpeed(0,-this.topspeed);
                this.setFrame(0,true);
            }
            this.x += this.speedX;
            this.y += this.speedY;

        }


    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.lastkey = undefined;
            this.input = new Input(this);
            this.player = new Player(this);
            this.enemy = new Enemy(this,this.player);
        }
        render(context){
            this.player.draw(context);
            this.player.update();
            this.enemy.draw(context);
            this.enemy.update();
        }
    }
    
    const game = new Game(width, height);
    function animate(){
        ctx.clearRect(0,0,width,height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});