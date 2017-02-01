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
reset: function (){

	// get the word to play against and make it lower case. 
	Hangman.currentWord = Hangman.chosenWord(Hangman.wordList).toLowerCase();
	console.log(Hangman.currentWord);
	document.getElementById("win").innerHTML = "Wins: " + Hangman.win; 
	Hangman.guessLimit = 10;
	document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;
	Hangman.guessedLetters = [];
	document.getElementById("letters").innerHTML = Hangman.guessedLetters;
	// Make an array of the same lenght of current word containing "_".
	Hangman.answerArray = [];
	Hangman.answerString = Hangman.answerArray.join(" ");
	for(i=0 ; i < Hangman.currentWord.length ; i++){
		Hangman.answerArray[i] = "_";
	}
	//Make a string from the generated array  
	Hangman.answerString = Hangman.answerArray.join(" ");
	document.getElementById("word").innerHTML = Hangman.answerString;	
	// get the word to play against and make it lower case. 

},

// function to initialize game
start: function (){
		
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
	
},
userGuess: "",
guessedLetters: [],	
currentWord: null,
answerArray: [],
answerString: "",
win: 0


};


//call function to initialize. 
Hangman.start();

//if the user lost call start function to initialize again. 
if(Hangman.continuePlaying == true){
	Hangman.start();	
}
//Listen for user's keystrokes.
document.onkeyup = function (event){

	document.getElementById("hangman").src= "assets/images/city.jpeg";
	//Get user input and make it lowercase. 
	Hangman.userGuess = event.key;
	
	//Check if (userGuess) is part of the ASCII code for lower case letters a to z. 
	if ((Hangman.userGuess.match(/^[a-z]$/i)))  {

		//Check that the userGuess is not in the already guessed letters 
		for (i = 0; i< Hangman.guessedLetters.length; i++){
			if(Hangman.userGuess === Hangman.guessedLetters[i]){
				Hangman.userGuess = null;
				var badSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3");
   				badSound.play();
			}
		}
		
		if(Hangman.userGuess !== null){
			
			//Log the pressed keys. 
			Hangman.guessedLetters.push(Hangman.userGuess);
			document.getElementById("letters").innerHTML = Hangman.guessedLetters;				
		
			if(Hangman.guessLimit !== 0){
				//Loop thru the current word and compare to see if letters match user guess. 
				for(i = 0 ; i < Hangman.currentWord.length ; i++) {			
						// if the user guess is one the letter on the current word index print the letter. 				
					if(Hangman.userGuess === Hangman.currentWord[i]) {
						Hangman.answerArray[i] = Hangman.userGuess;	
						Hangman.answerString = Hangman.answerArray.join("");
						document.getElementById("word").innerHTML = Hangman.answerString;
						var goodSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3")
						goodSound.play();

						}
				
					}
			}	
			
			//Decrese guess limit by 1 and print it out to the page 
			Hangman.guessLimit --;
			document.getElementById("guessLimit").innerHTML = Hangman.guessLimit;
		}

		// if the guess limit is equal to 0 alert game over. 
		if(Hangman.guessLimit === 0){
			document.getElementById("hangman").src= "assets/images/hangman.gif";
			Hangman.win = 0;
			Hangman.reset();
			loseSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3")
			loseSound.play();

		}

		// if the string containing the answer equals the current word the user wins.
		if(Hangman.answerString === Hangman.currentWord){	
			document.getElementById("hangman").src= "assets/images/youwin.jpeg";
			Hangman.win ++;
			Hangman.reset();
			var winSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3")
			winSound.play();
		}

	}
	else {
   		//play a sound to indicate invalid letter 
   		var badSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3");
   		badSound.play();
	}
//Closing bracket for event listener 
}



