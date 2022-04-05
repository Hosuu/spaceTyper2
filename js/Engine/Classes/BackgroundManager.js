export default class BackgroundManager {
    engine;
    canvas;
    particles;
    constructor(engineRef) {
        this.engine = engineRef;
        this.particles = [];
        const bgCanvas = document.querySelector('#Background');
        if (bgCanvas instanceof HTMLCanvasElement)
            this.canvas = bgCanvas;
        else
            throw Error("Can't reach canvas#Background in DOM");
    }
    update(dt) {
        this.particles.forEach((patricle) => patricle.update(dt));
        this.particles = this.particles.filter((particle) => !particle.isDead);
        this.draw();
    }
    clearCanvas() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw Error('Cant reach background rendering context!');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw Error('Cant reach background rendering context!');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.particles.forEach((patricle) => patricle.draw(ctx));
    }
    addParticle(particle) {
        this.particles.push(particle);
    }
}
//# sourceMappingURL=BackgroundManager.js.map