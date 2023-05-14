var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "./decorators/autobind.js";
class CurrentResult {
    constructor() {
        this.cityName = document.querySelector('.city-name');
        this.countrySymbol = document.querySelector('.country-symbol');
        this.temperature = document.querySelector('.temp');
        this.weatherDescription = document.querySelector('.weather-description');
        this.weatherIcon = document.querySelector('.img-wrapper .icon');
        this.tempFrom = document.querySelector('.temp-range-container .from');
        this.tempTo = document.querySelector('.temp-range-container .to');
        this.tempFeelsLike = document.querySelector('.temp-range-container .feels-like');
        this.moreWeatherDetailsContainer = document.querySelector('.more-weather-details');
        this.showMoreWeatherInfoBtn = document.querySelector('.more-details');
        this.showMoreWeatherInfoBtn.addEventListener('click', this.showAdditionalWeatherDetails);
    }
    setWeatherIconCode(weatherID, weatherIconCode) {
        switch (weatherID) {
            case weatherID.toString().startsWith("2"):
                {
                    weatherIconCode = '11d';
                }
                break;
            case weatherID.toString().startsWith("3") || weatherID.toString().startsWith("52"):
                {
                    weatherIconCode = '09d';
                }
                break;
            case weatherID.toString().startsWith("50"):
                {
                    weatherIconCode = '10d';
                }
                break;
            case weatherID.toString().startsWith("6") || weatherID.toString() === '511':
                {
                    weatherIconCode = '13d';
                }
                break;
            case weatherID.toString().startsWith("7"):
                {
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
    showAdditionalWeatherDetails() {
        this.moreWeatherDetailsContainer.classList.toggle('enabled');
        (document.querySelector('.more-details .material-symbols-outlined')).classList.toggle('extended');
        ((document.querySelectorAll('.more-weather-details > *'))).forEach(p => {
            p.classList.toggle('extended');
        });
    }
    displayCurrentWeather(weatherData) {
        document.querySelector('.three-hour-step-forecast-container').classList.add('disabled');
        document.querySelector('.no-results-yet').style.display = "none";
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
            this.moreWeatherDetailsContainer.innerHTML = (`<p class="add-info">Coordinates: lat: <span class="lat">${lat.toFixed(2)}&#176;</span>, lon: <span class="lon">${lon.toFixed(2)}&#176;</span></p>
                <p class="add-info">Humidity: <span class="humidity">${humidity}%</span></p>
                <p class="add-info">Pressure: <span class="pressure">${pressure}Pa</span></p>
                <p class="add-info">Wind speed: <span class="wind-speed">${windSpeed}m/s</span></p>
               `);
        }
        document.querySelector('.result').classList.add('enabled');
    }
}
__decorate([
    autobind
], CurrentResult.prototype, "showAdditionalWeatherDetails", null);
export const currentResult = new CurrentResult();
