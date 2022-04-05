const SUBMIT_KEYS = ['Space', 'Enter'];
export default class PromptManager {
    engine;
    pormptTextElement;
    value;
    isStopped;
    constructor(engineRef) {
        this.engine = engineRef;
        this.isStopped = false;
        const promptEl = document.querySelector('#Prompt');
        if (promptEl instanceof HTMLDivElement)
            this.pormptTextElement = promptEl;
        else
            throw Error("Can't reach div#Prompt in DOM");
        this.value = [];
        //Keybaord input handler
        window.addEventListener('keydown', this.keyboardEventHandler.bind(this)); //prettier-ignore
    }
    get currentText() {
        return this.value.reduce((text, { char }) => (text += char), '');
    }
    setPause(state) {
        this.isStopped = state;
    }
    updateDOM() {
        this.pormptTextElement.innerHTML = this.currentText;
    }
    reset() {
        this.value = [];
        this.updateDOM();
    }
    keyboardEventHandler(event) {
        if (this.engine.settings.get('disableFunctionalKeys'))
            event.preventDefault();
        if (this.isStopped)
            return;
        const { code, key, timeStamp, repeat, ctrlKey } = event;
        //Submit checker
        if (!repeat && SUBMIT_KEYS.some((keyCode) => keyCode === code)) {
            this.submit(timeStamp);
            return;
        }
        //Backspace checker
        if (code === 'Backspace')
            return ctrlKey ? this.reset() : this.backspace();
        //Char key checker
        if (!repeat && key.length === 1)
            return this.registerKey(key, timeStamp);
    }
    submit(timeStamp) {
        if (this.value.length === 0)
            return;
        const value = this.currentText;
        const time = timeStamp - this.value[0].timeStamp;
        this.reset();
        this.engine.gameManager.submit(value);
        if (this.engine.settings.get('logSubmitTime'))
            console.log(`%cSubmitted '%c${value}%c' in %c${time.toFixed(1)}ms`, 'color: white;', 'color: orange; font-weight: bold; font-size: 1.25em; font-style: italic;', 'color: white;', 'color: orange; font-weight: bold;');
    }
    backspace() {
        this.value.pop();
        this.updateDOM();
    }
    registerKey(char, timeStamp) {
        this.value.push({ char, timeStamp });
        this.updateDOM();
    }
}
//# sourceMappingURL=PromptManager.js.map