// function
// named function
let add = function add(a, b) {
  return a + b;
}

// unnamed function
let add = function (a, b) {
  return a + b;
}

// function hoisting
function foo () {
  alert('global foo');
}
function bar () {
  alert('global bar');
}

function hoistMe() {
  console.log(typeof foo);//function
  console.log(typeof bar);//undefined
  foo();// local foo
  bar();//undefined
  function foo() {
    alert('local foo');
  }
  let bar = function() {
    alert('local bar');
  };
}
hoistMe();

// callback
function writeCode(callback) {
  callback();
}
function introduceBugs() {
  //makeBugs
}
writeCode(introduceBugs);

let findNodes = function() {
  let i = 10000,//a big and heavy loop
      nodes = [],//store the result
      found;// the next node found
  while(i) {
    i -= 1;
    // complex logic
    nodes.push(found);
  }
  return nodes;
};
// inefficient
let hide = function(nodes) {
  let i = 0,
      max = nodes.length;
  for (;i < max; i ++) {
    nodes[i].style.display = 'none';
  }
}

hide(findNodes());
// efficient
let hide = function(node) {
  node.style.display = 'none';
}

let findNodes = function(callback,obj) {
  if (typeof callback !== 'funciton') {
    callback = false;
  }
  let i = 10000,
      nodes = [],
      found;
  while(i) {
    if (callback) {
      // without this
      // callback(found);
      // with this
      callback.call(obj,found);
    }
    nodes.push(found);
  }
  return nodes;
}

findNodes(hide);
// anonymous
findNodes(function(node) {
  node.style.display = 'none';
});

// concern about this
let myapp = {};
myapp.color = 'green';
myapp.paint = function (node) {
  node.style.color = this.color;
};
findNodes(myapp.paint,myapp)

findNodes('paint', myapp)
let fundNode = function(callback,obj) {
  if (typeof callback === 'string') {
    callback = obj[callback];
  }
  if (typeof callback === 'function') {
    callback.call(obj,found);  
  }
}

// Asynchronous Event Listener

document.addEventListener('click', console.log, false);

//returning functions

let setup = function() {
  alert(1);
  return function() {
    alert(2);
  };
};

let my = setup();// alert 1
my();// alert 2

// private data
let setup = function() {
  let count = 0;
  return function() {
    return (count + 1);
  };
};
let next = setup();
next();// return 1
next();// return 2
next();// return 3

// self-defining Functions which only operate once and no repeat implementation

let scareMe = function() {
  alert('boo');
  scareMe = function(){
    alert('double boo!');
  };
};
scareMe();//boo
scareMe();//double boo

// first-class validate
// add a new property
scareMe.property = 'properly';
// sign to different name
let prank = scareMe
// using as a method
let spooky = {
  boo: scareMe
};

// calling with new name
prank();//boo
prank();//boo
console.log(prank.property);// properly

// calling with new method
spooky.boo();//boo
spooky.boo();//boo
console.log(spooky.boo.property);// properly

// using self-defined function
scareMe();//double boo
scareMe();//double boo
console.log(scareMe.property);// undefined

// immediate function
// dont assign to any viarible,not leak any variable to global scope
(function (){
  alert('watch out');
}());
// another syntax,but first is better
(function (){
  alert('watch out');
})();
(function() {
  let days = ['Mon', 'Tue', 'Wen', 'thu', 'Fri', 'Sur', 'Sun'],
      today = new Date(),
      msg = `Today is ${days[today.getDay()]},${today.getDate()}`;
  alert(msg);
}());

// parameter in immediate function
(function(who, when){
  console.log(`I get ${who} on ${when}`)
}('Jack','Wen'));
(function(global){
  // operation for global
}(this));

// return value for immediate function
let sum = (function(){
  return 2 + 2;
}());
let sum = function(){
  return 2 + 2;
}();
let sum = (function() {
  return 2 + 2;
})();

let res = (function(){
  let result = 2 + 2;
  return function(){
    return result;
  };
}());

let o = {
  msg:(function(){
    let who = 'me',
        what = 'call';
    return `${who} ${what}`;
  }()),
  getMsg:function() {
    return msg;
  }
};
o.msg;//call me
o.getMsg;//call me

// in module1.js
(function(){
  //module1 logic
}());

// immediate object initialization similar to IIFE(immediate invoke function expression)
({
    // here you can define setting values
    //configuration of constant
    maxWidth:150,
    maxHeight:200,

    //define utility methods
    gimmeMax: function() {
      return this.maxWidth + 'x' + this.maxHeight;
    },
    // initialization
    init: function(){
      console.log(this.gimmeMax());
      //more init tasks
    },
}).init();

// 1 ({...}).init === ({...}.init());2 if you want reference after ini, you can add return this in init

// init-time Branching
//before event listener and handler
let util = {
  addListener: function(el, type, fn){
    if (typeof window.addEventListener === 'function') {
      el.addEventListener(type,fn,false);
    } else if (typeof document.attachEvent === 'function') {// IE
      el.attachEvent('on'+type, fn);
    }else{
      el['on'+type] = fn;
    }
  },
  removeListener: function(el, type, fn){
    // pretty much same
  }
};

// After
// the interface
let util = {
  addListener: null,
  removeListener: null
};
// the implementation
if (typeof window.addEventListener === 'function') {
  util.addListener = function(el, type, fn) {
    el.addEventListener(type, fn);
  };
  util.removeListener = function(el, type, fn) {
    el.removeEventListener(type, fn);
  }; 
  } else if (typeof document.attachEvent === 'function') {
    util.addListener = function(el, type, fn) {
      el.attachEvent('on' + type, fn);
    };
    util.removeListener = function(el, type, fn) {
      el.detachEvent('on' + type, fn);
    };
  }else {
    util.addListener = function(el, type, fn) {
      el['on' + type] = fn; 
    };
    util.removeListener = function(el, type, fn) {
      el['on' + type] = null;
    };
  }

// Function Memeries

let myFunc = function() {
  let cacheKey = JSON.stringify(Array.prototype.slice.call(arguments)),
      result;
  if (!myFunc.cache[cacheKey]){
    result = {};
    // operation
    myFunc.cache[cacheKey] = result;
  }
  return myFunc.cache[cacheKey];
};
// cache storage
myFunc.cache = {};

let myFunc = function(params) {
  let f = arguments.callee,
      result;
  if (!f.cache[params]) {
    result = {};
    f.cache[params] = result;
  }
  return f.cache[params];
};

myFunc.cache = {};

// Configuration Object,  provide cleaner API
function addPerson(first, last){
  //operations
};
// if params is long enough its very inconvinient to call
let conf = {
  username: 'batman',
  first: 'Bruce',
  last: 'Wayne'
};
addPerson(conf);
//using CSS style

// function application
// define one function
let sayHi = function(who) {
  return 'hello' + (who ? ',' + who : '') + '!';
};
// invoke a function
sayHi();// hello!
sayHi('Bruce');//hello,Bruce!
// apply a function
sayHi.apply(null,['world']);//hello, world! null means global

// object argument
let alien = {
  sayHi:function(who) {
    return 'hello' + (who ? who + ',' : ' ') + '!'; 
  },
};
sayHi.apply(alien,['world']);
sayHi.call(alien,'world');

// currying partial apply
// accept partial list of arguments
function add(x, y) {
  let oldx = x,
      oldy = y;
  if (typeof oldy === 'undefined') {// partial
    return function(newy) {
      return oldx + newy;
    };
  }
  return x + y;
}

function add(x, y) {
  if(typeof y === 'undefined') {
    return function(y) {//closure x
      return x + y;
    };
  }
  return x + y;
}

function schonfinkelize(fn) {
  let slice = Array.prototype.slice,
      stored_arg = slice.call(arguments,1);// transform arguments to array, the first is fn curring
  return function() {
    let new_arg = slice.call(arguments),
        args = stored_arg.concat(new_arg);
    return fn.apply(null,args);
  };
}

schonfinkelize(add,5)(6); // 11