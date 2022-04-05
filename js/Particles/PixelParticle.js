import BaseParticle from '../Engine/Classes/BaseParticle.js';
export default class PixelParticle extends BaseParticle {
    lifeTime;
    color;
    size;
    constructor(properties) {
        super(properties);
        this.lifeTime = properties.lifeTime ?? 500;
        this.color = properties.color ?? '#fff';
        this.size = properties.size ?? 3;
    }
    update(dt) {
        super.update(dt);
        if (this.lifespan > this.lifeTime)
            this.isDead = true;
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1 - this.lifespan / this.lifeTime;
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
        ctx.restore();
    }
}
//# sourceMappingURL=PixelParticle.js.map