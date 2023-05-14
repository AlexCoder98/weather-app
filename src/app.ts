import { avaliableLanguages } from "./helpers/languages.js";
import SearchWeather from "./search-weather.js";
import { WeatherApp } from "./interfaces/weather-app.js";
import { autobind } from "./decorators/autobind.js";

class WelcomeToWeatherApp implements WeatherApp {
    language: string;

    constructor() {
        this.language = '';
        const selectLanguageOptions = document.getElementById('select-country')! as HTMLSelectElement;
        const btnContinue = document.querySelector('.btn-continue')! as HTMLButtonElement;

        for (const lang of avaliableLanguages) {
            const option = document.createElement('option');
            option.setAttribute('value', lang.short);
            option.textContent = lang.long;
            selectLanguageOptions.appendChild(option);
        }

        selectLanguageOptions.addEventListener('change', this.selectLanguage);
        btnContinue.addEventListener('click', this.enterToTheApp);
    }

    @autobind
    selectLanguage(event: Event) {
        const targetValue = (event.target as HTMLSelectElement).value;
        this.language = targetValue;
        return this.language;
    }

    @autobind
    enterToTheApp() {
        if (this.language) {
            (document.querySelector('.pop-up')! as HTMLDivElement).classList.add('disabled');
            new SearchWeather(this.language);
        } else {
            alert('Select your language and go! :)')
        }
    }
}
new WelcomeToWeatherApp();
