const calculator = {
  add(x, y) {
    return x + y;
  },
  subtract(x, y) {
    return x - y;
  },
  multiply(x, y) {
    return x * y;
  },
  divide(x, y) {
    return x / y;
  }
};

function greeter(name){
    return `Hi ${name}, Have a nice day!`
}

//module.exports = calculator;

//module.exports = { greeter, calculator }

module.exports['calculator'] = calculator;
module.exports['greeter'] = greeter;