import Sprite from "./sprite.js";

export default class Player extends Sprite {
    constructor(game) {
        super(game, "player", {
            idle: { frames: 6 },
            attack1: { frames: 4 },
            attack2: { frames: 5 },
            attack3: { frames: 4 },
            hurt: { frames: 3 },
            dead: { frames: 6 }
        });

        this.x = this.game.width * 0.1;
        this.y = this.game.height * 0.15;
        this.health = 100;
        this.isAttacking = false;
        this.isHurt = false;
    }

    update() {
        if (this.health <= 0) {
            this.setAnimation("dead");
        } else if (this.isHurt) {
            this.playAnimation();
        } else if (this.isAttacking) {
            this.playAnimation();
        } else {
            this.setAnimation("idle");
            this.playAnimation();  
        }
    }

    attack() {
        if (this.health > 0 && this.game.turn === "player") {
            const attacks = ["attack1", "attack2", "attack3"];
            this.setAnimation(attacks[Math.floor(Math.random() * attacks.length)]);
            this.isAttacking = true;

            setTimeout(() => {
                this.isAttacking = false;
                this.setAnimation("idle"); 
                this.game.enemy.takeDamage(20);
                this.game.turn = "enemy";
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
}
