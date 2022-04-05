import BaseWord from '../Engine/Classes/BaseWord.js';
import PixelParticle from '../Particles/PixelParticle.js';
export default class Word extends BaseWord {
    trailDelay;
    constructor(text) {
        super(text);
        this.trailDelay = 0;
    }
    update(dt) {
        super.update(dt);
        this.trailDelay += dt;
        if (this.trailDelay > 80) {
            this.trailDelay -= 80;
            const wordHeight = this.metrics.actualBoundingBoxDescent +
                this.metrics.actualBoundingBoxAscent;
            this.engine.backgroundManager.addParticle(new PixelParticle({
                posX: this.progress * window.innerWidth +
                    this.metrics.actualBoundingBoxLeft +
                    5,
                posY: this.posY * window.innerHeight -
                    Math.random() * wordHeight,
                angle: (0.8 + Math.random() * 0.4) * Math.PI,
                color: '#ccc',
                size: Math.random() * 6,
                speed: 0.8,
            }));
        }
    }
    onPass() {
        this.engine.gameManager.subtractLives(1);
    }
    draw(ctx) {
        ctx.save();
        ctx.lineWidth = 0.5;
        ctx.font = '24px Comfortaa';
        ctx.strokeStyle = '#444';
        this.metrics = ctx.measureText(this.text);
        ctx.lineWidth = 2;
        ctx.strokeText(this.text, this.progress * window.innerWidth, this.posY * window.innerHeight);
        ctx.fillStyle = '#fff';
        ctx.fillText(this.text, this.progress * window.innerWidth, this.posY * window.innerHeight);
        if (this.engine.settings.get('typingHighlight'))
            if (this.text === this.engine.promptManager.currentText) {
                const color = this.engine.settings.get('typingMatchColor');
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.strokeText(this.engine.promptManager.currentText, this.progress * window.innerWidth, this.posY * window.innerHeight);
                ctx.fillText(this.engine.promptManager.currentText, this.progress * window.innerWidth, this.posY * window.innerHeight);
            }
            else if (this.text.startsWith(this.engine.promptManager.currentText)) {
                const color = this.engine.settings.get('typingHighlightColor');
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.strokeText(this.engine.promptManager.currentText, this.progress * window.innerWidth, this.posY * window.innerHeight);
                ctx.fillText(this.engine.promptManager.currentText, this.progress * window.innerWidth, this.posY * window.innerHeight);
            }
        ctx.restore();
    }
    submit(value) {
        if (value === this.text) {
            this.destroy();
            this.engine.gameManager.addScore(this.text.length);
            return true;
        }
        return false;
    }
    destroy() {
        this.isDestroyed = true;
        const amountOfPatricles = 25;
        for (let i = 0; i < amountOfPatricles; i++) {
            const particle = new PixelParticle({
                posX: this.progress * window.innerWidth +
                    this.metrics.actualBoundingBoxRight / 2,
                posY: this.posY * window.innerHeight - 8,
                angle: (360 / amountOfPatricles) * i,
                color: '#af6a',
                size: 3 + Math.random() * 3,
                lifeTime: 200,
                speed: 4,
            });
            this.engine.backgroundManager.addParticle(particle);
        }
    }
}
