/* 
const moduleObj = require('./calculator');

//const calculator = moduleObj.calculator;
const { calculator } = moduleObj;
 */

const { calculator , greeter } = require('./calculator');
const chalk = require('chalk');
const http = require('http');

/* 
console.log(chalk.red.underline(greeter('Magesh')));

const x = 100,
    y = 200;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y)); 
*/

const server = http.createServer((req, res) => {
    res.write('Hi there, Welcome to exciting world of node.js!');
    res.end();
})

server.listen(8080);

server.on('listening', () => {
    console.log('server listening on port 8080...!', );
})

