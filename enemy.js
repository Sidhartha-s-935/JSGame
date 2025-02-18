export default class Enemy {
    constructor(game, player) {
        this.game = game;
        this.player = player;

        // Load sprite sheets
        this.sprites = {
            idle: document.getElementById("enemyIdle"),
            attack: document.getElementById("enemyAttack"),
            death: document.getElementById("enemyDeath")
        };
        this.currentSprite = this.sprites.idle;

        // Sprite dimensions
        this.spriteWidth = 128;
        this.spriteHeight = 126;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        // Dynamic position based on screen size
        this.setPosition();

        // State
        this.health = 100;
        this.attacking = false;
        this.turn = false;

        // Animation
        this.frameX = 0;
        this.frameCounter = 0;
        this.frameDelay = 5;
        this.maxFrameX = 5;

        // Listen for screen resize
        window.addEventListener("resize", () => this.setPosition());
    }

    setPosition() {
        this.x = window.innerWidth * 0.7;  // Enemy on the right side (70% of screen width)
        this.y = window.innerHeight * 0.5 - this.height / 2;  // Center vertically
    }

    draw(context) {
        context.drawImage(
            this.currentSprite,
            this.frameX * this.spriteWidth,
            0,  // Assuming animation is in a single row
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    attack() {
        if (!this.turn || this.attacking || this.health <= 0) return;
        
        this.attacking = true;
        this.frameY = 4;  // Attack animation row
        this.frameX = 0;
        
        setTimeout(() => {
            this.player.takeDamage(15);
            this.attacking = false;
            this.frameY = 0;  // Return to idle
            this.turn = false;
            this.player.turn = true;  // Player's turn next
        }, 500);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.frameY = 3;  // Death animation row
            setTimeout(() => {
                this.x = -9999;  // Remove from screen
            }, 1000);
        }
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            if (this.attacking && this.frameX < this.maxFrameX) {
                this.frameX++;
            } else if (!this.attacking) {
                this.frameX = (this.frameX + 1) % 4;  // Loop idle animation
            }
            this.frameCounter = 0;
        }
    }
}
