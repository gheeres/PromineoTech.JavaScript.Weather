import Menu from "./Menu.js";
import Location from './Location.js';
import WeatherService from "./WeatherService.js";
import Settings from './Settings.js';

class Application {
  #menu;
  #locations = [];
  #service;

  constructor() {
    this.#menu = new Menu();
    this.#service = new WeatherService(Settings.apikey, Settings.baseUrl);
    this.#locations = [
      new Location('54481', 'Stevens Point, WI'),
      new Location('85301', 'Glendale, AZ'),
      new Location('85387', 'Surprise, AZ'),
      new Location('53964', 'Westfield, WI'),
    ];
  }

  async start() {
    let selection;
    while (selection = await this.#menu.getMainMenuSelection(this.#locations)) {
      console.log();

      switch(selection) {
        // Add new Location
        case 1:
          await this.addLocation();
          break;
        // Display locations.
        case 2:
          this.displayLocations();
          break;
        // Get current weather
        case 3:
          await this.getCurrentWeatherForLocation();
          break;
        case 4:
          let selectedLocation = await this.#menu.selectLocation(this.#locations);
          if (selectedLocation) {
            this.#locations = this.#locations.filter((location) => {
              return location !== selectedLocation;
            });
          }
          break;
      }

      console.log();
    }
    process.exit();
  }

  async addLocation() {
    let location = await this.#menu.getLocation();
    if (location) {
      this.#locations.push(location);
    }
  }

  displayLocations() {
    console.log(`Locations: (${ this.#locations.length })`);
    for(let location of this.#locations) {
      console.log(`  ${ location }`);
    }
  }

  async getCurrentWeatherForLocation() {
    let location = await this.#menu.selectLocation(this.#locations);
    if (location) {
      console.log();

      let weather = await this.#service.getCurrentWeather(location.zipcode);
      if (weather) {
        location.add(weather);
        console.log(`  ${ location }`);
      }
    }
  }
}

export default Application;