export interface ExtendedWeatherData {
    cityName: string;
    countrySymbol: string;
    weatherIconCode: string;
    temperature: number;
    weatherDescription: string;
    tempFrom: number;
    tempTo: number;
    tempFeelsLike: number;
    weatherID: number | boolean;
    lon: number;
    lat: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
}

export interface ShortenWeatherData {
    cityName: string;
    countrySymbol: string;
    date: string;
    weatherDescription: string;
    temperature: number;
    tempFeelsLike: number;
}

export interface FiveDayForecastData {
    cityName: string;
    countrySymbol: string;
    weatherDescription: string;
    days: Day[];
}

type Day = {
    date: string;
    temperature: string;
    temperatureFeelsLike: string;
    humidity: string;
    pressure: string;
    seaLevel: string;
}