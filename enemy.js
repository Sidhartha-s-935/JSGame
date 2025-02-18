export default class Enemy {
    constructor(game, player) {
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
        this.topspeed = 1.5;  // Slightly faster movement
        this.attackRange = 20; // Distance at which enemy attacks
        this.image = document.getElementById("enemy");
        this.moving = false;
        this.attacking = false;
        this.dead = false;
    }

    draw(context) {
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

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }

    setFrame(frameY, moving) {
        this.frameY = frameY;
        this.moving = moving;
    }

    setAttack(frameY, attacking) {
        this.frameY = frameY;
        this.attacking = attacking;
    }

    getDistanceToPlayer() {
        return Math.sqrt((this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2);
    }

    update() {
        let distance = this.getDistanceToPlayer();

        // Attack if within range
        if (distance <= this.attackRange) {
            this.moving = false;
            this.attacking = true;
            
            if (this.player.y < this.y) this.setAttack(4, true); // Attack up
            else if (this.player.y > this.y) this.setAttack(6, true); // Attack down
            else if (this.player.x < this.x) this.setAttack(5, true); // Attack left
            else if (this.player.x > this.x) this.setAttack(7, true); // Attack right
            
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
                this.setFrame(dx > 0 ? 3 : 1, true); // Right or left
            } else {
                this.setFrame(dy > 0 ? 2 : 0, true); // Down or up
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
