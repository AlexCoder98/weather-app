var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { avaliableLanguages } from "./helpers/languages.js";
import SearchWeather from "./search-weather.js";
import { autobind } from "./decorators/autobind.js";
class WelcomeToWeatherApp {
    constructor() {
        this.language = '';
        const selectLanguageOptions = document.getElementById('select-country');
        const btnContinue = document.querySelector('.btn-continue');
        for (const lang of avaliableLanguages) {
            const option = document.createElement('option');
            option.setAttribute('value', lang.short);
            option.textContent = lang.long;
            selectLanguageOptions.appendChild(option);
        }
        selectLanguageOptions.addEventListener('change', this.selectLanguage);
        btnContinue.addEventListener('click', this.enterToTheApp);
    }
    selectLanguage(event) {
        const targetValue = event.target.value;
        this.language = targetValue;
        return this.language;
    }
    enterToTheApp() {
        if (this.language) {
            document.querySelector('.pop-up').classList.add('disabled');
            new SearchWeather(this.language);
        }
        else {
            alert('Select your language and go! :)');
        }
    }
}
__decorate([
    autobind
], WelcomeToWeatherApp.prototype, "selectLanguage", null);
__decorate([
    autobind
], WelcomeToWeatherApp.prototype, "enterToTheApp", null);
new WelcomeToWeatherApp();
