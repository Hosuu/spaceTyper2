import { checkCollision, randomWord } from '../../Utils/utils.js';
import Word from '../../Words/Word.js';
import { COLLISION_CHECK_RADIUS } from '../Constants/gameVariables.js';
export default class GameManager {
    engine;
    canvas;
    words;
    timeElapsed;
    spawnDelay;
    _score;
    _combo;
    _lives;
    //prettier-ignore
    constructor(engineRef) {
        this.engine = engineRef;
        this.words = [];
        this.timeElapsed = 0;
        this.spawnDelay = 0;
        this._score = 0;
        this._combo = 0;
        this._lives = 10;
        const gameCanvas = document.querySelector('#Game');
        if (gameCanvas instanceof HTMLCanvasElement)
            this.canvas = gameCanvas;
        else
            throw Error("Can't reach canvas#Game in DOM");
    }
    get time() {
        return this.timeElapsed;
    }
    get score() {
        return this._score;
    }
    changeScore(value) {
        this._score += value;
        //TODO Maybe add some multipler
        this.engine.ui.reRender('score');
    }
    get combo() {
        return this._combo;
    }
    changeCombo(value) {
        this._combo += value;
        this.engine.ui.reRender('combo');
    }
    get lives() {
        return this._lives;
    }
    changeLives(value) {
        this._lives += value;
        this.engine.ui.reRender('lives');
    }
    update(dt) {
        this.spawnDelay += dt;
        this.timeElapsed += dt;
        this.engine.ui.reRender('time');
        //////////////////
        // FIXME SPAWN LOGIC
        if (this.spawnDelay >= 1000) {
            this.spawnDelay -= 1000;
            this.words.push(new Word(this.engine, randomWord()));
        }
        //////////////////
        this.words.reverse().forEach((word) => word.baseUpdate(dt)); // Updates words state
        this.clearDestroyedWords(); // Clear array from destroyed ones
        this.draw(); // Draw words on screen
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw Error('Cant');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //clear canvas
        //#region DEVONLY
        if (this.engine.settings.get('DEVdrawGameArea')) {
            ctx.strokeStyle = '#000';
            //CENTER VERTICAL
            ctx.beginPath();
            ctx.moveTo(ctx.canvas.width / 2, 0);
            ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
            ctx.stroke();
            //CENTER HORIZONTAL
            ctx.beginPath();
            ctx.moveTo(0, ctx.canvas.height / 2);
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
            ctx.stroke();
            ctx.strokeStyle = '#f00';
            //GAMEAREA BOUNDARIES
            ctx.beginPath();
            ctx.moveTo(this.engine.gameArea.left, this.engine.gameArea.top);
            ctx.lineTo(this.engine.gameArea.right, this.engine.gameArea.top);
            ctx.lineTo(this.engine.gameArea.right, this.engine.gameArea.bottom);
            ctx.lineTo(this.engine.gameArea.left, this.engine.gameArea.bottom);
            ctx.closePath();
            ctx.stroke();
        }
        //#endregion
        this.words.reverse().forEach((word) => word.baseDraw(ctx));
    }
    clearDestroyedWords() {
        this.words = this.words.filter((word) => word.isAlive);
    }
    clearCanvas() {
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw Error('Cant get context from canvas');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    submit(value) {
        if (value == 'pause')
            return this.engine.pause();
        if (value == 'resume')
            return this.engine.resume();
        const words = this.words.sort((a, b) => a.passed - b.passed).reverse();
        let didHit = false;
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word.submit(value)) {
                didHit = true;
                break;
            }
        }
        if (didHit) {
            this._combo += 1;
        }
        else {
            this._combo = 0;
        }
    }
    getCollisions(word) {
        const neighbours = this.words
            .filter((w) => w != word)
            .filter((w) => {
            return (Math.sqrt((word.centerX - w.centerX) ** 2 + (word.centerY - w.centerY) ** 2) <
                COLLISION_CHECK_RADIUS);
        });
        return neighbours
            .filter((otherword) => checkCollision(word.boundaries, otherword.boundaries, this.engine.settings.get('collisionPadding')))
            .sort((a, b) => a.posX - b.posX);
    }
}
//# sourceMappingURL=GameManager.js.map