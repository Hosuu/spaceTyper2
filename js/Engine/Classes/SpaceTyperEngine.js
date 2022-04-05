import BackgroundManager from './BackgroundManager.js';
import GameManager from './GameManager.js';
import PromptManager from './PromptManager.js';
import SettingsManager from './SettingsManager.js';
import UiManager from './UiManager.js';
export default class SpaceTyperEngine {
    //Engine modules
    settings;
    ui;
    promptManager;
    gameManager;
    backgroundManager;
    //GameLoop Variables
    lastUpdatetimeStamp;
    lastRequestedFrameId;
    gameAreaBoundaries;
    constructor() {
        //Init engine modules
        this.settings = new SettingsManager(this);
        this.promptManager = new PromptManager(this);
        this.gameManager = new GameManager(this);
        this.backgroundManager = new BackgroundManager(this);
        this.ui = new UiManager(this);
        //subscribe for DOM events
        window.addEventListener('blur', () => this.pause(true));
        window.addEventListener('focus', () => this.resume(true));
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        //Init main loop
        this.lastRequestedFrameId = window.requestAnimationFrame(this.mainLoop.bind(this)); //prettier-ignore
    }
    mainLoop(timeStamp) {
        const lastUpdate = this.lastUpdatetimeStamp || timeStamp;
        const dt = timeStamp - lastUpdate;
        this.gameManager.update(dt);
        this.backgroundManager.update(dt); //TODO move to offscreen rendering with own update clock
        this.lastUpdatetimeStamp = timeStamp;
        this.lastRequestedFrameId = window.requestAnimationFrame(this.mainLoop.bind(this)); //prettier-ignore
    }
    resizeCanvas() {
        const gameCanv = document.querySelector('#Game'); // prettier-ignore
        const bgCanv = document.querySelector('#Background'); // prettier-ignore
        const { innerWidth: width, innerHeight: height } = window;
        this.gameAreaBoundaries = {
            top: 64,
            bottom: height - 80,
            left: 0,
            right: width,
            width: width - 0,
            height: height - 80 - 64,
        };
        gameCanv.width = width;
        gameCanv.height = height;
        bgCanv.width = width;
        bgCanv.height = height;
    }
    resume(byFocusDetection) {
        if (byFocusDetection && !this.settings.get('resumeGameOnFocus'))
            return;
        this.lastUpdatetimeStamp = performance.now();
        window.cancelAnimationFrame(this.lastRequestedFrameId);
        this.lastRequestedFrameId = window.requestAnimationFrame(this.mainLoop.bind(this)); //prettier-ignore
    }
    pause(byFocusDetection) {
        if (byFocusDetection && !this.settings.get('pauseGameOnFocusLoss'))
            return;
        window.cancelAnimationFrame(this.lastRequestedFrameId);
        this.gameManager.clearCanvas();
        this.backgroundManager.clearCanvas();
        const ctx = this.gameManager.canvas.getContext('2d'); //prettier-ignore
        const { width, height } = ctx.canvas;
        ctx.save();
        ctx.font = '600 48px Comfortaa';
        ctx.fillStyle = '#fff';
        const metrics = ctx.measureText('Game is Paused');
        ctx.fillText('Game is Paused!', width / 2 - metrics.width / 2, height / 2);
        const text2 = this.settings.get('resumeGameOnFocus')
            ? 'focus window to resume the game'
            : "type 'resume' to resume the game";
        ctx.font = '24px Comfortaa';
        const metrics2 = ctx.measureText(text2);
        ctx.fillStyle = '#ccc';
        ctx.fillText(text2, width / 2 - metrics2.width / 2 + 8, //8 is fixing weird offset dont know why
        height / 2 + metrics.actualBoundingBoxAscent);
        ctx.restore();
    }
    get gameArea() {
        return this.gameAreaBoundaries;
    }
}
//# sourceMappingURL=SpaceTyperEngine.js.map