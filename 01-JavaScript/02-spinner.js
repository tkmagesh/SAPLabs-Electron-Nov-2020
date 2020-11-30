var spinner = (function(){
    var counter = 0;
    
    function up(){
        return ++counter;
    }

    function down(){
        return --counter;
    }

    return {
        up : up,
        down : down
    }
})();

function Spinner(){
    var counter = 0;

    this.up = function up() {
        return ++counter;
    };

    this.down = function down() {
        return --counter;
    };
}

function Spinner() {
    this.__counter__ = 0;
}

Spinner.prototype.up = function up() {
    return ++this.__counter__;
};

Spinner.prototype.down = function down() {
    return --this.__counter__;
};

class Spinner{
    counter = 0;

    up(){
        return ++this.counter;
    }

    down(){
        return --this.counter;
    }
}


var Spinner = (function(){
    var counterSymbol = Symbol();

    class Spinner {
        
        constructor(){
            this[counterSymbol] = 0;
        }

        up() {
            return ++this[counterSymbol];
        }

        down() {
            return --this[counterSymbol];
        }
    }

    return Spinner;
})();

/* 
up() 
down()
*/

spinner.up() // => 1
spinner.up() // => 2
spinner.up() // => 3

spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1


//The following should not be possible
counter = 1000
spinner.up()

spinner.counter = 1000
spinner.up()
