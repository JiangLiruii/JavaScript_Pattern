let myglobal = "hello";// antipattern
console.log(myglobal);
console.log(this.myglobal);
console.log(window.myglobal);
console.log(window["myglobal"])

// avoid global variable
function sum(x, y) {
    // antipattern
    result = x + y;
    // pattern
    let result = x + y;
    return result;
}

// chain declarition
function foo() {
    // antipattern, a is local but b is global equal let a = (b = 0) right to left execution
    let a = b = 0;
}
function foo() {
    let a,b;
    // both local
    a = b = 0;
}

// delete
let global_var1 = 'foo';
// antipattern
glocal_var2 = 'foo';
function foo() {
    // antipattern
    global_var3 = 'foo';
}
delete global_var1;// false
delete global_var2;// true
delete global_var3;// false

// get global
let global = (function() {
    return this;
})();

// single var 
function func() {
    let a = 1,
        b = 2,
        sum = a + b,
        myobj = {},
        i,
        j;
        //function body
}
// DOM variables
function updateElement() {
    let el = document.getElementById('result'),
        style = el.style;
    // do something
}

// hoisting
let myname = 'global';
function func() {
    console.log(myname); // undefined instead of 'global'
    let myname = 'local'
    console.log(myname); // 'local 
}
func();

//loop save
// antipattern
let myarray = [];
for (let i = 0; i < myarray.length; i ++ ){
    // do sth with myarray[i]
}
// pattern
for (let i = 0, max = myarray.length; i < max; i++){
    //do sth with myarray[i]
}
// stick single var,harder to copy
function looper() {
    let i = 0,
        max,
        myarray = [];
    for (i = 0,max = myarray.length; i < max; i ++){
        // do sth
    }
}
// more optimization
let i, myarray = [];
for (i = myarray.length;i--;) {
    //do sth
}
// or use while
let myarray = [],
    i = myarray.length;
while(i--) {
    // do sth
}

let man = {
    hands: 2,
    legs: 2,
    haeds: 1
};
if (typeof Object.prototype.clone === "undefined") {
    Object.prototype.clone = function() {};
}
// for-in loop
for (let i in man) {
    if (man.hasOwnProperty(i)) {
        //filter
        console.log(i+':'+man[i]);
    }
}
/**
 * hands: 2,
 * legs: 2,
 * heads: 1
 */

 // without check
for (let i in man) {
    console.log(i+':'+man[i]);    
}
/**
 * hands: 2,
 * legs: 2,
 * heads: 1
 * clone: function()
 */

 // with local variable cache
 let i,
    hasOwn = Object.prototype.hasOwnProperty;
for (i in man) {
    if (hasOwn.call(man,i)) {
        console.log(i + ':' + man[i]);
    }
}
// build-in prototype
if (typeof Object.prototype.myMethod !== 'function') {
    Object.prototype.myMethod = function() {
        // do implementation
    }
}

// switch patterns
let inspect_me = 0,
    result = '';
    switch (inspect_me) {
        case 0:
            result ="zero";
            break;
        case 1:
            result = 'one';
            break;
        case 2:
            result = 'two';
            break;
        default:
            result = 'unknown'
    }

// avoid eval(evil)
//antipattern
let property = "name";
console.log(eval("obj."+property))
//preferred
console.log(obj[property]);

// antipatterns
setTimeout('myfunc()',1000);
setInterval('myfunc(1, 2, 3)',1000);

// prefferd
setTimeout(myfunc, 1000);
setInterval(function(){
    myfunc(1, 2, 3)
},1000);

// must eval
let jsstring = "var un = 1; console.log(un)";
eval(jsstring);//logs '1'
jsstring = "var deux = 2; console.log(deux)"
new Function(jsstring)();// logs 2
jsstring = "var trois = 3; console.log(trois)"
(function(){
    eval(jsstring);// logs 3
})();

console.log(typeof un);// number
console.log(typeof deux);// undefined
console.log(typeof trois);// undefined
// eval in Function constructor global scope
(function(){
    let local = 1;
    eval("local = 3;cosole.log(local)");//3
    console.log(local);//3
})();
(function(){
    let local = 1;
    Function(console.log(typeof local))();//undefined
})();

//indention
function outer(a, b) {
    let c = 1,
        d = 2,
        inner;
    if (a > b) {
        inner = function() {
            return {
                r: c - d
            };
        };
    } else {
        inner = function() {
            return {
                r: c + d
            };
        };
    }
    return inner;
}
