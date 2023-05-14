class FiveDayForecast {
    constructor() {
        this.locationTitle = (document.querySelector('.location-title'));
        this.forecastContainer = (document.querySelector('.three-hour-step-forecast'));
        this.tempArray = [];
    }
    displayFiveDayForecastData(data) {
        console.log(data);
        document.querySelector('.no-results-yet').style.display = 'none';
        this.locationTitle.innerHTML = `
        <span class="location-name">${data.city.name}</span>,<span class="country-code">${data.city.country}</span>
        `;
        if (this.tempArray.length > 0) {
            this.tempArray.forEach(child => {
                this.forecastContainer.removeChild(child);
            });
            this.tempArray = [];
        }
        const forecastList = data.list;
        console.log(forecastList);
        for (const forecast of forecastList) {
            const date = new Date(forecast.dt_txt);
            const forecastCard = document.createElement('div');
            forecastCard.innerHTML = `
                <header class="card-header">
                <h4 class="date">${date}</h4>
                <p class="conditions">${forecast.weather[0].main}</p>
                </header>
                <main class="card-body">
                <div class="temperature-conditions">
                <p class="t">Temperature: ${forecast.main.temp}</p>
                <p class="t-feels-like">Temperature: ${forecast.main.feels_like}</p>
                </div>
                </main>
                <footer class="card-footer">
                <p class="humidity">${forecast.main.humidity}</p>
                <p class="pressure">${forecast.main.pressure}</p>
                <p class="sea-level">${forecast.main.sea_level}</p>
                </footer>
                `;
            this.tempArray.push(forecastCard);
            this.forecastContainer.append(forecastCard);
        }
        console.log(this.tempArray);
    }
}
export const fiveDayForecast = new FiveDayForecast();
