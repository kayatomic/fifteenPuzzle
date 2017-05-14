
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
            // temp = self.vue.board[4*i+j];
            // Vue.set(self.vue.board, 4*i+j, self.vue.board[4*i+(j-1)]);
            // Vue.set(self.vue.board, 4*i+(j-1), temp);
        } else if (self.cellColor(i+1, j) == 'black'){
            self.vue.swap(4*i+j, 4*(i+1)+j)
            // temp = self.vue.board[4*i+j];
            // Vue.set(self.vue.board, 4*i+j, self.vue.board[4*(i+1)+j]);
            // Vue.set(self.vue.board, 4*(i+1)+j, temp);
        } else if (self.cellColor(i-1, j) == 'black'){
            self.vue.swap(4*i+j, 4*(i-1)+j);
            // temp = self.vue.board[4*i+j];
            // Vue.set(self.vue.board, 4*i+j, self.vue.board[4*(i-1)+j]);
            // Vue.set(self.vue.board, 4*(i-1)+j, temp);
        } else {
            console.log("I can move!");
        }
            
        //Object.key(self.vue.temp) = Object.key(self.vue.board[4*i+j])
        //console.log("Shuffle:" + i + ", " + j);
    };

    // Swap the cells
    self.swap = function(current, target) {
        temp = self.vue.board[current];
        Vue.set(self.vue.board, current, self.vue.board[target]);
        Vue.set(self.vue.board, target, temp);
    }

    // Returns the (String) color associated with that cell
    self.cellColor = function(i, j) {
        try {
            return (Object.values(self.vue.board[4*i+j]));
        } catch (exception) {
            //console.error('NULL ERROR', exception.message);
        }

    };

    self.scramble = function() {
        // Read the Wikipedia article.  If you just randomize,
        // the resulting puzzle may not be solvable.
    };

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
            temp1: '',
            temp2: '',
        },
        methods: {
            reset: self.reset,
            shuffle: self.shuffle,
            swap: self.swap,
            scramble: self.scramble,
            cellColor: self.cellColor,
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
