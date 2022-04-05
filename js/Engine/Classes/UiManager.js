import { millisToMinutesAndSeconds } from '../../Utils/utils.js';
import HowtoplayModalManager from './modals/HowtoplayModalManager.js';
import SettingsModalManager from './modals/SettingsModal.js';
export default class UiManager {
    engine;
    howtoplayModal;
    settingsModal;
    elements;
    modalBgEl;
    constructor(engineRef) {
        this.engine = engineRef;
        this.howtoplayModal = new HowtoplayModalManager(this.engine);
        this.settingsModal = new SettingsModalManager(this.engine);
        this.elements = new Map();
        this.loadElements();
        this.reRenderAll();
        this.loadActionButtons();
        this.modalBgEl = document.querySelector('.modal_background');
    }
    loadElements() {
        //Time
        const timeEl = document.querySelector('div[link="time"]');
        const timeLink = new UIelement(timeEl, () => millisToMinutesAndSeconds(this.engine.gameManager.time));
        this.elements.set('time', timeLink);
        //Score
        const scoreEl = document.querySelector('div[link="score"]');
        const scoreLink = new UIelement(scoreEl, () => this.engine.gameManager.score);
        this.elements.set('score', scoreLink);
        //Lives
        const livesEl = document.querySelector('div[link="lives"]');
        const livesLink = new UIelement(livesEl, () => this.engine.gameManager.lives);
        this.elements.set('lives', livesLink);
    }
    loadActionButtons() {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('action');
                if (action)
                    this.dispatchButtonAction(action);
                else {
                    console.error(button, '\nis missing an action attribute');
                }
            });
        });
    }
    reRender(key) {
        if (this.elements.has(key))
            this.elements.get(key)?.update();
        else
            throw Error('Trying to update unknown element: ' + key);
    }
    reRenderAll() {
        for (const [key, element] of this.elements)
            element.update();
    }
    switchModal(name = 'none') {
        //Pause prompt if modal is open
        if (name !== 'none')
            this.engine.promptManager.setPause(true);
        else
            this.engine.promptManager.setPause(false);
        this.modalBgEl.setAttribute('display', name);
    }
    dispatchButtonAction(action) {
        //With parameter
        if (action.startsWith('modal_')) {
            const name = action.split('_')[1];
            if (this.engine.settings.get('pauseGameOnModalOpen') && name !== 'none')
                this.engine.pause();
            return this.switchModal(name);
        }
        if (action.startsWith('howtoplay_page')) {
            const pageId = Number(action.match(/\d+/));
            return this.howtoplayModal.switchPage(pageId);
        }
        //Normal actions
        switch (action) {
            case 'goto_github':
                window.open('https://github.com');
                break;
            case 'howtoplay_next':
                this.howtoplayModal.nextPage();
                break;
            case 'howtoplay_prev':
                this.howtoplayModal.prevPage();
                break;
            case 'reset_all_settings':
                this.engine.settings.resetAll();
                break;
            default:
                console.log('Unhandled action:', action);
                break;
        }
    }
}
class UIelement {
    element;
    value;
    constructor(element, valueRef) {
        this.element = element;
        this.value = valueRef;
    }
    update() {
        const value = String(this.value());
        if (value === this.element.innerHTML)
            return;
        this.element.innerHTML = value;
    }
}
//# sourceMappingURL=UiManager.js.map