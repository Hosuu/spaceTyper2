import { COLLISION_CHECK_RADIUS } from '../Constants/gameVariables.js';
export default class BaseWord {
    engine;
    text;
    progress;
    speed;
    posY;
    isDestroyed = false;
    fontScale = 1;
    textMetrics;
    colliding = false;
    //prettier-ignore
    constructor(engineRef, text) {
        this.engine = engineRef;
        this.text = text;
        this.textMetrics = this.measureText();
        this.progress = -(this.metrics.width / this.engine.gameArea.width);
        this.speed = 1;
        this.posY = this.engine.gameArea.top + this.engine.gameArea.height * Math.random();
        window.addEventListener('settingsChange', (e) => {
            const { detail: value } = e;
            if (value == "rootFontFamily" || value === "rootFontSize") {
                this.textMetrics = this.measureText();
            }
        });
    }
    baseUpdate(dt) {
        this.progress += this.speed * 0.00001 * dt;
        if (this.progress >= 1)
            this.onPass();
        if (this.posY - this.metrics.actualBoundingBoxAscent < this.engine.gameArea.top) {
            this.posY += dt * 0.01;
        }
        else if (this.posY + this.metrics.actualBoundingBoxDescent >
            this.engine.gameArea.bottom) {
            this.posY -= dt * 0.01;
        }
        if (this.engine.settings.get('collisionDetection')) {
            const colls = this.engine.gameManager.getCollisions(this);
            this.colliding = colls.length > 0;
            if (this.colliding) {
                if (colls[0].posY > this.posY)
                    this.posY -= dt * 0.01;
                else if (colls[0].posY < this.posY)
                    this.posY += dt * 0.01;
            }
        }
        this.update(dt);
    }
    baseDraw(ctx) {
        ctx.save();
        this.draw(ctx);
        if (this.engine.settings.get('DEVdrawWordBoundaries')) {
            ctx.strokeStyle = this.colliding ? '#f00a' : '#0ffa';
            ctx.beginPath();
            ctx.moveTo(this.boundaries.left, this.boundaries.top);
            ctx.lineTo(this.boundaries.right, this.boundaries.top);
            ctx.lineTo(this.boundaries.right, this.boundaries.bottom);
            ctx.lineTo(this.boundaries.left, this.boundaries.bottom);
            ctx.closePath();
            ctx.stroke();
            const padding = Number(this.engine.settings.get('collisionPadding'));
            ctx.strokeStyle = '#f0f6';
            ctx.beginPath();
            ctx.moveTo(this.boundaries.left - padding, this.boundaries.top - padding);
            ctx.lineTo(this.boundaries.right + padding, this.boundaries.top - padding);
            ctx.lineTo(this.boundaries.right + padding, this.boundaries.bottom + padding);
            ctx.lineTo(this.boundaries.left - padding, this.boundaries.bottom + padding);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = '#7777ff0a';
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, COLLISION_CHECK_RADIUS, 0, 2 * Math.PI);
            ctx.fill();
        }
        if (this.engine.settings.get('DEVshowTextOrigin')) {
            ctx.fillStyle = '#f0f';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, 5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        if (this.engine.settings.get('DEVshowTextCenter')) {
            ctx.fillStyle = '#f00';
            ctx.strokeStyle = '#000';
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, 4, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
    /** Word alive flag (not passed, not destroyed) */
    get isAlive() {
        return !this.isDestroyed;
    }
    /** Word passing progression */
    get passed() {
        return this.progress;
    }
    get posX() {
        return this.engine.gameArea.left + this.progress * this.engine.gameArea.width;
    }
    get centerX() {
        return this.posX + this.metrics.width / 2;
    }
    get centerY() {
        return this.posY - this.metrics.actualBoundingBoxAscent / 2;
    }
    get boundaries() {
        return {
            top: this.posY - this.metrics.actualBoundingBoxAscent,
            bottom: this.posY + this.metrics.actualBoundingBoxDescent,
            left: this.posX - this.metrics.actualBoundingBoxLeft,
            right: this.posX + this.metrics.actualBoundingBoxRight,
        };
    }
    get metrics() {
        return this.textMetrics;
    }
    measureText() {
        const ctx = this.engine.gameManager.canvas.getContext('2d'); //prettier-ignore
        ctx.save();
        ctx.font = `${this.engine.settings.get('rootFontSize') * this.fontScale}px ${this.engine.settings.get('rootFontFamily')}`; //prettier-ignore
        const value = ctx.measureText(this.text);
        ctx.restore();
        return value;
    }
}
//# sourceMappingURL=BaseWord.js.map