import { autobind } from "./decorators/autobind.js";
import { ExtendedWeatherData } from "./interfaces/weather-data.js";

class CurrentResult {
    cityName: HTMLSpanElement;
    countrySymbol: HTMLSpanElement;
    weatherIcon: HTMLImageElement;
    temperature: HTMLHeadingElement;
    weatherDescription: HTMLParagraphElement;
    tempFrom: HTMLSpanElement;
    tempTo: HTMLSpanElement;
    tempFeelsLike: HTMLSpanElement;
    moreWeatherDetailsContainer: HTMLDivElement;
    showMoreWeatherInfoBtn: HTMLButtonElement;

    constructor() {
        this.cityName = document.querySelector('.city-name')! as HTMLSpanElement;
        this.countrySymbol = document.querySelector('.country-symbol')! as HTMLSpanElement;
        this.temperature = document.querySelector('.temp')! as HTMLHeadingElement;
        this.weatherDescription = document.querySelector('.weather-description')! as HTMLParagraphElement;
        this.weatherIcon = document.querySelector('.img-wrapper .icon')! as HTMLImageElement;
        this.tempFrom = document.querySelector('.temp-range-container .from')! as HTMLSpanElement;
        this.tempTo = document.querySelector('.temp-range-container .to')! as HTMLSpanElement;
        this.tempFeelsLike = document.querySelector('.temp-range-container .feels-like')! as HTMLSpanElement;
        this.moreWeatherDetailsContainer = document.querySelector('.more-weather-details')! as HTMLDivElement;
        this.showMoreWeatherInfoBtn = (document.querySelector('.more-details')! as HTMLButtonElement);
        this.showMoreWeatherInfoBtn.addEventListener('click', this.showAdditionalWeatherDetails);
    }

    private setWeatherIconCode(weatherID: number | boolean, weatherIconCode: string) {
        switch (weatherID) {
            case weatherID.toString().startsWith("2"): {
                weatherIconCode = '11d';
            }
                break;
            case weatherID.toString().startsWith("3") || weatherID.toString().startsWith("52"): {
                weatherIconCode = '09d';
            }
                break;
            case weatherID.toString().startsWith("50"): {
                weatherIconCode = '10d';
            }
                break;
            case weatherID.toString().startsWith("6") || weatherID.toString() === '511': {
                weatherIconCode = '13d';
            }
                break;
            case weatherID.toString().startsWith("7"): {
                weatherIconCode = '50d';
            }
                break;
            case weatherID.toString() === '800': {
                weatherIconCode = '01d' || '01n';
                break;
            }
            case weatherID.toString() === '801': {
                weatherIconCode = '02d' || '02n';
                break;
            }
            case weatherID.toString() === '802': {
                weatherIconCode = '03d' || '03n';
                break;
            }
            case weatherID.toString() === '803' || weatherID.toString() === '804': {
                weatherIconCode = '04d' || '04n';
                break;
            }
        }
        return weatherIconCode;
    }

    @autobind
    showAdditionalWeatherDetails() {
        this.moreWeatherDetailsContainer.classList.toggle('enabled');
        ((document.querySelector('.more-details .material-symbols-outlined'))! as HTMLSpanElement).classList.toggle('extended');
        ((document.querySelectorAll('.more-weather-details > *'))!).forEach(p => {
            p.classList.toggle('extended');
        })
    }

    displayCurrentWeather(weatherData: ExtendedWeatherData) {
        (document.querySelector('.three-hour-step-forecast-container')! as HTMLDivElement).classList.add('disabled');
        (document.querySelector('.no-results-yet')! as HTMLHeadingElement).style.display = "none";
        if (weatherData) {
            const { weatherID, weatherIconCode, cityName, countrySymbol, temperature, weatherDescription, tempFrom, tempTo, tempFeelsLike, humidity, pressure, windSpeed, lat, lon } = weatherData;

            const iconCode = this.setWeatherIconCode(weatherID, weatherIconCode);
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

            this.cityName.textContent = cityName;
            this.countrySymbol.textContent = (countrySymbol).toUpperCase();
            this.weatherIcon.setAttribute('src', iconURL);
            this.temperature.innerHTML = `${temperature}&#8451`;
            this.weatherDescription.textContent = weatherDescription;
            this.tempFrom.innerHTML = `${tempFrom} &#8451`;
            this.tempTo.innerHTML = `${tempTo} &#8451`;
            this.tempFeelsLike.innerHTML = `${tempFeelsLike} &#8451`;

            this.moreWeatherDetailsContainer.innerHTML = (
                `<p class="add-info">Coordinates: lat: <span class="lat">${lat.toFixed(2)}&#176;</span>, lon: <span class="lon">${lon.toFixed(2)}&#176;</span></p>
                <p class="add-info">Humidity: <span class="humidity">${humidity}%</span></p>
                <p class="add-info">Pressure: <span class="pressure">${pressure}Pa</span></p>
                <p class="add-info">Wind speed: <span class="wind-speed">${windSpeed}m/s</span></p>
               `
            )
        }
        (document.querySelector('.result')! as HTMLElement).classList.add('enabled');
    }
}

export const currentResult = new CurrentResult();
