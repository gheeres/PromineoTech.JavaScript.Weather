import Location from './Location.js';
import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Menu {
  displayMainMenu(locations) {
    console.log('Current Weather');
    console.log('  1.) Add Location');
    if (locations?.length) {
      console.log('  2.) Show Locations / Weather');
      console.log('  3.) Get Current Weather');
      console.log('  4.) Remove Location');
    }
  }

  async getMainMenuSelection(locations) {
    this.displayMainMenu(locations);
    let selection = await this.prompt('Menu> ');
    return parseInt(selection, 10);
  }

  async getLocation() {
    console.log('Add new location:');
    const name = await this.prompt('  Name: ');
    const zipcode = await this.prompt('  Zipcode: ');

    return new Location(zipcode, name);
  }

  async selectLocation(locations) {
    if (locations) {
      console.log('Select location:') ;
      locations.forEach((location,index) => {
        console.log(`  ${ index + 1 }.) [${ location.zipcode }] ${ location.name }`);
      });

      let selection = await this.prompt('Location> ');
      let index = parseInt(selection, 10);
      if ((index > 0) && ((index - 1) < locations.length)) {
        return locations[index - 1];
      }
    }
    return null;
  }

  async prompt(question) {
    return new Promise((resolve,reject) => {
      rl.question(question, resolve);
    });
  }
}

export default Menu;