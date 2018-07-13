/*eslint-disable*/
$(document).ready(function(){
  var game = new Game();
  var originalTitle = $('#title').text();
  var originalSubTitle = $('#subtitle').text();
  var getOutcome = function(){
    var guess = +$('#player-input').val();
    var outcome = game.playersGuessSubmission(guess);
    $('#player-input').val('');
    $('#title').text(outcome);
  }
  var reset = function(){
    $('#submit, #hint').prop('disabled', false);
    game = new Game();
    $('#player-input').prop('autofocus', true);
    $('#guesses ul li').text('-');
    $('#title').text(originalTitle);
    $('#subtitle').text(originalSubTitle);
  }
  $("#submit").click(getOutcome);
  $(window).keypress(function(){
    if (event.which === 13 ) getOutcome();
  });

  $("#reset").click(reset);

  $('#hint').click(function(){
    var hint = game.provideHint();
    $('#title').text('Hint: ' + hint.join(', '));
    $('#title').slideDown();
    setTimeout(function(){
      $('#title').text(originalTitle);
    }, 5000);
  });
});

function generateWinningNumber(){
  var max = 101; //exclusive upper range
  var min = 1; //inclusive lower
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(arr){
  var m = arr.length;
  var temp;
  var i;
  while (m){
    i = Math.floor(Math.random() * m--);
    temp = arr[m];
    arr[m] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num){
  if (num < 1 || num > 100 || typeof num !== 'number'){
    throw 'That is an invalid guess.';
  }
  this.playersGuess = num;
  return this.checkGuess();
}

Game.prototype.checkGuess = function(){
  if (this.playersGuess === this.winningNumber){
    $('#submit, #hint').prop('disabled', true);
    $('#subtitle').text('Press reset to play again');
    return 'You Win!';
  } if (this.pastGuesses.indexOf(this.playersGuess) !== -1){
      $('#subtitle').text('Please try again');
      return 'You have already guessed that number.';
  }
  this.pastGuesses.push(this.playersGuess);
  $('#guesses ul li').eq(this.pastGuesses.length - 1).text(this.playersGuess);
  if (this.pastGuesses.length === 5){
    $('#subtitle').text('Press reset to play again.');
    $('#submit, #hint').prop('disabled', true);
    return 'You lose! The Winning Number was ' + this.winningNumber;
  }
  var diff = this.difference();
  if (this.isLower()) $('#subtitle').text('Guess higher!');
  else $('#subtitle').text('Guess lower!');

  if (diff < 10)  return "You're burning up!";
  if (diff < 25) return "You're lukewarm.";
  if (diff < 50) return "You're a bit chilly.";
  if (diff < 100) return "You're ice cold!";
}

Game.prototype.provideHint = function(){
  var arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  shuffle(arr);
  return arr;
}

function newGame(){
  return new Game();
}
