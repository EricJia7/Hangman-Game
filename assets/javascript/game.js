// Basic words pool
// var word_basic = ['tree', 'boat', 'human', 'baby', 'moon'];
var word_basic = ['tree', 'moon'];

//challenging words pool
var word_challenge = ['fortlee','metuchen'];
// var word_challenge = ['fortlee','darkknight','mitsubishi','metuchen','philadelphia'];

//selection of words which will be used once Player start the game
var word_pool = [];

// Game enabled
var gameon = false;
var gamependingkey = false;

// Basic or Challenging mode selected. 
var levelSelected = false;

var resultDisplay = document.getElementById("hiddenDisplay");

// Show what's current game round once Start or Restart the Game. 
var roundDisplay = document.getElementById("numberofround");
var gameround = 0;

// Display image according to current action, wrong guess or successful guess overall. 
var currentImg = document.getElementById("img_id");

// Display how may successful guess Play has win or lose
var guessSuccessDisplay = document.getElementById("numberofwin");
var guessFailedDisplay = document.getElementById("numberoflose");

// This game can display up to 12 letters, words needs to be less or equal to 12 letters. 
var letterIdList = ["letter_0","letter_1","letter_2","letter_3","letter_4","letter_5","letter_6","letter_7","letter_8","letter_9","letter_10","letter_11"];

// Player needs to pick Basic or Standard level frist before start the Game, otherwise display this alert message. 
var notChooseHtml = "<p>choose basic or challenging first</p>";
var notChooseHtml_2 = "<p>Choose basic or challenging first and then hit START"

// Fail message and ask try again
var failHtml = "<p>mission failed, click Continue totry again!</p>"

// Guess correct notice 
var successNote = "<p>Yes, You made it</p>"

// Disable notice display, nothing need to be alerted 
var nullHtml = "<p></p>";

//Guess all the word, Game ends
var guessCompleteHtml = "<p>Well done and Congrats! Click Restart to replay....</p>"

// How many guess can be made before fail
var guessleft = 0;

// Number of words Player guess successfully
var guessSuccess = 0;

// Number of words Player guess unsuccessfully
var guessFailed = 0;

// the length of the word that is currently being guessed by Player. 
var correctNumLetter = 0;

// Current word guess boolean, true if guess right, false if fail to guess after 6 steps. 
var currentWordGuess = false;

// the counts of specific letters for one specific word, e.g. count of 2 for letter of "e" in word of "tree"
var letternum = 0;

// once word_pool is identified or updated, use getRandomInt(num) to pick the word left in the word_pool and assign it to wordOfGame
var wordOfGame = "";
var wordofGameName = "";

// once wordOfGame is identified, create a array to store all the letters of the wordOfGame in letterOfWord. 
var letterOfWord = [];

// Create index of the image for hangman progress step and it can also indicate how many guess left.
var imageIndex = 0;

// Key activiated list
var keyActived = [];

// Hangman progress image list
var hangmanimglist = ["assets/images/Step_0.png","assets/images/Step_1.png","assets/images/Step_2.png","assets/images/Step_3.png","assets/images/Step_4.png","assets/images/Step_5.png","assets/images/Step_6.jpeg"];

// Words image dict
var wordImgList = {
    "tree" : "assets/images/tree.jpg",
    "boat" : "assets/images/boat.jpg",
    "human" : "assets/images/human.jpg",
    "baby" : "assets/images/baby.jpg",
    "moon" : "assets/images/moon.jpg",
    "fortlee" : "assets/images/fortlee.jpg",
    "darkknight" : "assets/images/darkknight.jpg",
    "mitsubishi" : "assets/images/mitsubishi.png",
    "metuchen" : "assets/images/metuchen.jpg",
    "philadelphia" :"assets/images/philadelphia.jpg",
};

// Create word class to get length, letters of the word. 
class word {
    constructor(name) {
        this.name = name;
    }

    get wordlen() {
        return this.name.length;
    }

    get wordstr() {
        var tempstr = [];
        for (var i=0; i<this.name.length;i++){
            tempstr.push(this.name.charAt(i));
        }
        return tempstr;
    }
}

// Get random index of the array to pick the word
function getRandomInt(num) {
    return Math.floor(Math.random() * Math.floor(num));
}

// Get index of selected letter for the word e.g. getLetterIndexes('p','apple) return [1,2]
function getLetterIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

// Basic to assign basic word pool to word_pool
function basic() {
    levelSelected = true;
    console.log("Before select Basic, the basic word pool is: " + word_basic);
    word_pool = word_basic.slice();
    console.log("After select Basic, the word pool is updated to: " + word_pool);
    document.getElementById("basicBtn").disabled = true;
    document.getElementById("challengeBtn").disabled = true;

}

// challenge to assign challenge word pool to word_pool
function challenge() {
    levelSelected = true;
    word_pool = word_challenge.slice();
    console.log("After select challenge, the word pool is updated to: " + word_pool);
    document.getElementById("challengeBtn").disabled = true;
    document.getElementById("basicBtn").disabled = true;
}

//set gameon to false. 
function stopGame() {
    gameon = false;
    document.getElementById("restartBtn").disabled = false;
}

function resetKey() {
    for (var i=0; i <keyActived.length; i++) {
        document.getElementById(keyActived[i]).disabled = false;
    }
    keyActived = [];
}

function gameRoundDisplay() {
    roundDisplay.textContent = gameround;
}

function noDisplay() {
    //reset the notes display to null
    resultDisplay.innerHTML = nullHtml;

}

function restartGame() {

    console.log("************* restartGame() Start****************")

    // reset the guessed letter and "_" unknown letter to null 
    for (var i=0; i <letterOfWord.length; i++) {
        document.getElementById('letter_' + i).textContent = "";
    }

    //reset all the varabiles 
    letterOfWord = [];
    gameround = 0;
    correctNumLetter = 0;
    word_pool = [];
    wordOfGame = "";
    letternum = 0;
    levelSelected = false;
    currentWordGuess = false;
    imageIndex = 0;
    guessSuccess = 0;
    guessFailed = 0;
    
    gameRoundDisplay();

    //disable the reset button
    document.getElementById("restartBtn").disabled = true;

    //enable the start button 
    document.getElementById("startBtn").disabled = false;

    //enable basic and challenge button
    document.getElementById("basicBtn").disabled = false;
    document.getElementById("challengeBtn").disabled = false;
    document.getElementById("continueBtn").disabled = true;

    //reset the display image to default hangman game image
    currentImg.innerHTML = '<img class = "imgDisplay"  src = "assets/images/hangman.jpg">'; 

    //reset the notes display to null
    noDisplay();

    //reset win or lose number display to 0
    guessSuccessDisplay.textContent = guessSuccess;
    guessFailedDisplay.textContent = guessFailed;

    //activate all the disable key
    console.log("Key Pressed List is: " + keyActived);
    resetKey();

    // Once all the keys are enabled, defaul the keyActive list to null.
    keyActived = [];

    // Below is for testing restartGame() purpose, comment out as test is completed. 
    // console.log("Game Round set to by restartgame " + gameround);
    // console.log(letterOfWord);
    // console.log("correct number total", + correctNumLetter);
    // console.log(wordOfGame);
    // console.log(letternum);
    // console.log(word_pool);

    console.log("************* restartGame() End ****************")

}

// start the game, initite all the parameters. 
function startGame() {

    gameon = true;
    // gameon && word_pool.length >= 1
    console.log("word pool lenght is:" + word_pool.length);
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("continueBtn").disabled = true;
    
    resetKey();

    if (!levelSelected) {
        resultDisplay.innerHTML = notChooseHtml;
        } 
    else if (levelSelected) {
            
        noDisplay();
        gamerun();
        document.getElementById("startBtn").disabled = true;
    }
}

// initial the game
function gamerun() {

    currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + hangmanimglist[imageIndex] +' "  alt="your pick display" />';

    var num = word_pool.length;
    var ramdnum = getRandomInt(num);

    wordOfGame = new word(word_pool[ramdnum]);

    //log current selected word string, need to add the word back to word_pool if guess failed 
    wordOfGameName = wordOfGame.name;
    console.log("Current word to be guessed: " + wordOfGameName);

    letternum = wordOfGame.wordlen;
    console.log("Current word's letter number sum is: " + letternum);

    letterOfWord = wordOfGame.wordstr;
    console.log("Current word's letter array is: " + letterOfWord);

    word_pool.splice(ramdnum,1);
    console.log("After letter selected, the word pool is updated to: " + word_pool);

    for (var i = 0; i < letternum; i++) {
        var dashDisplay = document.getElementById(letterIdList[i]);
        dashDisplay.textContent = "_";
        }
    
    gameround++;
    gameRoundDisplay();
}

function continueGame() {

    console.log("*************ContinueGame() Start****************")

    if (word_pool.length <= 0) {
        resultDisplay.innerHTML = guessCompleteHtml

    } else {
        gameround++;
        
        gameRoundDisplay();
        
        imageIndex = 0;
        currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + hangmanimglist[imageIndex] +' "  alt="your pick display" />';

        for (var i = 0; i < letternum; i++) {
            var dashDisplay = document.getElementById(letterIdList[i]);
            dashDisplay.textContent = "";
            }

        resetKey();
    
        var num = word_pool.length;
        var ramdnum = getRandomInt(num);

        wordOfGame = new word(word_pool[ramdnum]);

        //log current selected word string, need to add the word back to word_pool if guess failed 
        wordOfGameName = wordOfGame.name;

        console.log("Key Pressed List is: " + keyActived);
        console.log("Current word to be guessed: " + wordOfGameName);
             
        letternum = wordOfGame.wordlen;
        console.log("Current word's letter number sum is: " + letternum);

        letterOfWord = wordOfGame.wordstr;
        console.log("Current word's letter array is: " + letterOfWord);

        word_pool.splice(ramdnum,1);
        console.log("This is the word_pool after click the Continue Game Button: " + word_pool);

        for (var i = 0; i < letternum; i++) {
            var dashDisplay = document.getElementById(letterIdList[i]);
            dashDisplay.textContent = "_";
            }
        document.getElementById("continueBtn").disabled = true;

        gameon = true;
        currentWordGuess = false;
        correctNumLetter = 0 ;
    }

    console.log("*************ContinueGame() Ends****************")

 }

// once game start, press key to check if it match with letters of word
function btnfunction(clicked_id) {

    console.log("*************btnfunction() Start****************")
    console.log("levelSelected now is : " + levelSelected);
    console.log("gameon now is : " + gameon);
    console.log("currentWordGuess now is : " + currentWordGuess);

    // Check if Basic/Challenge selected. 
    if (!levelSelected) {
        resultDisplay.innerHTML = notChooseHtml_2;
        } 

    // Check if Game start button has been pressed. 
    else if (levelSelected && gameon && !currentWordGuess) {

        console.log("gamone: " + gameon);
        console.log('currentWordGuess: ' + currentWordGuess)

        if (wordOfGame.name.includes(clicked_id)) {

            keyActived.push(clicked_id);
            console.log("Key Pressed List is: " + keyActived);

            var position = [];
            position = getLetterIndexes(wordOfGame.name, clicked_id);
            correctNumLetter = correctNumLetter + position.length;

            console.log("Pressed Keyin word Index:  " + position)
            console.log("Current selected word is: " + letterOfWord);
            console.log("Correct Number Guessed total: ", + correctNumLetter);
            
            // Disable button that has string matches with the string list of word.
            document.getElementById(clicked_id).disabled = true;

            for (var i=0; i<position.length;i++) {
                var letterDisplay = document.getElementById(letterIdList[position[i]]);
                letterDisplay.textContent = letterOfWord[position[i]];
                }
            
            if (correctNumLetter === letternum) {
                guessSuccess++;
                resultDisplay.innerHTML = successNote;
                guessSuccessDisplay.textContent = guessSuccess;
                currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + wordImgList[wordOfGame.name] +' "  alt="your pick display" />';
                currentWordGuess = true;
                wordOfGameName = "";
                document.getElementById("continueBtn").disabled = false;
                }

            } else { 

                keyActived.push(clicked_id);
                console.log("Key Pressed List is: " + keyActived);
                
                document.getElementById(clicked_id).disabled = true;
                imageIndex ++;
                currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + hangmanimglist[imageIndex] +' "  alt="your pick display" />';

                if (imageIndex >=6) {
                    gameon = false;
                    guessFailed++;
                    guessFailedDisplay.textContent = guessFailed;
                    resultDisplay.innerHTML = failHtml;
                    currentWordGuess = false;

                    // add the current word back to current word_pool
                    word_pool.push(wordOfGameName)
                    document.getElementById("continueBtn").disabled = false;
                }

                }
        }
        console.log("*************btnfunction() End****************")

}