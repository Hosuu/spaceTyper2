import BaseWord from '../Engine/Classes/BaseWord.js';
export default class Word extends BaseWord {
    constructor(engineRef, text) {
        super(engineRef, text);
    }
    update(dt) { }
    onPass() {
        this.engine.gameManager.changeLives(-1);
        this.isDestroyed = true;
    }
    draw(ctx) {
        ctx.font = `${this.engine.settings.get('rootFontSize') * this.fontScale}px ${this.engine.settings.get('rootFontFamily')}`;
        ctx.fillStyle = '#fff';
        ctx.fillText(this.text, this.posX, this.posY);
        if (this.engine.settings.get('typingHighlight'))
            if (this.text === this.engine.promptManager.currentText) {
                ctx.fillStyle = this.engine.settings.get('typingMatchColor');
                ctx.fillText(this.engine.promptManager.currentText, this.posX, this.posY);
            }
            else if (this.text.startsWith(this.engine.promptManager.currentText)) {
                ctx.fillStyle = this.engine.settings.get('typingHighlightColor');
                ctx.fillText(this.engine.promptManager.currentText, this.posX, this.posY);
            }
    }
    submit(value) {
        if (value === this.text) {
            this.destroy();
            this.engine.gameManager.changeScore(this.text.length);
            return true;
        }
        return false;
    }
    destroy() {
        this.isDestroyed = true;
    }
}
//# sourceMappingURL=Word.js.map