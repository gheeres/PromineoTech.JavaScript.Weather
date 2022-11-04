class Circle {
  static get PI() { return 3.14159; };
  #radius;
  // get - reads value
  get radius() {
    return this.#radius;
  }
  // set - writes value
  set radius(radius) {
    if (radius === 0) {
      throw new Error("You can't have an infinite circle... Radius must be greater than 0");
    }
    this.#radius = radius;
  }
  #color = 'Black';

  /**
   * Creates an instance of the Circle class.
   * @param {Number} radius The distance from the center to the outside of the circle.
   */
  constructor(radius) {
    this.radius = radius;
  }

  /**
   * Calculates the are of the circle.
   * @returns The area occupied by the circle.
   */
  getArea() {
    // return Circle.PI * this.radius * this.radius;
    return Circle.getArea(this.radius);
  }

  /**
   * Calculates the are of the circle.
   * @param {Number} radius The distance from the center to outside edge of circle.
   * @returns The area occupied by the circle.
   */
  static getArea(radius) {
    return Circle.PI * radius * radius;
  }

  /**
   * Calculates the width across the circle.
   * @returns The diameter
   */
  getDiameter() {
    return this.radius * 2;
  }

  /**
   * Calculates the distance around the circle.
   * @returns The distance around the outside of the circle.
   */
  getCircumference() {
    return 2 * Circle.PI * this.radius;
  }

  toString() {
    return `[Circle(r=${ this.radius })] area: ${ this.getArea() }`;
  }
}

let circle = new Circle(10);
circle.color = 'Red';
circle.rolling = true;
//circle.radius = 0;

console.log(circle);

//let circle1 = new Circle(10);
//console.log(circle1); // [object Object]
//console.log(`The circle has a radius of ${circle1.radius}.`);
/*
console.log(Circle.PI);

let circles = [ new Circle(1), new Circle(2), new Circle(4) ];
for(let circle of circles) {
  //console.log(circle);
  console.log('Circle: ' + circle);
  //console.log(`Radius: ${circle.radius}, Area: ${ circle.getArea() }`);
  //console.log(`  Diameter: ${ circle.getDiameter() }, Circumference: ${ circle.getCircumference() }`);
}
console.log('-----------------------------------------------');

for(let index = 10; index < 100; index+=2) {
  circles.push(new Circle(index));
}
circles.forEach((circle,index) => {
  console.log(`[${ index }] ${ circle }`);
});
console.log('-----------------------------------------------');

console.log('Area of 50R circle is ' + Circle.getArea(50))
*/