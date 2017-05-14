
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
        console.log("Shuffle:" + i + ", " + j);
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
            ]
        },
        methods: {
            reset: self.reset,
            shuffle: self.shuffle,
            scramble: self.scramble
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
