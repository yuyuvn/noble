/* eslint-disable no-console */
const events = require('events');

const PizzaCrust = {
  NORMAL:    0,
  DEEP_DISH: 1,
  THIN:      2,
};

const PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

const PizzaBakeResult = {
  HALF_BAKED: 0,
  BAKED:      1,
  CRISPY:     2,
  BURNT:      3,
  ON_FIRE:    4
};

class Pizza extends events.EventEmitter {
  constructor() {
    super();
    this.toppings = PizzaToppings.NONE;
    this.crust = PizzaCrust.NORMAL;
  }

  bake(temperature) {
    const time = temperature * 10;
    console.log('baking pizza at', temperature, 'degrees for', time, 'milliseconds');
    setTimeout(() => {
      const result =
        (temperature < 350) ? PizzaBakeResult.HALF_BAKED:
        (temperature < 450) ? PizzaBakeResult.BAKED:
        (temperature < 500) ? PizzaBakeResult.CRISPY:
        (temperature < 600) ? PizzaBakeResult.BURNT:
        PizzaBakeResult.ON_FIRE;
      this.emit('ready', result);
    }, time);
  }
}

module.exports.Pizza = Pizza;
module.exports.PizzaToppings = PizzaToppings;
module.exports.PizzaCrust = PizzaCrust;
module.exports.PizzaBakeResult = PizzaBakeResult;
