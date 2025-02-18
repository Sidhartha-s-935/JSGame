export default class Player{
        constructor(game){
            this.game = game;

            //sprite and anims
            this.image = document.getElementById("player");
            this.spritewidth = 128;
            this.spriteheight = 126; 
            this.frameX = 0;
            this.frameXattack = 0;
            this.maxframeXmove = 8;
            this.maxframeXattack = 5;
            this.frameY = 0;
            this.maxframeY = 7;
            this.width = this.spritewidth;
            this.height = this.spriteheight;

            //position and speed
            this.x = 10;
            this.y = 70;
            this.speedX = 0;
            this.speedY = 0;
            this.topspeed = 4;
            this.topmargin = 200;
            
            //states
            this.moving = false;
            this.attacking = false;
        }
        draw(context){
            //Model Draw
            context.drawImage(
                this.image, 
                this.frameX * this.spritewidth,
                this.frameY * this.spriteheight, 
                this.spritewidth, this.spriteheight, 
                this.x, 
                this.y, 
                this.width, 
                this.height
            );
        }

        //update speed
        setSpeed(speedX, speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        //update frame
        setFrame(frameY,moving){
            this.frameY = frameY;
            this.moving = moving;
        }
        //update if attacking
        setAttack(frameY,attacking){
            this.frameY = frameY;
            this.attacking = attacking;
        }

        update(){

            //Attacking
            if(this.game.lastkey === 'k'){
                //Attack up
                if (this.frameY === 0){
                    this.setAttack(4,true);
                    this.moving = false;
                }
                //Attack down
                else if (this.frameY === 2){
                    this.setAttack(6,true);
                    this.moving = false;
                }
                //Attack left
                else if (this.frameY === 1){
                    this.setAttack(5,true);
                    this.moving = false;
                }
                //Attack right
                else if (this.frameY === 3){
                    this.setAttack(7,true);
                    this.moving = false;
                }
            }
            if (this.game.lastkey === 'Rk'){
                //Finish Attack up
                if (this.frameY === 0){
                    this.setAttack(4,false);
                }
                //Finish Attack down
                else if (this.frameY === 2){
                    this.setAttack(6,false);
                }
                //Finish Attack left
                else if (this.frameY === 1){
                    this.setAttack(5,false);
                }
                //Finish Attack right
                else if (this.frameY === 3){
                    this.setAttack(7,false);
                }
            }

            //Moving

            //Move up
            if(this.game.lastkey === 'w'){
                this.setSpeed(0, -this.topspeed);
                this.setFrame(0,true);
            }
            //Finish Move up
            else if(this.game.lastkey === 'Rw'){
                this.setSpeed(0, 0);
                this.setFrame(0,false);
            }
            //Move down
            else if(this.game.lastkey === 's'){
                this.setSpeed(0, this.topspeed);
                this.setFrame(2,true);
            }
            //Finish Move down
            else if(this.game.lastkey === 'Rs'){
                this.setSpeed(0, 0);
                this.setFrame(2,false);
            }
            //Move left
            else if(this.game.lastkey === 'a'){
                this.setSpeed(-this.topspeed, 0);
                this.setFrame(1,true);
            }
            //Finish Move left
            else if(this.game.lastkey === 'Ra'){
                this.setSpeed(0, 0);
                this.setFrame(1,false);
            }
            //Move right
            else if(this.game.lastkey === 'd'){
                this.setSpeed(this.topspeed, 0);
                this.setFrame(3,true);
            }
            //Finish Move right
            else if(this.game.lastkey === 'Rd'){
                this.setSpeed(0, 0);
                this.setFrame(3,false);
            }
            //Update speed
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
            if(this.y > this.game.height-this.height-100){
                this.y = this.game.height-this.height-100;
            }

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

