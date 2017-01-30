//Hangman Game 

//Hangman Object  
var Hangman = {

guessLimit: 10, 
score: 0, 
wordList:['Paris','Amsterdam','NewYork','SanFrancisco','Houston','Shanghai','HongKong','MexicoCity','Miami'],
chosenWord: function (words){
	var chosenWord = words[Math.floor(Math.random() * words.length)]
	return chosenWord;
	},
guessedLetters: [],	
currentWord: null,
answerArray: [],
answerString: "",
win: 0

};



 
// function to initialize game
function start(){
		
	// get the word to play against and make it lower case. 
	Hangman.currentWord = Hangman.chosenWord(Hangman.wordList).toLowerCase();
	console.log(Hangman.currentWord);

	// Make an array of the same lenght of current word containing "_".
	for(i=0 ; i < Hangman.currentWord.length ; i++){
		Hangman.answerArray[i] = "_";
	}
	//Make a string from the generated array  
	Hangman.answerString = Hangman.answerArray.join(" ");

	//Initialize html current word, win counter, and guess limit 
	document.getElementById("word").innerHTML = Hangman.answerString;
	document.getElementById("win").innerHTML = "Wins: " + Hangman.win; 
	document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;
	document.getElementById("hangman").src= "assets/images/city.jpeg";

	
}

// call function to initialize. 
start();

//Listen for user's keystrokes.
document.onkeyup = function (event){
	
	//Get user input and make it lowercase. 
	var	userGuess = event.key;
	//Log the pressed keys. 
	Hangman.guessedLetters.push(userGuess);
	document.getElementById("letters").innerHTML = Hangman.guessedLetters;
		
	
	//Check if (userGuess) is part of the ASCII code for lower case letters in  decimal from 97(a) to 122(z). 


	if(Hangman.guessLimit !== 0){
	//Loop thru the current word and compare to see if letters match user guess. 
	for(i = 0 ; i < Hangman.currentWord.length ; i++) {
				
			// if the user guess is one the letter on the current word index print the letter. 				
			if(userGuess === Hangman.currentWord[i]) {
				Hangman.answerArray[i] = userGuess;	
				Hangman.answerString = Hangman.answerArray.join("");
				document.getElementById("word").innerHTML = Hangman.answerString;

			}
	
		}
	}	
	
	//Decrese guess limit by 1 and print it out to the page 
	Hangman.guessLimit --;
	document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;


	// if the guess limit is equal to 0 alert game over. 
	if(Hangman.guessLimit === 0){
		document.getElementById("hangman").src= "assets/images/hangman.gif";
		Hangman.guessLimit = 10;
		document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;
		Hangman.guessedLetters = [];
		document.getElementById("letters").innerHTML = Hangman.guessedLetters;
		Hangman.win = 0;
		Hangman.answerString = [];
		document.getElementById("word").innerHTML = Hangman.answerString;
		//window.setTimeout(start(), 5000);
		//start();

	}

	// if the string containing the answer equals the current word the user wins.
	if(Hangman.answerString === Hangman.currentWord){	
		Hangman.win ++;
		Hangman.guessLimit = 10;
		document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;
		document.getElementById("hangman").src= "assets/images/youwin.jpeg";
		document.getElementById("win").innerHTML = "Wins: " + Hangman.win; 
		Hangman.guessedLetters = [];
		document.getElementById("letters").innerHTML = Hangman.guessedLetters;
		Hangman.answerString = [];
		document.getElementById("word").innerHTML = Hangman.answerString;
		//window.setTimeout(start(), 5000);
		//start();
	}



}



