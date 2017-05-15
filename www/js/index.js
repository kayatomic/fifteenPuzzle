
var app = function() {

    var self = {};
    self.is_configured = false;

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function(v) {
        var k=0;
        v.map(function(e) {e._idx = k++;});
    };

    // Initializes an attribute of an array of objects.
    var set_array_attribute = function (v, attr, x) {
        v.map(function (e) {e[attr] = x;});
    };

    self.initialize = function () {
        document.addEventListener('deviceready', self.ondeviceready, false);
    };

    self.ondeviceready = function () {
        // This callback is called once Cordova has finished
        // its own initialization.
        console.log("The device is ready");
        $("#vue-div").show(); // This is jQuery.
        self.is_configured = true;
    };

    self.reset = function () {
        self.vue.board = [
            {1: 'red'},
            {2: 'white'},
            {3: 'red'},
            {4: 'white'},
            {5: 'white'},
            {6: 'red'},
            {7: 'white'},
            {8: 'red'},
            {9: 'red'},
            {10: 'white'},
            {11: 'red'},
            {12: 'white'},
            {13: 'white'},
            {14: 'red'},
            {15: 'white'},
            {0: 'black'},
        ];
    };

    // Checks if the black cell is adjacent, if true swaps the according cells
    self.shuffle = function(i, j) {
        // You need to implement this.
        if (self.vue.cellColor(i, j+1) == 'black'){
            self.vue.swap(4*i+j, 4*i+(j+1));
            // temp = self.vue.board[4*i+j];
            // Vue.set(self.vue.board, 4*i+j, self.vue.board[4*i+(j+1)]);
            // Vue.set(self.vue.board, 4*i+(j+1), temp);
            /* Store black cell in temp
            self.vue.temp1 = Object.keys(self.vue.board[4*i+(j+1)])[0];
            self.vue.temp2 = Object.values(self.vue.board[4*i+(j+1)])[0];
            //console.log(self.vue.temp1);
            //console.log(self.vue.temp2);
            console.log(self.vue.board[4*i+(j+1)][0]);
            
            // Store adjacent cell into black cell
            Object.keys(self.vue.board[4*i+(j+1)])[0] = Object.keys(self.vue.board[4*i+j])[0];
            Object.values(self.vue.board[4*i+(j+1)])[0] = Object.values(self.vue.board[4*i+j])[0];

            // Store temp cell into that adjacent cell
            Object.keys(self.vue.board[4*i+j])[0] = self.vue.temp;
            Object.values(self.vue.board[4*i+j])[0] = self.vue.temp;*/
        } else if (self.cellColor(i, j-1) == 'black'){
            self.vue.swap(4*i+j, 4*i+(j-1));
        } else if (self.cellColor(i+1, j) == 'black'){
            self.vue.swap(4*i+j, 4*(i+1)+j)
        } else if (self.cellColor(i-1, j) == 'black'){
            self.vue.swap(4*i+j, 4*(i-1)+j);
        } else {
            console.log("I can move!");
        }
    };

    // Swap the cells
    self.swap = function(current, target) {
        temp = self.vue.board[current];
        Vue.set(self.vue.board, current, self.vue.board[target]);
        Vue.set(self.vue.board, target, temp);
    };

    // Returns the (String) color associated with that cell
    self.cellColor = function(i, j) {
        try {
            return (Object.values(self.vue.board[4*i+j]));
        } catch (exception) {
            //console.error('NULL ERROR', exception.message);
        }

    };

    self.scramble = function() {
        self.vue.boardScrambled = [];
        // Read the Wikipedia article.  If you just randomize,
        // the resulting puzzle may not be solvable.
        /*min = 0;
        max = self.vue.board.length;
        scrambledBoard = [];
        for (count = 0; count < self.vue.board.length; count++){
            randomNum = Math.floor(Math.random() * (max - min)) + min;
            scrambledBoard.push(self.vue.board[randomNum]);
            self.vue.board.splice(randomNum, 1);
            console.log(scrambledBoard[count]);
            console.log(self.vue.board[count]);
        }*/

        // Fisher-Yates Shuffle
        for (count = self.vue.board.length - 1; count >= 0; count--) {
            var j = Math.floor(Math.random() * (count + 1));
            self.vue.swap(count, j);
            //console.log(Object.keys(self.vue.board[count])[0]);
            self.vue.boardScrambled.push(Object.keys(self.vue.board[count])[0]);
        }
        self.vue.boardScrambled.reverse();
        //self.vue.printArray(self.vue.boardScrambled);

        //var testArray = [13,2,10,3,1,12,8,4,5,0,9,6,15,14,11,7];
        //var testArray = [6,13,7,10,8,9,11,0,15,2,12,5,14,3,1,4];
        var testArray = [3,9,1,15,14,11,4,6,13,0,10,12,2,7,8,5];
        console.log("Inversion Count: " + 
            self.getInversionCount(testArray));
        console.log("Empty cell is " + self.findYPosition(testArray));
        
        self.isSolvable(testArray);
    };

    // Prints elements in array for testing purposes
    self.printArray = function(array) {
        for (i = 0; i < array.length; i++) {
            console.log(array[i]);
        }
    }

    // Determines whether the scrambled board is solvable
    // Returns true if yes, false otherwise
    self.isSolvable = function(boardArr) {
        var isInvCntEven = self.isEven(self.getInversionCount(boardArr));
        var isEmptyCellEvenRow = self.findYPosition(boardArr);

        if ( (isInvCntEven && !isEmptyCellEvenRow) || 
             (!isInvCntEven && isEmptyCellEvenRow) ) {
            console.log("solvable");
        } else {
            console.log("unsolvable");
        }
    }

    // Counts the number of inversions within the board array
    self.getInversionCount = function(boardArr) {
        inv_cnt = 0;
        for (var i = 0; i < boardArr.length - 1; i++) {
            for (var j = i + 1; j < boardArr.length; j++) {
                //count pairs (i,j) such that i appears before
                // j but i > j
                if (boardArr[j] && boardArr[i] && boardArr[i] > boardArr[j])
                    inv_cnt++;
            }
        }
        return inv_cnt;
    }

    // Determines whether args passed in is odd or even
    // Returns true if even, false if odd
    self.isEven = function (number) {
        if (number % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    // find position of empty cell from bottom row
    // returns true if empty cell is on even row, false otherwise
    self.findYPosition = function(boardArr) {
        var indexNum = 0;
        for (i = 0; i < boardArr.length; i++) {
            if (boardArr[i] == 0) {
                indexNum = i;
            }
        }
        console.log("Index of empty cell: " +indexNum);
        if ( (indexNum > -1 && indexNum < 4) || 
             (indexNum > 7 && indexNum < 12) ) {
            return true;
        } else {
            return false;
        }
    }

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            board: [
                {1: 'red'},
                {2: 'white'},
                {3: 'red'},
                {4: 'white'},
                {5: 'white'},
                {6: 'red'},
                {7: 'white'},
                {8: 'red'},
                {9: 'red'},
                {10: 'white'},
                {11: 'red'},
                {12: 'white'},
                {13: 'white'},
                {14: 'red'},
                {15: 'white'},
                {0: 'black'},
            ],
            boardScrambled: [],
        },
        methods: {
            reset: self.reset,
            shuffle: self.shuffle,
            swap: self.swap,
            scramble: self.scramble,
            cellColor: self.cellColor,
            printArray: self.printArray,
        }

    });

    self.reset();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){
    APP = app();
    APP.initialize();
});
