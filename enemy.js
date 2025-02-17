class Enemy{
    constructor(game){
        this.game = game;
        this.x = undefined;
        this.y = undefined;
        this.spritewidth = undefined;
        this.spriteheight = undefined;
        this.width = this.spritewidth;
        this.height = this.spriteheight;
        this.frameX = undefined;
        this.frameY = undefined;
        this.maxframeX = undefined;
        this.maxframeY = undefined;
        this.speedX = undefined;
        this.speedY = undefined;
        this.topspeed = 1;
        this.topmargin = 45;
        // this.image = document.getElementById("enemy");
        this.dead = false;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spritewidth, this.frameY * this.spriteheight, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
    }


}