import { settingsStructure } from '../../Config/SettingsModalStructure.js';
export default class SettingsModalManager {
    engine;
    elements;
    constructor(engineRef) {
        this.engine = engineRef;
        this.elements = new Map();
        //Settings property update sync
        window.addEventListener('settingsChange', (e) => {
            const { detail: value } = e;
            this.settingsChangeHandler(value);
        });
        this.initalizeSettings();
        this.reRenderAll();
    }
    initalizeSettings() {
        const SETTINGS_CONTAINER = document.querySelector('.setting_properties');
        SETTINGS_CONTAINER.innerHTML = '';
        for (const property of settingsStructure) {
            if (typeof property === 'object') {
                const propertyElement = property.type === 'checkbox'
                    ? new BoolPropertyElement(this.engine, property)
                    : new GeneralPropertyElement(this.engine, property);
                this.elements.set(property.key, propertyElement);
                SETTINGS_CONTAINER.appendChild(propertyElement.container);
            }
            else if (typeof property === 'string') {
                const label = document.createElement('div');
                label.innerHTML = property;
                label.classList.add('modal_label');
                SETTINGS_CONTAINER.appendChild(label);
                const separator = document.createElement('div');
                separator.classList.add('modal_separator');
                SETTINGS_CONTAINER.appendChild(separator);
            }
        }
    }
    settingsChangeHandler(key) {
        if (key === '*') {
            console.log('resseting all settings');
            return this.reRenderAll();
        }
        this.reRender(key);
    }
    reRender(key) {
        this.elements.get(key)?.update();
    }
    reRenderAll() {
        for (const [key, element] of this.elements)
            element.update();
    }
}
class PropertyElement {
    container;
    key;
    inputEl;
    constructor(property) {
        this.key = property.key;
        const container = document.createElement('div');
        if (property.desc)
            container.setAttribute('desc', property.desc);
        container.classList.add('settings_property');
        const nameEl = document.createElement('div');
        nameEl.classList.add('property_name');
        nameEl.innerHTML = property.name;
        container.appendChild(nameEl);
        this.container = container;
    }
}
class BoolPropertyElement extends PropertyElement {
    engine;
    constructor(engineRef, property) {
        super(property);
        this.engine = engineRef;
        const inputEl = document.createElement('input');
        this.inputEl = inputEl;
        inputEl.setAttribute('type', 'checkbox');
        inputEl.classList.add('property_value');
        inputEl.addEventListener('change', (e) => {
            this.engine.settings.set(this.key, inputEl.checked);
        });
        this.container.appendChild(inputEl);
    }
    update() {
        this.inputEl.checked = Boolean(this.engine.settings.get(this.key));
    }
}
class GeneralPropertyElement extends PropertyElement {
    engine;
    constructor(engineRef, property) {
        super(property);
        this.engine = engineRef;
        const inputEl = document.createElement('input');
        this.inputEl = inputEl;
        inputEl.setAttribute('type', property.type);
        inputEl.classList.add('property_value');
        if (property.type === 'text') {
            inputEl.setAttribute('placeholder', String(this.engine.settings.defaultValue(this.key)));
            inputEl.setAttribute('spellcheck', 'false');
        }
        inputEl.addEventListener('change', (e) => {
            if (inputEl.value === '')
                this.engine.settings.reset(this.key);
            else
                this.engine.settings.set(this.key, inputEl.value);
        });
        this.container.appendChild(inputEl);
    }
    update() {
        this.inputEl.value = String(this.engine.settings.get(this.key));
    }
}
//# sourceMappingURL=SettingsModal.js.map