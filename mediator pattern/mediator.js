function Player(name) {
  this.point = 0;
  this.name = name;
};
Player.prototype.play = function() {
  this.point += 1;
  mediator.played();
};
let scoreboard = {
  //HTML element to be updated
  element: document.getElementById('result'),

  //update the score display
  update: function(score) {
    let i, msg = '';
    for (i in score) {
      if (score.hasOwnProperty(i)) {
        msg += '<p><strong>' + i +'<\/strong>:';
        msg += score[i];
        msg += '<\/p>';
      }
    }
    this.element.innerHTML = msg;
  }
}
let mediator = {
  //all players
  players: {},

  //initialization
  setup: function() {
    let players = this.players;
    players.home = new Player('Home');
    players.guest = new Player('Guest');
  },

  //someone plays, update the score
  played: function() {
    let players = this.players,
        score = {
          Home: players.home.point,
          Guest: players.guest.point
        };
    scoreboard.update(score);
  },
  keypress: function(e) {
    e = e || window.event;
    //key 1
    console.log(e.which);
    if(e.which === 49) {
      mediator.players.home.play();
      return;
    }
    if(e.which === 48) {
      mediator.players.guest.play();
    }
  }
};

mediator.setup();
window.onkeypress = mediator.keypress;
// gameover 30s
setTimeout(function() {
  window.onkeypress = null;
  alert('game over');
},30000);
