export default class Player {
    constructor(game) {
        this.game = game;

        // Load animations with respective frame counts
        this.sprites = {
            idle: new Sprite("playerIdle", 6),   // 6 frames
            attack1: new Sprite("playerAttack1", 4), // 4 frames
            attack2: new Sprite("playerAttack2", 5), // 5 frames
            attack3: new Sprite("playerAttack3", 4), // 4 frames
            hurt: new Sprite("playerHurt", 3),   // 3 frames
            dead: new Sprite("playerDead", 6)    // 6 frames
        };

        this.currentAnimation = "idle"; // Default animation
        this.updateSprite();

        this.setPosition();

        this.health = 100;
        this.attacking = false;
        this.turn = true; // Player starts first

        // Animation variables
        this.frameX = 0;
        this.frameCounter = 0;
        this.frameDelay = 5;

        window.addEventListener("resize", () => this.setPosition());
    }

    updateSprite() {
        this.sprite = this.sprites[this.currentAnimation];
        this.width = this.sprite.spriteWidth;
        this.height = this.sprite.spriteHeight;
        this.maxFrameX = this.sprite.frameCount;
    }

    setPosition() {
        this.x = window.innerWidth * 0.2;
        this.y = window.innerHeight * 0.5 - this.height / 2;
    }

    draw(context) {
        context.drawImage(
            this.sprite.image,
            this.frameX * this.sprite.spriteWidth,  
            0,
            this.sprite.spriteWidth,
            this.sprite.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.animate();
    }

    animate() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            this.frameCounter = 0;
            this.frameX++;

            // Reset animation if it reaches the last frame
            if (this.frameX >= this.maxFrameX) {
                if (this.currentAnimation === "dead") return;
                if (this.currentAnimation.startsWith("attack")) this.changeAnimation("idle");
                if (this.currentAnimation === "hurt") this.changeAnimation("idle");
                this.frameX = 0;
            }
        }
    }

    changeAnimation(animation) {
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.frameX = 0; // Reset animation
            this.updateSprite();
        }
    }

    attack() {
        if (!this.turn) return; // Only attack when it's player's turn

        // Randomly choose an attack animation
        const attacks = ["attack1", "attack2", "attack3"];
        const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];

        this.changeAnimation(randomAttack);
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.changeAnimation("dead");
            this.health = 0;
        } else {
            this.changeAnimation("hurt");
        }
    }

    updateTurn(isPlayerTurn) {
        this.turn = isPlayerTurn;
        if (!this.turn) {
            this.changeAnimation("idle"); // Wait if it's not player's turn
        }
    }
}
