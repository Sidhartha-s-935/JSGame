class Sprite {
    constructor(imageId, frameCount) {
        this.image = document.getElementById(imageId);
        this.frameCount = frameCount;
        
        // Get single frame width & height dynamically
        this.spriteWidth = this.image.width / this.frameCount;
        this.spriteHeight = this.image.height;
    }
}
