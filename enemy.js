import Sprite from "./sprite.js";

export default class Enemy extends Sprite {
    constructor(game) {
        super(game, "enemy", {
            idle: { frames: 8 },
            attack1: { frames: 6 },
            attack2: { frames: 4 },
            attack3: { frames: 5 },
            hurt: { frames: 2 },
            dead: { frames: 2 }
        });

        this.x = this.game.width * 0.7;
        this.y = this.game.height * 0.15;
        this.health = 100;
        this.isAttacking = false;
        this.isHurt = false;
        this.deadAnimationPlayed = false;
    }

    update() {
        if (this.health <= 0) {
            if (!this.deadAnimationPlayed) {
                this.setAnimation("dead");
                setTimeout(() => {
                    this.x = -1000;
                }, 1000);
                this.deadAnimationPlayed = true;
            }
        } else if (this.isHurt) {
            this.playAnimation();
        } else if (this.isAttacking) {
            this.playAnimation();
        } else {
            this.setAnimation("idle");
            this.playAnimation();  
        }

        if (this.game.turn === "enemy" && this.health > 0 && !this.isAttacking) {
            setTimeout(() => {
                this.attack();
            }, 1000);
        }
    }

    attack() {
        if (this.health > 0 && this.game.turn === "enemy") {
            this.isAttacking = true;
            const attacks = ["attack1", "attack2", "attack3"];
            this.setAnimation(attacks[Math.floor(Math.random() * attacks.length)]);

            setTimeout(() => {
                this.isAttacking = false;
                this.setAnimation("idle");
                this.game.player.takeDamage(15);
                this.game.turn = "player";
            }, 500);
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        this.setAnimation("hurt");
        this.isHurt = true;

        setTimeout(() => {
            this.isHurt = false;
            if (this.health > 0) this.setAnimation("idle");
        }, 300);
    }

    draw(context) {
        super.draw(context, true); 
    }
}
