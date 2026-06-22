const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI DOM targets
const scoreBoard = document.getElementById('scoreBoard');
const livesBoard = document.getElementById('livesBoard');
const screenOverlay = document.getElementById('screenOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const actionBtn = document.getElementById('actionBtn');

// System Engine Variables
let score = 0;
let lives = 3;
let bubbles = [];
let gameActive = false;
let spawnTimer = 0;
let spawnInterval = 60; 
let speedMultiplier = 1;

// Observers / Listeners
actionBtn.addEventListener('click', startGame);
canvas.addEventListener('click', handleCanvasClick);

function startGame() {
    score = 0;
    lives = 3;
    bubbles = [];
    spawnInterval = 60;
    speedMultiplier = 1;
    
    scoreBoard.innerText = `Score: ${score}`;
    livesBoard.innerText = `Lives: ${lives}`;
    
    screenOverlay.style.display = 'none';
    gameActive = true;
    
    animate();
}

function gameOver() {
    gameActive = false;
    overlayTitle.innerText = "GAME OVER";
    overlayText.innerText = `Final Score: ${score}`;
    actionBtn.innerText = "Play Again";
    screenOverlay.style.display = 'flex';
}

function handleCanvasClick(event) {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Evaluate collisions backwards to tap the top layer bubbles first
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const distance = Math.hypot(clickX - b.x, clickY - b.y);

        if (distance < b.radius) {
            bubbles.splice(i, 1);
            score += 10;
            scoreBoard.innerText = `Score: ${score}`;
            
            // Dynamic difficulty escalations
            if (score % 100 === 0) {
                speedMultiplier += 0.15;
                spawnInterval = Math.max(25, spawnInterval - 5);
            }
            break; 
        }
    }
}

function animate() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dynamic generation monitoring
    spawnTimer++;
    if (spawnTimer >= spawnInterval) {
        bubbles.push(new Bubble(canvas.width, speedMultiplier));
        spawnTimer = 0;
    }

    // Process update rendering array sequences
    for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.update();
        b.draw(ctx);

        // Ground collision verification
        if (b.y - b.radius > canvas.height) {
            bubbles.splice(i, 1);
            lives--;
            livesBoard.innerText = `Lives: ${lives}`;

            if (lives <= 0) {
                gameOver();
            }
        }
    }

    requestAnimationFrame(animate);
}