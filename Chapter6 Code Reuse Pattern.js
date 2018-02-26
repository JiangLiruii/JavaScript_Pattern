// Reuse pattern
// default pattern
function Parent(name) {
  this.name = 'adam';
}
// methods contain in prototype
Parent.prototype.say = function(){
  return this.name;
};
Child = function() {};
// child prototype must point to object
Child.prototype = new Parent();
let child = new Child();
child.say();//adam

//rent a constructor
function Parent(name) {
  this.name = name || 'Adam';
}
Parent.prototype.say = function(){
  return this.name;
}
function Child(name) {
  Parent.apply(this,arguments);
}

let C = new Child();
//the prototype not link
typeof c.say;//undefined
c.name = 'Adam';

//rent and set prototype
function Child(a) {
  Parent.apply(this,arguments);
}
Child.prototype = new Parent();

let c = new Child('Mike');
child.name;//Mike
delete child.name;
child.name;//'Adam'

//share the Prototype
function Child() {};
Child.prototype = Parent.prototype;

// A temporary constructor to solve the problem
function inderit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}

// storing the superClass
function inherit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
};
//change the pointer to constructor,Holy Grail pattern
function inherit(C, P) {
  function F() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.constructor.prototype = C;
};
// avoid to create constructor every time
let inherit = (function(){
  let F = function(){};
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.constructor.prototype = C;
  }
}())

//Klass --> Class
let Man = Klass(null,{
  __construct: function(what){
    console.log('this is Man');
    this.name = what;
  },
  getName: function() {
    return this.name;
  }
});
let SuperMan = Klass(null, {
  __construct: function(what) {
    console.log('this is superMan');
    this.name = what;
  },
  getName: function() {
    let name = SuperMan.uber.getName.call(this);
    return `I am ${name}`;
  }
});

let Klass = function(Parent,Props) {
  let Child, i, F;
  // new constructor
  Child = function(){
    if (Child.uber && Child.uber.hasOwnProperty('__construct')){
      Child.uber.__construct.apply(this,arguments);
    };
    if (Child.prototype.hasOwnProperty('__construct')){
      Child.prototype.__construct().apply(this,arguments);
    };
  };
  
  // inherit
  Parent = Parent || Object;
  F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = P.prototype;
  Child.constructor.prototype = Child;

  // add implementation methods
  for (i in Props) {
    if (Props.hasOwnProperty(i)) {
      Child.prototype[i] = Props[i];
    }
  }
  return Child;
}

//protopal inherit
let Parent = {
  name: 'Papa',
};
let Child = object(Parent);
console.log(Child.name);

let object = function(P) {
  function F() {};
  F.prototype = P;
  return new F();
};

function Person() {
  this.name = 'Alex';
};
Person.prototype.getName = function() {
  return this.name;
}
let Child = object(Person);
Child.name;//Alex
Child.getName();//Alex
// inherit prototype
let Child1 = object(Person.prototype);
typeof Child1.name;//undefined
typeof Child1.getName;// function

//ES5
let Child2 = Object.create(Person);
let Child3 = Object.create(Person,{
  age: {velue: 12}//ES5 descriptor
});
//YUI3
YUI().use('*',function(Y) {
  let child = Y.Object(parent);
});

//inheritance by copying Properties
function extend(parent, child) {
  let i,
      child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}
// swallow copy
let dad = {name: dad};
let son = extend(dad);
son.name;// dad
//deep copy,not change parent reference source
function extendDeep(parent, child) {
  let i,
      toString = Object.prototype.toString,
      astr = '[object Array]';
      child = child || {};
  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object' ){
        child[i] = (toString.call(parent[i]) === astr) ? [] : {};
        // recursive
        child.extendDeep(parent[i], child[i]);
      }
      else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}

// jquary:extend() deep FireBug extend()shallow YUI Y.clone()deepcopy and function bind

//mix-ins pattern
function mix(){
  let args, props,child = {},max = arguments.length;
  for (args = 0; args < max; args += 1) {
    for (props in arguments[args]) {
      if (arguments[args].hasOwnProperty(props)){
        child[props] = arguments[args][props]
      }
    }
  }
  return child;
}
let mix_in = mix({
  name:'alex',
  age: '17'
},{buffer: true},{sugar: 'many'});

//borrow methods (apply/call)

function f() {
  let args = Array.prototype.splice.call(arguments, 1, 3);
  // let args = [].slice.call(arguments, 1, 3);
  return args;
};
f(1, 2, 3, 4, 5);//Array [ 2, 3 ]

// this -->bind
let one = {
  name: 'one',
  say: function(args) {
    return args + this.name;
  }
};
one.say('hi');

let two = {
  name: 'another object'
};
one.say.apply(two,['hello']);
// assign to global virables
let say = one.say;
say('hoho');//hohoundefined

let yetanother = {
  name: 'yet another',
  method: function(callback) {
    return callback('Hola');
  }
};
yetanother.method(one.say);
function bind(object, method) {
  return function() {
    return method.apply(object,[].slice.call(arguments));
  };
};

let twosay = bind(two, one.say);
twosay('hello');

//pre-ES5
let newFunc = obj.func.bind(obj1,args);
if (typeof Function.prototype.bind === undefined) {
  Function.prototype.bind = function(ThisArgs) {
    let fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments,1);

        return function(){
          return fn.apply(ThisArgs,args.concat(slice.call(arguments)));
        };
  };
}

let twosay = one.say.bind(two);
let twosay3 = one.say.bind(two, 'hello');

