let $ = function(id) {
  return document.getElementById(id);
}
// click event1
$('vids').onclick = function(e) {
  let src,id;
  e = e || window.event;
  src = e.target || e.srcElement;
  if (src.nodeName !== 'A'){
    return;
  }
  if (typeof e.preventDefault === 'function'){
    e.preventDefault();
  }
  e.returnValue = false;
  id = src.href.split('--')[1];
  if (src.className === 'play') {
    src.parentNode.innerHTML = videos.getPlayer(id);
    return;
  }
  src.parentNode.id = 'v' + id;
  videos.getInfo(id);
}
// click event2
$('toggle-all').onclick = function(e) {
  let hrefs, i, max, id;
  hrefs = $('vids').getElementsByTagName('a');
  for (i = 0, max = hrefs.length; i < max; i ++) {
    //skip play links
    if (hrefs[i].className === 'play') {
      continue;
    }
    // skip unchecked
    if (!hrefs[i].parentNode.firstChild.checked) {
      continue;
    }
    id = hrefs[i].href.split('--')[1];
    hrefs[i].parentNode.id = 'v' + id;
    videos.getInfo(id);
  }
};
// video object
let videos = {
  getPlayer: function(id) {},
  updateList: function(data) {},
  getInfo: function(id) { 
    let info = $('info' + id);
    if (info) {
      http.makeRequest([id], 'video.updateList');
      return;
    }
    if (Info.style.display === 'none') {
      info.style.display = '';
    }else {
      info.style.display = 'none';
    }
  },
};
//http objecct
let http = {
  makeRequest: function(ids, callback) {
    let url = 'http://query.yahooapis.com/v1/public/yql?q=',
        sql = 'select * from music.video.id where ids IN ("%ID%")',
        format = 'format=json',
        handle = 'callback=' + callback,
        script = document.createElement(script);
    sql = sql.replace('%ID%', ids.join('","'));
    sql = encodeURIComponent(sql);
    url += sql + '&' +format + '&' +handler;
    script.src = url;
    document.body.appendChild(script);
  }
};
//proxy object
let proxy = {
  ids: [],
  delay: 50,
  timeout: null,
  callback: null,
  context: null,
  makeRequest: function(id, callback, context) {
    //add to the queue
    this.ids.push(id);

    this.callback = callback;
    this.context = context;

    //set timeout
    if(!this.timeout) {
      this.timeout = setTimeout(function(){
        proxy.flush();
      },this.delay);
    }
  },
  flush: function() {
    http.makeRequest(this.ids, "proxy.handler");

    //clear timeout and queue
    this.timeout = null;
    this,ids = [];
  },
  handler: function(data) {
    let i, max;

    //single video
    if (parseInt(data.query.count, 10) === 1) {
      proxy.callback.call(proxy.context, data.query.results.Video);
      return;
    }

    //multiple videos
    for (i = 0, max = data.query.ressult.Video.length; i < max; i ++) {
      proxy.callback.call(proxy.context, data.query.results.Video[i]);
    }
  }
};