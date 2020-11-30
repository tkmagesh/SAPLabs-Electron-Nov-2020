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
