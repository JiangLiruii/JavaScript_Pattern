// capability detection

//antipattern
if (navigator.userAgent.indexOf('MISE') !== -1) {
    document.attachEvent('onClick', console.log);
}

//better
if (document.attachEvent) {
    document.attachEvent('onclick', console.log);
}

//or Even more specific
if (typeof document.attachEvent !== 'undefined') {
    document.attachEvent('onClick', console.log);
}

// DOM Access
// Antipattern
for (let i = 0; i < 100; i ++) {
    document.getElementById('result').innerHTML += i +',';
}

// Better

let i, content = "";
for ( i = 0; i < 100; i ++) {
    content += i + ',';
}
document.getElementById('result').innerHTML += content;

//local style
//antipattern

let padding = document.getElementById('result').style.padding,
    margin = document.getElementById('result').style.margin;

//better

let style = document.getElementById('result').style,
    padding = style.padding,
    margin = style.margin;

// User selector API
document.querySelector('ul .selected');
document.querySelectorAll('#widget .class');

// fewer DOM updates
// antipattern

let p, t;
p = document.createElement('p');
t = document.createTextNode('first paragragh');
p.appendChild(t);
document.body.appendChild(p);

p = document.createElement('p');
t = document.createTextNode('second paragragh');
p.appendChild(t);
document.body.appendChild(p);

// use DocumentFragment
let p, t, frag;
frag = document.createDocumentFragment();
p = document.createElement('p');
t = document.createTextNode('first paragragh');
p.appendChild(t);
frag.appendChild(p);
p = document.createElement('p');
t = document.createTextNode('first paragragh');
p.appendChild(t);
frag.appendChild(p);

document.body.appendChild(frag);

// update with fragment, cloneNode
let oldnode = document.getElementById('result'),
    clone = oldnode.cloneNode(true);
// work with clone...

//when you're done
oldnode.parentNode.replaceChild(clone,oldnode);

//Event
let b = document.getElementById('clickMe');
if (document.addEventListener) {
    b.addEventListener('click', handler, false);
} else if (document.attachEvent) {
    b.attachEvent('onclick', handler);
} else {
    b.onclick = handler;
}

// several event bind one handler
let src, parts;
function handler(e) {
    e = e || window.event;
    src = e.target || e.srcEvent;
    parts = sec.innerHTML.split(':');
    parts[1] = parseInt(parts[1], 10) + 1;
    src.innerHTML = parts[0] + ':' + parts[1];
    /**
     * no bubble
     */
    if (typeof e.stopPropogation === 'function') {
        e.stopPropogation();
    }
    // for IE
    if (typeof e.cancelBubble !== 'undefined') {
        e.cancelBubble = true;
    }
    /**
     * prevent default action
     */
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
    // for IE
    if (typeof e.returnValue !== 'undefined') {
        e.returnValue = false;
    }
};

// Event Delegation

<div id="click-wrap">  <button>Click me: 0</button>  <button>Click me too: 0</button>  <button>Click me three: 0</button> </div>
function handler(e) {
    e = e || window.event;
    src = e.target || e.srcEvent;
    if (src.nodeName.toLowerCase() !== 'button') {
        return;
    }
    parts = sec.innerHTML.split(':');
    parts[1] = parseInt(parts[1], 10) + 1;
    src.innerHTML = parts[0] + ':' + parts[1];
    /**
     * no bubble
     */
    if (typeof e.stopPropogation === 'function') {
        e.stopPropogation();
    }
    // for IE
    if (typeof e.cancelBubble !== 'undefined') {
        e.cancelBubble = true;
    }
    /**
     * prevent default action
     */
    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
    }
    // for IE
    if (typeof e.returnValue !== 'undefined') {
        e.returnValue = false;
    }
};

// YUI libraries
Y.delegate('click', handler, '#click-wrap', 'button');
function handler(e) {
    let src = e.currentTarget,
        parts;
    parts = src.get('innerHTML').split(':');
    parts[1] = parseInt(parts[1], 10) + 1;
    src.set('innerHTML', parts[0] + ':' + parts[1]);
    e.halt();
};

// Long-Running Script
// setTimeout 0 not mean exec now but asap

// web workers, multiProcess
let ww = new Worker('my_web_worker.js');
ww.onmessage = function (event) {
    document.body.innerHTML += '<p>message from the background thread: ' + event.data + '<\/p>'
};

let end = 1e8, tmp = 1;
postMessage('hello there');
while(end) {
    end -= 1;
    tmp += end;
    if (end === 5e7) {
        postMessage('halfway threr,"tmp" is now' + tmp);
    }
}
postMessage('all done');

// remote Scripting
/**
 * XMLHttpRequest
 * 1 set XMLHttpRequest object
 * 2 provide a callback function to be notified whtn the request object changes state
 * 3 sent the request
 */
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleResponse;
// open() GET/POST + URL + true(asynchronous) + send()

xhr.open('GET', 'page.html', true);
xhr.send();

let i, xhr, activeXids = [
    'MSXML2.XMLHTTP.3.0',
    'MSXML2.XMLHTTP',
    'Microsoft.XMLHTTP'
];
if (typeof XMLHttpRequest === 'function') { // native XHR
    xhr = new XMLHttpRequest();
} else { // IE before 7 
    for (i = 0; i < activeXids.length; i ++) {
        try {
            xhr = new ActiveXObject(activeXids[i]);
            break;
        } catch (e) {}
    }
}
xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) { // 4 --> completed if not completed wait to next statechange event
        return false;
    }
    if (xhr.status !== 200) { // 200 --> ok, 400 --> not found
        alert('Error, status code: ' + xhr.status);
        return false;
    }
    document.body.innerHTML += '<pre>' + xhr.responseText + '<\/pre>';
};

xhr.open('GET', 'page.html', true);
xhr.send('');
// init-time branch, check only once
let utils = {
    xhr: null,
};
let i, xhr, activeXids = [
    'MSXML2.XMLHTTP.3.0',
    'MSXML2.XMLHTTP',
    'Microsoft.XMLHTTP'
];
if (typeof XMLHttpRequest === 'function') {
    utils.xhr = new XMLHttpRequest();
} else {
    for (i in activeXids) {
        try {
            utils.xhr = new ActiveXObject(i);
            break;
        } catch(e) {}
    }
}

// JSONP (JSON with Padding) not restrict same-domain browser policy
/**
 * the response of XHR request
 * 1 XML documents(historically)
 * 2 HTML chunks(quite common)
 * 3 JSON data(lightweight and convenient) 
 * 4 Simple text files and others
 */
// load dynamically
let script = Document.createElement('script');
script.src = url;
document.body.appendChild(script);
//Tic-tac-toe
let ttt = {
    played: [],
    get: function(id) {
        document.getElementById(id);
    },
    setup: function() {
        this.get('new').onclick = this.newGame;
        this.get('server').onclick = this.remoteRequest;
    },
    newGame: function() {
        let tds = document.getElementsByTagName('td'),
            max = tds.length,
            i;
        for (i = 0; i < max; i ++) {
            tds[i] = '&nbsp;';
        }
        this.played = [];
    },
    remoteRequest: function() {
        let script = document.createElement('script');
        script.src = 'server.php?callback = ttt.serverPlay&palyed=""' + ttt.played.join(',');
        document.body.appendChild(script);
    },
    serverPlay: function() {
        if (data.error) {
            alert(data.error);
            return;
        }
        data = parseInt(data, 10);
        this.played.push(data);
        this.get('cell-' + data).innerHTML = '<span class="server">X<\/span>';
        setTimeout(function() {
            this.clientPlay
        },300);
    },
    clientPlay: function() {
        let data = 5;
        if (this.played.length === 9) {
            alert('game over');
            return;
        }
        while (this.get('cell-' + data).innerHTML !== '&nbsp;') {
            data = Math.ceil(Math.random() * 9);
        }
        this.get('cell' + data).innerHTML = 'O';
        this.played.push(data);
    }
};

// frame and image beacons
new Image.src = 'http://example.org/some/page.php';// 204 for no header

// combineing scripts
// cat in Linux/Unix
// $ cat jquery.js jquery.quickselect.js jquery.limit.js > all.js
// two bundles 1 core bundle(hardly change) 2 plugin bundle(expect to change)


// minify and compress .htaccess
/**
 * AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml 
 * application/javascript application/json 
 */

// expire header .htaccess
/**
 * ExpiresActive On ExpiresByType application/x-javascript 
 * "access plus 10 years"
 */
 
 // use CDN(content delivery network)
/**
 * Google-->open-source libraries
 * Microsoft-->jQuery and ajax
 * Yahoo-->YUI
 */

 // load strategies
 // option1
 // <script>console.log('hello world')</script>
 // option2
 // <script src = 'external.js'></script>
/**
 * 1 language = 'JavaScript' optional
 * 2 type = 'text/javascript' optional
 * 3 defer async
 */

 // HTTP Chunking <!-- end of chuank #1 -->

 // dynamic <script>
 let script = document.createElement('script');
 script.src = 'all.js';
 document.documentElement.firstChild.appendChild(script);

 // inline scripts not execute right away
 let mynamespace = {
     inlien_scripts: []
 };
//  <script>mynamespace.inlien_scripts.push(function() {
//      console.log('hello,world');
//  })</script>
// execute now
let i, scripts = mynamespace.inlien_scripts, max = scripts.length;
for (i = 0; i < max; i ++) {
    scripts[i]();
}

// add <script>
let first_script = document.getElementsByTagName('script')[0];
first_script.parentNode.insertBefore(script, first_script);

// Lazy-loading <!-- end of chunk #2 -->

// load on demand, require
require('extra.js', function(){
    functionDefinedExtraJS();
});
function require(file, callback) {
    let script = document.getElementsByTagName('script')[0],
        newjs = document.createElement('script');
    // IE
    newjs.onreadystatechange = function() {
        if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
            callback();
            newjs.onreadystatechange = null;
        }
    };
    // others
    newjs.onload = function() {
        callback();
    };
    newjs.src = file;
    script.parentNode.insertBefore(newjs,script);
};

//preload javascript
new Image.src = 'preloadme.js';//IE
let obj = document.createElement('object');
obj.data = 'preloadme.js';
document.body.appendChild(obj);

let preload;
if (/*@cc_on!@*/false) { // IE sniffing equally !false
    preload = function(file) {
        new Image.src = file;
    }
} else {
    preload = function(file) {
        let obj = document.createElement('object'),
        body = document.body;
        obj.width = 0;
        obj.height = 0
        obj.data = file;
        body.appendChild(obj);
    }
};
preload('my_web_worker.js');

