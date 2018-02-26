/**
 * single var per function to see variables more clearer, avoid unexpected hoisting
 */
function loop() {
    var i = 0,
        max,
        myarray = [],
}

// Chapter 3
/**
 * object literal notation: mutable property,function(method), on-demand object creation
 */
// start with empty object
var dog = {};

// add one property
dog.name = 'Benji';

// add one function 
dog.getName = function() {
    // redefine the method to return and hardcoded value
    return dog.name;
};

// remove the properties
delete dog.getName;

// add more properties and methods
dog.say = function() {
    return 'woof!';
};
dog.fleas = true;

// start with not-empty object
let dog = {
    name: 'Benji',
    getName: function() {
        return this.name;
    },
};
// empty object still has prototype properties not empty totally, just regard .hasOwnProperties === null

// constructor
let cat = {goes: 'far'};
/**
 * another way -- using a built-in constructor,antipattern 
 * 1 shorter to type 
 * 2 emphasizes the mutable hashes instead of some class 
 * 3 time needed to find scope of Object
 */
let cat = new Object();
car.goes = 'far';

// display how constructor works !antipattern
let o = new Object();
console.log(o.constructor === Object); // true

// a number object
let o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2));// 1.00

//a string object
let o = new Object('hello');
console.log(o.constructor === String); // true
console.log(typeof o.subString); // 'function' normal object doesnt have subString method

//a boolean object
let o = Object(true);
console.log(o.constructor === Boolean);
// Again if use new Object, the unexpected return with different type of input. So DO NOT USE IT

// Customer COnstructor Funcrtions
let adam = new Person("Adam");
adam.say();

let Person = function(name) {
    this.name = name;
    this.say = function() {
        return `I am ${this.name}`;
    };
};
/**
 * new Person
 * 1 empty object created and referenced by this,inheriting the prototype of the function
 * 2 properties and methods are added to the object referenced by this
 * 3 the newly created object referenced by this is returned at the end implicitly
 */
let Person = function (name) {
    // create a new object
    // let this = {}; let this = Object.create(Person.prototype)
    //add properties and methods
    this.name = name;
    this.say() = function () {
        return `I am ${this.name}`;
    };
    // return this;
};

// better function created, for method in one instance not change to the next

// reusable members should in prototype
Person.prototype.say = function () {
    return `I am ${this.name}`;    
};

// return that instead this explicitly
let Objectmaker = function (name) {
    // this `name` property will be ignored
    this.name = name;
    
    // create and return a new object
    let that = {};
    that.name = 'And thats that';
    return that;
};
// if forget new this direct to global object(window in browsers),but you shold keep global namespace clean

// constructor 
function Waffle() {
    this.tastes = 'yummy';
}

// a new object
let good_morning  = new Waffle();
console.log(typeof good_morning); // object
console.log(good_morning.tastes) // yummy

//forgotten new;
let good_morning = Waffle();
console.log(typeof good_morning); // undefined
console.log(window.tastes); // yummy

// using that to avoid this problem but prototype will lose
function Waffle() {
    let that = {};
    that.tastes = 'yummy';
    return that;
};

function Waffle() {
    return {
        tastes: 'yummy',
    };
};

let first = Waffle();
let second = new Waffle();
console.log(first.tastes,second.tastes);// 'yummy','yummy'

// Self-Invoking Constructor
function Waffle() {
    if (!(this instanceof Waffle)) {
        return new Waffle();
    };
    // not allowed in strict mode
    if (!(this instanceof arguments.callee)) {
        return new Waffle();
    }

    this.tastes = 'yummy';
}

Waffle.prototype.wantAnother = true;

let first = Waffle(),
    second = new Waffle();

console.log(first.tastes,second.tastes); // 'yummy,yummy'
console.log(first.wantAnother,second.wantAnother); //true

// Array literal
let a = ['itsy', 'bitsy', 'spider']
let a = new Array('itsy', 'bitsy', 'spider')
// special,if Array only one argument ,represents length of array
let a = new Array(3);
console.log(a.length,a[0]);// 3 undefined

Array.isArray([]);// to check

//JSON JavaScript Object Notation,name quotes""
// an input JSON string
let jstr = '{"name": "value", "some": [1, 2, 3]}';
//JSON library
let data = JSON.parse(jstr);
console.log(data.name); // value
// YUI3 library
YUI.use('json-parse', function(Y) {
    let data = Y.JSON.parse(jstr);
    console.log(data.name); // value
});
//jQuery library
let data = jQuery.parseJSON(jstr);
console.log(data.name);// value
// opposite of JSON parse
JSON.stringify(a)

//RegExp()
//preffer
let re = /\\/gmi;// global matching, multiline, case-insensitive matching
// constructor
let re = new RegExp("\\\\","gm");
let no_letter = "abc123ABC".replace(/[a-z]/gi,"");
// calling RegExp with or without new is the same with new

//primitive Wrappers:Number() String() Boolean()

let n = 100;
console.log(typeof n);// number
let n = new Number(100);
console.log(typeof n); // object

//if you dont need its type for object,use primitive
let greet = 'hello world';
// primitive change to object
greet.split()[0];// hello
// attempting to augment 
greet.smile = true;

//doesnt work
typeof greet.smile;// undifined
typeof Number(1);// number
typeof new Number(1);// object

// built-in error
Error()
SyntaxError()
TypeError()
try {
    throw{
        name: "MyErrorType",
        message: "oops",
        extra: "this was bad",
        remedy: genericErrorHandler // who shold handle it
    }
} catch(e) {
    alert(e.Error);
    e.remedy();// callback handler
}



