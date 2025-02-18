import Game from './game.js';

const canvas = document.getElementById("background");
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const game = new Game(width, height);

function animate() {
    ctx.clearRect(0, 0, width, height);
    game.render(ctx);
    requestAnimationFrame(animate);
}

animate();
