var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { currentResult } from "./current-result.js";
import { weatherHistoryList } from "./weather-history-list.js";
import { threeHourForecast } from "./three-hour-step-forecast.js";
export default class SearchWeather {
    constructor(language) {
        this.language = language;
        this.key = 'e6f7a38c8e43bb7d6a3fae618b0c5ab0';
        this.inputCheckbox = document.getElementById('three-hour-step-forecast');
        const inputSearch = document.getElementById('search-for-location');
        const btnSearchCurrentWeather = document.querySelector('.search-btn');
        btnSearchCurrentWeather.addEventListener('click', () => this.searchCurrentWeather(inputSearch.value));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                this.searchCurrentWeather(inputSearch.value);
        });
    }
    getWeatherURL(inputValue) {
        const trimmedInputValue = inputValue.trim().toLowerCase();
        let url;
        if (this.inputCheckbox.checked) {
            url = `https://api.openweathermap.org/data/2.5/forecast?&q=${trimmedInputValue}&lang=${this.language}&cnt=5&appid=${this.key}&units=metric`;
        }
        else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedInputValue}&lang=${this.language}&appid=${this.key}&units=metric`;
        }
        return url;
    }
    getAPIResponseData(inputValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (inputValue !== '') {
                const url = this.getWeatherURL(inputValue);
                const response = yield fetch(url);
                return yield response.json();
            }
            else {
                return alert('Empty input!');
            }
        });
    }
    searchCurrentWeather(inputValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAPIResponseData(inputValue);
            if (typeof data !== "undefined") {
                if (!this.inputCheckbox.checked) {
                    const normalForecastData = data;
                    const extendedWeather = {
                        cityName: normalForecastData.name,
                        countrySymbol: normalForecastData.sys.country,
                        weatherIconCode: normalForecastData.weather[0].icon,
                        temperature: normalForecastData.main.temp,
                        weatherDescription: normalForecastData.weather[0].description,
                        tempFrom: normalForecastData.main.temp_min,
                        tempTo: normalForecastData.main.temp_max,
                        tempFeelsLike: normalForecastData.main.feels_like,
                        weatherID: normalForecastData.weather[0].id,
                        lon: normalForecastData.coord.lon,
                        lat: normalForecastData.coord.lat,
                        humidity: normalForecastData.main.humidity,
                        pressure: normalForecastData.main.pressure,
                        windSpeed: normalForecastData.wind.speed,
                    };
                    const shortenWeather = {
                        cityName: normalForecastData.name,
                        countrySymbol: normalForecastData.sys.country,
                        date: new Date().toLocaleString(),
                        weatherDescription: normalForecastData.weather[0].main,
                        temperature: normalForecastData.main.temp,
                        tempFeelsLike: normalForecastData.main.feels_like,
                    };
                    currentResult.displayCurrentWeather(extendedWeather);
                    weatherHistoryList.addResultToTheList(shortenWeather);
                }
                else {
                    console.log('Checkbox is selected!');
                    const fiveDayForecastData = data;
                    threeHourForecast.displayThreeHourStepForecast(fiveDayForecastData);
                }
            }
            document.querySelector('#search-for-location').value = '';
        });
    }
}
