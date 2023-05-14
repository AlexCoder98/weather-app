import { ExtendedWeatherData, ShortenWeatherData } from "./interfaces/weather-data.js";
import { ThreeHourStepForecast } from './interfaces/three-hour-step-forecast-interface.js';
import { WeatherData } from "./interfaces/weather-data-object.js";
import { currentResult } from "./current-result.js";
import { weatherHistoryList } from "./weather-history-list.js";
import { threeHourForecast } from "./three-hour-step-forecast.js";

export default class SearchWeather {
    private key: string;
    private inputCheckbox: HTMLInputElement;

    constructor(public language: string) {
        this.key = 'e6f7a38c8e43bb7d6a3fae618b0c5ab0';
        this.inputCheckbox = document.getElementById('three-hour-step-forecast')! as HTMLInputElement;
        const inputSearch = document.getElementById('search-for-location')! as HTMLInputElement;
        const btnSearchCurrentWeather = document.querySelector('.search-btn')! as HTMLButtonElement;

        btnSearchCurrentWeather.addEventListener('click', () => this.searchCurrentWeather(inputSearch.value));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.searchCurrentWeather(inputSearch.value);
        });
    }

    private getWeatherURL(inputValue: string) {
        const trimmedInputValue = inputValue.trim().toLowerCase();
        let url;
        if (this.inputCheckbox.checked) {
            url = `https://api.openweathermap.org/data/2.5/forecast?&q=${trimmedInputValue}&lang=${this.language}&cnt=5&appid=${this.key}&units=metric`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedInputValue}&lang=${this.language}&appid=${this.key}&units=metric`;
        }
        return url;
    }

    private async getAPIResponseData(inputValue: string): Promise<WeatherData | ThreeHourStepForecast | undefined | void> {
        if (inputValue !== '') {
            const url = this.getWeatherURL(inputValue);
            const response = await fetch(url as string);
            return await response.json();
        } else {
            return alert('Empty input!');
        }
    }

    async searchCurrentWeather(inputValue: string) {
        const data = await this.getAPIResponseData(inputValue);
        if (typeof data !== "undefined") {
            if (!this.inputCheckbox.checked) {
                const normalForecastData = data as WeatherData;

                const extendedWeather: ExtendedWeatherData = {
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
                }
                const shortenWeather: ShortenWeatherData = {
                    cityName: normalForecastData.name,
                    countrySymbol: normalForecastData.sys.country,
                    date: new Date().toLocaleString(),
                    weatherDescription: normalForecastData.weather[0].main,
                    temperature: normalForecastData.main.temp,
                    tempFeelsLike: normalForecastData.main.feels_like,
                }
                currentResult.displayCurrentWeather(extendedWeather);
                weatherHistoryList.addResultToTheList(shortenWeather);
            } else {
                console.log('Checkbox is selected!');
                const fiveDayForecastData = data as ThreeHourStepForecast;
                threeHourForecast.displayThreeHourStepForecast(fiveDayForecastData);
            }
        }
        (document.querySelector('#search-for-location')! as HTMLInputElement).value = '';
    }
}


