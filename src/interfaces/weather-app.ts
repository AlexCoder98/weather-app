export interface WeatherApp {
    language: string;
    selectLanguage: (event: Event) => string;
    enterToTheApp: () => void;
}