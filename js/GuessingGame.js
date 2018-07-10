$(document).ready(function(){
  console.log('READY');
})

function generateWinningNumber(){
  var max = 101; //exclusive upper range
  var min = 1; //inclusive lower
  return Math.floor(Math.random() * (max - min)) + 1;
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
    return 'You Win!';
  } if (this.pastGuesses.indexOf(this.playersGuess) !== -1){
    return 'You have already guessed that number.';
  }
  this.pastGuesses.push(this.playersGuess);
  if (this.pastGuesses.length === 5){
    return 'You Lose.';
  }
  if (this.difference() < 10) return "You're burning up!";
  if (this.difference() < 25) return "You're lukewarm.";
  if (this.difference() < 50) return "You're a bit chilly.";
  if (this.difference() < 100) return "You're ice cold!";
}

Game.prototype.provideHint = function(){
  var arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  shuffle(arr);
  return arr;
}

function newGame(){
  return new Game();
}
