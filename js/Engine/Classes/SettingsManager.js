import { propertyDefaults } from '../Config/SettingProperties.js';
export default class SettingsManager {
    engine;
    defaults;
    settings;
    constructor(engineRef) {
        this.engine = engineRef;
        this.defaults = Object.freeze(propertyDefaults);
        this.settings = new Map();
        this.load();
    }
    save() {
        const rawSettings = JSON.stringify([...this.settings]);
        try {
            localStorage.setItem('SpaceTyperUserSettings', rawSettings);
        }
        catch (error) {
            console.error('Error while trying to save settings');
        }
    }
    load() {
        let localStorageData;
        try {
            localStorageData = localStorage.getItem('SpaceTyperUserSettings');
        }
        catch (error) {
            console.error('Error while trying to load settings \n', error);
        }
        if (localStorageData) {
            const rawSettings = JSON.parse(localStorageData);
            rawSettings.forEach(([key, value]) => {
                this.settings.set(key, value);
            });
        }
    }
    get(key) {
        return this.settings.has(key) ? this.settings.get(key) : this.defaults[key];
    }
    set(key, value) {
        if (value === this.defaults[key]) {
            this.settings.delete(key);
        }
        else {
            this.settings.set(key, value);
        }
        this.save();
        this.emitOnChangeEvent(key);
    }
    toggle(key) {
        const value = this.get(key);
        this.set(key, !value);
    }
    reset(key) {
        this.settings.delete(key);
        this.save();
        this.emitOnChangeEvent(key);
    }
    resetAll() {
        this.settings.clear();
        this.save();
        this.emitOnChangeEvent('*');
    }
    defaultValue(key) {
        return this.defaults[key];
    }
    emitOnChangeEvent(key) {
        const event = new CustomEvent('settingsChange', { detail: key });
        window.dispatchEvent(event);
    }
}
//# sourceMappingURL=SettingsManager.js.map