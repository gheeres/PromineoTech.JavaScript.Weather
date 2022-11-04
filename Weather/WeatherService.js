import Settings from './Settings.js';
import fetch from 'node-fetch';
import Weather from './Weather.js';

/**
 * OpenWeatherMap Implementation of the current weather API.
 */
class WeatherService {
  #baseUrl;
  #apikey;

  /**
   * Creates an instance of the WeatherService
   * @param {String} apikey The API key to use for connection.
   * @param {String} baseUrl The base url for the service. If not provided, then uses the configured default.
   */
  constructor(apikey, baseUrl) {
    if (! apikey) {
      throw new Error('Weather service requires a valid API key. Signup for one at: http://openweathermap.org');
    }
    this.#apikey = apikey;
    this.#baseUrl = baseUrl || Settings.baseUrl;
  }

  /**
   * Retrieves the current weather reading for the location.
   * @param {String} zipcode The postal zipcode
   * @returns A promise containing the resolved weather data.
   */  
  async getCurrentWeather(zipcode) {
    const url = `${this.#baseUrl}?zip=${zipcode}&units=imperial&appid=${this.#apikey}`;
    console.log(`Requesting weather from ${url} ...`);

    return await fetch(url).then((res) => {
      return res.json().then((weather) => {
        // console.log(weather);
        return new Weather(weather.dt, weather.main.temp);
      });
    });
  }
}

export default WeatherService;