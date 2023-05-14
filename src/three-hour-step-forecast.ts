import { ThreeHourStepForecast } from "./interfaces/three-hour-step-forecast-interface.js";

class ThreeHourForecast {
    locationTitle: HTMLHeadingElement;
    forecastContainer: HTMLDivElement;
    tempArray: HTMLDivElement[];

    constructor() {
        this.locationTitle = (document.querySelector('.location-title')!) as HTMLHeadingElement;
        this.forecastContainer = (document.querySelector('.three-hour-step-forecast')!) as HTMLDivElement;
        this.tempArray = [];
    }

    displayThreeHourStepForecast(data: ThreeHourStepForecast) {
        const container = document.querySelector('.three-hour-step-forecast-container')! as HTMLDivElement;

        if (container.classList.contains('disabled')) {
            container.classList.remove('disabled');
        }
        (document.querySelector('.no-results-yet')! as HTMLHeadingElement).style.display = 'none';

        this.locationTitle.innerHTML = `
        <span class="location-name">${data.city.name}</span>, <span class="country-code">${data.city.country}</span>
        `

        if (this.tempArray.length > 0) {
            this.tempArray.forEach(child => {
                this.forecastContainer.removeChild(child)
            });
            this.tempArray = [];
        }

        const forecastList = data.list;

        for (const forecast of forecastList) {

            const date = (new Date(forecast.dt_txt)).toUTCString().slice(0, 16);
            const time = (new Date(forecast.dt_txt)).toUTCString().slice(17, 26)

            const forecastCard = document.createElement('div');
            forecastCard.setAttribute('class', 'forecast-card');
            forecastCard.innerHTML = `
                <header class="card-header">
                <h4 class="date">${date}</h4>
                <p class="conditions-and-time">${time} - ${forecast.weather[0].main}</p>
                </header>
                <main class="card-body">
                <div class="temperature-conditions">
                <p class="t">${forecast.main.temp}&#8451</p>
                <p class="t-feels-like">feels like: ${forecast.main.feels_like}&#8451</p>
                </div>
                </main>
                <footer class="card-footer">
                <p class="humidity">Humidity: <strong>${forecast.main.humidity}%</strong></p>
                <p class="pressure">Pressure: <strong>${forecast.main.pressure}Pa</strong></p>
                <p class="sea-level">Sea level: <strong>${forecast.main.sea_level}m</strong></p>
                </footer>
                `
            this.tempArray.push(forecastCard);
            this.forecastContainer.append(forecastCard);
        }
        const currResult = document.querySelector('.result') as HTMLElement;
        if (currResult) {
            currResult.classList.remove('enabled');
        } else {
            alert('No current result yet!');
        }
    }

}

export const threeHourForecast = new ThreeHourForecast();