import Game from './game.js';

const canvas = document.getElementById("background");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const game = new Game(canvas);

// Handle user input for attack
window.addEventListener("keydown", (e) => {
    if (e.key === "k") {
        game.handleInput(e.key);
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
}

animate();
