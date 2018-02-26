// Object creation pattern
// namespace pattern, use one object
// Before

function Parent() {};
function Child() {};

let some_var = 1;

let module1 = {};
module1.data = {a : 1, b : 2};
let module2 = {};

// After 

let MYAPP = {};
MYAPP.Parent = function() {};
MYAPP.Child = function() {};
MYAPP.some_var = 1;
MYAPP.modules = {};
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a : 1, b : 2};
MYAPP.modules.module2 = {};

// SANDBOX general purpose Namespace function
//unsafe
let MYAPP = {};
//safe
if (typeof MYAPP === 'undefined') {
  let MYAPP = {};
}
//shorter
let MYAPP = MYAPP || {};

//namespace()
let MYAPP = MYAPP || {};
MYAPP.namespace = function(ns_string) {
  let parts = ns_string.split('.'),
      parent = MYAPP,
      i,
      max;
  if (parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }
  for (i = 0, max = parts.length;i < max; i ++) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};
let module2 = MYAPP.namespace('MYAPP.modules.module2');
module2 === MYAPP.modules.module2;// true
MYAPP.namespace('module.module2');

// declare dependency
let myFunction = function() {
  let dom = YAHOO.util.dom,
      event = YAHOO.util.event;
};

//private Properties and Methods
let myobj = {
  myprop: 1,
  getMyPorp: function() {
    return this.myprop;
  },
};
//constructor method
function Gadget() {
  this.name = 'ipod';
  this.strech = function() {
    return 'ipad';
  };
}
let toy = new Gadget();
toy.name;
toy.strech();

// private member,use closure
function Gadget() {
  let name = 'ipad';
  //privilage method
  this.strech = function() {
    return name;
  };
}
let toy = new Gadget();
toy.strech();


// privacy failures,if return array or object directly(which value reference)
function Gadget() {
  // private member
  let specs = {
    screen_width: 320,
    screen_heigth: 180,
    color: 'white'
  };
  // public funciton
  this.getSpecs = function() {
    return specs;
  };
}

let s = new Gadget();
// Principle of Least Authority
function Gadget() {
  // private member
  let specs = {
    screen_width: 320,
    screen_heigth: 180,
    color: 'white'
  };
  // public funciton
  this.getDimension = function() {
    let dimension = {
      width: specs.width,
      height: specs.screen_heigth
    };
    return dimension;
  };
}

// copy cloning
//extend/exxtendDeep

// object literal calling
let myobj = (function(){
  let name = 'wow';
  return {
    getName: function(){
    return name;
    }
  }
}());
myobj.getName();

// 2 ways to achieve the private properties
// Own properties
function Gadget() {
  // private member
  let name = 'ipod';
  this.getName = function() {
    return name;
  }
}
// privileged properties
Gadget.prototype = (function() {
  // private member
  let browser = 'mobile webkit';
  return {
    getBrowser: function() {
    return browser;
    }   
  }
}());
// Reveling public function to public method
let myArr;
(function() {
  let astr = '[object Array]',
      toString = Object.prototype.toString;

  function isArray(a) {
    return toString.call(a) === astr;
  }

  function indexOf(arr, target) {
    let i = 0,
        max = arr.length;
    for (;i < max;i ++) {
      if (arr[i] = target) {
        return i;
      }
    }
  }

  myArr = {
    isArray:isArray(),
    isindex : indexOf(),
    inarray : indexOf(),
  };
}());
// even the punlic method:index Of changed,the result shold keep same

myArr.indexOf = null;
//still work
myArr.inarray([1,2,3,4,5],2);

// module pattern,combine Namespaces, immediate functions, private and priviliage method/members, declare dependencies
let arr = MYAPP.namespace('utilities.array');
arr = (function() {
  // dependencies
  let uobj = MYAPP.utilities.object,
      ulang = MYAPP.utilities.lang,
      // private priorities
      array_string = '[object Array]',
      ops = Object.prototype.toString;
      //private method
      //end var

      //optional once init procedures
      //public API
      return {
        inArray: function(needle, haystack) {
          for (let i = 0, max = haystack.length;i < max;i ++) {
            if (needle[i] === haystack) {
              return i;
            }
          }
          return -1;
        },
        isArray: function(a) {
          if (ops.call(a) === array_string) {
            return 1;
          }else {
            return -1;
          }
        },
      };
}());
let ar = new MYAPP.inArray([2,4,5,6,7],1)

// import Globals into a module
MYAPP.utilities.module = (function(app, global) {
  // references to global oject
  // and to the global app namespace object
  // are now localized
}(MYAPP, this));

// sandbox pattern
// a global constructor the single parttern is a constructor instead global object
new SandBox(function(box) {
  // your code here...
});

// 2 features 1 new is not require 2 accept additional configuration arguments
SandBox(['ajax', 'event'], function (box) {
  console.log(box);
});
// if you want more on box
SandBox(['ajax', 'dom'], function(box){
  console.log(box);
});
SandBox('*',function(box) {
  console.log(box);
});

//use one interface
SandBox('dom', 'event', function(box) {
  // work with dom and event
  SandBox('ajax', function(box) {
    //work with ajax
  });
});
// Adding Modules
SandBox.modules = {};
SandBox.Modules.dom = function(box) {
  box.getElement = function() {};
  box.getStyle = function() {};
  box.foo = 'bar';
};

SandBox.modules.event = function(box) {
  //access to the sandbox prototype if needed
  //box.constructor.prototype.m = 'mmm';
  box.attachEvent = function() {};
  box.dettachEvent = function() {};
};
SandBox.modules.ajax = function(box) {
  box.makeRequest = function() {};
  box.getResponse = function () {};
};

//implementing the constructor
function SandBox() {
  // turning arguments into an arry
  let args = Array.prototype.slice.call(arguments),
      // the last one is callback
      callback = args.pop(),
      // module can be passed as an array or as indevidual                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
      i;
    //make sure the function is called as constructor
    if (!(this instanceof SandBox)) {
      return new SandBox(modules,callback);
    }
    //add properties to this as needed:
    this.a = 1;
    this.b = 2;
    // now add modules to the core this object
    if (!modules || modules === '*'){
      modules = [];
      for (i in SandBox.modules) {
        if (SandBox.modules.hasOwnProperty(i)) {
          modules.push(i);
        }
      }
    }

    // initialize the required modules
    for (i = 0; i < modules.length; i += 1) {
      SandBox.modules[modules[i]](this);
    }

    // call the callback
    callback(this);
}

// amy prototype properties as needed
SandBox.prototype = {
  name: 'My Application',
  version: '1.0',
  getName: function() {
    return this.name;
  }
};

//static members use it directly without create
//public static member
let Gadget = function() {};
// a static method
Gadget.isShiny = function() {
  return 'you bet';
};
Gadget.prototype.setPrice = function(price) {
  this.price = price;
};
// call directly
Gadget.isShiny();
//need init an instance
let iphone = new Gadget();
iphone.setPrice(500);
typeof iphone.isShiny;//undefined
typeof Gadget.setPrice;//undefined
Gadget.prototype.isShiny = Gadget.isShiny;
typeof iphone.isShiny;//undefined
// this in Gadget.isShiny point to constructor, this in iphone to iphone

//method called staticly or nonstaticly
let Gadget = function(price) {
  this.price = price;
};

// a static method
Gadget.isShiny = function() {
  let msg = 'you bet';
  if (this instanceof Gadget) {
    // this onlu works if called non-statically
    msg += ',it costs $' + this.price + '!';
  }
  return msg;
};
Gadget.prototype.isShiny = function () {
  return Gadget.isShiny.call(this);
}
Gadget.isShiny();//you bet
let a = new Gadget('499');
a.isShiny();//you bet, it costs 499 !

// private static members
// shared by all objects created with the same constructor fucntion
// Not accessible outside the constructor

let Gadget = (function() {
  //static property
  let counter = 0;
  // returning the new impementation of the constructor
  return function() {
    console.log(counter += 1);
  };
}());

let g1 = new Gadget();// logs 1
let g2 = new Gadget();// logs 2
let g3 = new Gadget();// logs 3

//privilege or static property
let Gadget = (function() {
  let counter = 0,
      NewGadget;
  NewGadget = function() {
    counter += 1;
  };
  NewGadget.prototype.getLastId = function() {
    return counter;
  };
  return NewGadget;
}());
let iphone = new Gadget();
iphone.getLastId();//1
let ipad = new Gadget();
ipad.getLastId();//2
let ipod = new Gadget();
ipod.getLastId();//3

//object constants
let Widget = function() {
  // implementation...
};

Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;
// 3 methods
set(name,value);
isDefined(name);
get(name);

let constant = (function() {
  let constants = {},
      ownProp = Object.prototype.hasOwnProperty,
      allowed = {
        string: 1,
        number: 1,
        boolean: 1
      },
      prefix = (Math.random() + '_').slice(2);
  return{
    set: function (name, value){
      if (this.isDefined(name)) {
        return false;
      }
      if (!ownProp.call(allowed,typeof value)) {
        return false;
      }
      constants[prefix + name] = value;
      return true;
    },
    isDefined: function(name) {
      return ownProp.call(constant, prefix + name);
    },
    get: function(name) {
      if (this.isDefined(name)){
        return constants[prefix + name];
      }
      return null;
    }
  };
}());

constant.isDefined('maxwidth');//false
constant.set('maxwidth', 480);//true
constant.isDefined('maxwidth');//true
constant.set('maxwidth', 320);
constant.get('maxwidth');//480

// Chaining pattern,need to return this
myobj.method1('hello').method2().method3('world').method4();

let obj = {
  value: 1,
  increment: function() {
    this.value += 1;
    return this;
  },
  add: function(v) {
    this.value += v;
    return this;
  },
  shout: function() {
    alert(this.value);
  }
};

//chain method calls
onj.increment().add(3).shout();//5

// Props and Cons of the Chaining Pattern
let pra = document.getElementsByTagName('p')[0].appendChild(newnode);

//method() syntactic sugar
let Person = function (name) {
  this.name = name;
}.
  method('getName',function() {
    return this.name;
  }).
  method('setName', function(name) {
    this.name = name;
    // for chains functions
    return this;
  });

let a = Person('Adam');;
a.getName();
a.setName('Eve').getName();// Eve

// method function
if (typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function(name, implementation) {
    this.prototype[name] = implementation;
    return this;
  };
}

