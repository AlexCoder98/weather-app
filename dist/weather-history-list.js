var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "./decorators/autobind.js";
class WeatherHistoryList {
    constructor() {
        this.results = [];
        this.emptyHistoryH3 = document.querySelector('.empty-history');
        this.recentResults = document.querySelector('.results-container');
        this.clearHistoryBtn = document.querySelector('.clear-history');
        this.clearHistoryBtn.addEventListener('click', this.clearHistoryList);
    }
    deleteHistoryResult(index, results) {
        const indexToRemove = results[index];
        indexToRemove.remove();
        this.results.splice(indexToRemove, 1);
        if (this.results.length === 0) {
            this.clearHistoryBtn.style.display = 'none';
            this.emptyHistoryH3.style.display = 'block';
        }
    }
    displayHistoryList() {
        this.results.splice(5);
        this.emptyHistoryH3.style.display = 'none';
        if (this.results.length >= 1) {
            this.recentResults.innerHTML = '';
            this.clearHistoryBtn.style.display = 'block';
        }
        for (const recentResult of this.results) {
            const recentResultDiv = document.createElement('div');
            const resultID = (this.results.indexOf(recentResult)).toString();
            recentResultDiv.setAttribute('data-id', resultID);
            recentResultDiv.setAttribute('class', 'recent-result');
            recentResultDiv.innerHTML = (`
                <div class="data-container">
                <div class="recent-result-header">
                <p class="date">${recentResult.date}</p>
                </div>
                <div class="recent-result-body">
                <h3 class="location"><span class="city">${recentResult.cityName}</span>, <span class="symbol">${recentResult.countrySymbol}</span></h3>
                <p class="weather-desc">${recentResult.weatherDescription}</p>
                </div>
                <div class="recent-result-footer">
                <p class="temperature"><span class="curr-temp">${recentResult.temperature} &#8451</span>, feels like: <span class="feels-like">${recentResult.tempFeelsLike} &#8451</span></p>
                </div>
                </div>
                <div class="delete-btn-container">
                <button class="delete">X</button>
                </div>
                `);
            this.recentResults.appendChild(recentResultDiv);
        }
        const results = [...this.recentResults.children];
        const btns = [...document.querySelectorAll('.delete')];
        btns.forEach((btn, index) => {
            btn.addEventListener('click', () => this.deleteHistoryResult(index, results));
        });
    }
    clearHistoryList() {
        this.recentResults.innerHTML = '';
        this.results = [];
        this.clearHistoryBtn.style.display = 'none';
        this.emptyHistoryH3.style.display = 'block';
    }
    addResultToTheList(result) {
        this.results.unshift(result);
        this.displayHistoryList();
    }
}
__decorate([
    autobind
], WeatherHistoryList.prototype, "clearHistoryList", null);
export const weatherHistoryList = new WeatherHistoryList();
