class Bubble {
    constructor(canvasWidth, speedMultiplier) {
        this.radius = Math.random() * 20 + 15; // Size between 15 and 35
        this.x = Math.random() * (canvasWidth - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = (Math.random() * 2 + 1) * speedMultiplier;
        
        // Flat solid palette colors
        const colors = ['#00ffcc', '#ff3366', '#ffcc00', '#3399ff', '#b82ed6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speed;
    }

    draw(ctx) {
        // Main bubble body
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.closePath();

        // Highlighting accent
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.closePath();
        
        ctx.globalAlpha = 1.0; // Reset canvas alpha state
    }
}