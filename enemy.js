export default class Enemy {
    constructor(game, player) {
        this.game = game;
        this.player = player;

        //sprite and anims
        this.image = document.getElementById("enemy");
        this.spritewidth = 128;
        this.spriteheight = 126;
        this.width = this.spritewidth;
        this.height = this.spriteheight;
        this.frameX = 0;
        this.frameY = 0;
        this.frameXattack = 0;
        this.maxframeXattack = 5;
        this.maxframeXmove = 8;
        this.maxframeY = 7;
        

        //positions and speed
        this.x = 10;
        this.y = 10;
        this.speedX = 0;
        this.speedY = 0;
        this.topspeed = 1.5;  
        this.attackRange = 20;
        
        //states
        this.moving = false;
        this.attacking = false;
        this.dead = false;
    }

    draw(context) {
        //Model Draw
        let frameX = this.attacking ? this.frameXattack : this.frameX;
        context.drawImage(
            this.image,
            frameX * this.spritewidth,
            this.frameY * this.spriteheight,
            this.spritewidth,
            this.spriteheight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    //update speed
    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
    //update frame
    setFrame(frameY, moving) {
        this.frameY = frameY;
        this.moving = moving;
    }
    //update if attacking
    setAttack(frameY, attacking) {
        this.frameY = frameY;
        this.attacking = attacking;
    }
    //get distance from player
    getDist() {
        return Math.sqrt((this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2);
    }

    update() {
        let distance = this.getDist();

        // Attack if within range
        if (distance <= this.attackRange) {
            this.moving = false;
            this.attacking = true;
            
            // Attack up
            if (this.player.y < this.y) this.setAttack(4, true); 
            // Attack down
            else if (this.player.y > this.y) this.setAttack(6, true); 
            // Attack left
            else if (this.player.x < this.x) this.setAttack(5, true); 
            // Attack right
            else if (this.player.x > this.x) this.setAttack(7, true); 
            
        } else {
            // Move towards player
            this.moving = true;
            this.attacking = false;
            let dx = this.player.x - this.x;
            let dy = this.player.y - this.y;
            let angle = Math.atan2(dy, dx);

            this.x += Math.cos(angle) * this.topspeed;
            this.y += Math.sin(angle) * this.topspeed;

            if (Math.abs(dx) > Math.abs(dy)) {
                // Right or left
                this.setFrame(dx > 0 ? 3 : 1, true); 
            } else {
                // Down or up
                this.setFrame(dy > 0 ? 2 : 0, true); 
            }
        }

        // Movement Animation
        if (this.moving) {
            if (this.frameX < this.maxframeXmove) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } else {
            this.frameX = 0;
        }

        // Attack Animation
        if (this.attacking) {
            if (this.frameXattack < this.maxframeXattack) {
                this.frameXattack++;
            } else {
                this.frameXattack = 0;
            }
        }
    }
}
