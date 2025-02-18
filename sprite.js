export default class Sprite {
    constructor(game, type, animations, scale = 5) {  
        this.game = game;
        this.type = type;
        this.animations = animations;
        this.scale = scale;  
        this.currentAnimation = "idle";
        this.frameIndex = 0;
        this.frameDelay = 5;
        this.frameCounter = 0;
        this.sprites = {}; 

        // Load images from HTML
        for (const key in animations) {
            this.sprites[key] = document.getElementById(`${type}${key.charAt(0).toUpperCase() + key.slice(1)}`);
        }

        // Auto-calculate frame width
        this.image = this.sprites[this.currentAnimation];
        this.frameWidth = this.image.width / animations[this.currentAnimation].frames;
        this.frameHeight = this.image.height;
    }

    setAnimation(name) {
        if (this.currentAnimation !== name) {
            this.currentAnimation = name;
            this.frameIndex = 0;
            this.image = this.sprites[name];
            this.frameWidth = this.image.width / this.animations[name].frames;
        }
    }

    playAnimation() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            this.frameCounter = 0;
            this.frameIndex = (this.frameIndex + 1) % this.animations[this.currentAnimation].frames;
        }
    }

    draw(context, flip = false) {
        context.save();
        if (flip) {
            context.scale(-1, 1);
            context.drawImage(
                this.image,
                this.frameIndex * this.frameWidth, 0,  // Crop source X and Y
                this.frameWidth, this.frameHeight,  // Source width & height
                -this.x - this.frameWidth * this.scale, this.y,  // Flipped X (negative)
                this.frameWidth * this.scale, this.frameHeight * this.scale  
            );
        } else {
            context.drawImage(
                this.image,
                this.frameIndex * this.frameWidth, 0,  // Crop source X and Y
                this.frameWidth, this.frameHeight,  // Source width & height
                this.x, this.y,  // Destination X and Y
                this.frameWidth * this.scale, this.frameHeight * this.scale  
            );
        }
        context.restore();
    }
}
