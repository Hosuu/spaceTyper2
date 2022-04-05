export default class BaseParticle {
    isDead;
    posX;
    posY;
    speed;
    angle;
    lifespan;
    constructor(properties) {
        this.isDead = false;
        this.posX = properties.posX;
        this.posY = properties.posY;
        this.speed = properties.speed ?? 1;
        this.angle = properties.angle ?? Math.random() * 360;
        this.lifespan = 0;
    }
    update(dt) {
        this.posX += this.speed * Math.cos(this.angle);
        this.posY += this.speed * Math.sin(this.angle);
        this.lifespan += dt;
    }
}
//# sourceMappingURL=BaseParticle.js.map