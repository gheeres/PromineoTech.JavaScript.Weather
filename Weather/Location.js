class Location {
  zipcode;
  name;
  #weather = [];

  get weather() {
    if (this.#weather.length) {
      return this.#weather.reduce((previous, current) => {
        return (previous.timestamp < current.timestamp) ? previous : current;
      });
    }
    return null;
  };

  constructor(zipcode, name) {
    this.zipcode = zipcode;
    this.name = name;
  }

  add(weather) {
    if(weather) {
      this.#weather.push(weather);
    }
  }

  toString() {
    let name = `[${ this.zipcode }] ${ this.name }`;
    if (this.weather) {
      return `${ name } - ${ this.weather.temperature }F`;
    }
    return name;
  }
}

export default Location;