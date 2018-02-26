// Basic words pool
var word_basic = ['tree', 'boat', 'human', 'baby', 'moon'];

//challenging words pool
var word_challenge = ['fortlee','darkknight','mitsubishi','metuchen','philadelphia'];

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

// This game can display up to 12 letters, words needs to be less or equal to 12 letters. 
var letterIdList = ["letter_0","letter_1","letter_2","letter_3","letter_4","letter_5","letter_6","letter_7","letter_8","letter_9","letter_10","letter_11"];

// Player needs to pick Basic or Standard level frist before start the Game, otherwise display this alert message. 
var notChooseHtml = "<p>choose basic or challenging first</p>";
var notChooseHtml_2 = "<p>Choose basic or challenging first and then hit START"

// Guess correct notice 
var successNote = "<p>Congratulations You Made It</p>"

// Disable notice display, nothing need to be alerted 
var nullHtml = "<p></p>";

//
var guessleft = 0;

// the length of the word that is currently being guessed by Player. 
var correctNumLetter = 0;

// the counts of specific letters for one specific word, e.g. count of 2 for letter of "e" in word of "tree"
var letternum = 0;

// once word_pool is identified or updated, use getRandomInt(num) to pick the word left in the word_pool and assign it to wordOfGame
var wordOfGame = "";

// once wordOfGame is identified, create a array to store all the letters of the wordOfGame in letterOfWord. 
var letterOfWord = [];

// Create index of the image for hangman progress step
var imageIndex = 0;

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
    "mitsubishi" : "assets/images/mitsubishimoon.png",
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
    word_pool = word_basic;
}

// challenge to assign challenge word pool to word_pool
function challenge() {
    levelSelected = true;
    word_pool = word_challenge;
}

//set gameon to false. 
function stopGame() {
    gameon = false;
}

function restartGame() {
    gameon = true;
    gameround = 0;
}

// start the game, initite all the parameters. 
function startGame() {

    gameon = true;
    // gameon && word_pool.length >= 1
    console.log("word pool lenght is:" + word_pool.length);

    if (!levelSelected) {
        resultDisplay.innerHTML = notChooseHtml;
        } 
    else if (levelSelected) {
            
        resultDisplay.innerHTML = nullHtml;
        
        gamerun();
    }
}

// initial the game
function gamerun() {

    currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + hangmanimglist[imageIndex] +' "  alt="your pick display" />';

    gameround++;

    roundDisplay.textContent = gameround;

    var num = word_pool.length;
    var ramdnum = getRandomInt(num);
    console.log(ramdnum);

    wordOfGame = new word(word_pool[ramdnum]);
    console.log(wordOfGame);

    letternum = wordOfGame.wordlen;
    console.log(letternum);

    letterOfWord = wordOfGame.wordstr;
    console.log(letterOfWord);

    word_pool.splice(ramdnum,1);
    console.log(word_pool);

    for (var i = 0; i < letternum; i++) {
        var dashDisplay = document.getElementById(letterIdList[i]);
        dashDisplay.textContent = "_";
        }
}

function nextgame() {
    correctNumLetter = 0;
}

// once game start, press key to check if it match with letters of word
function btnfunction(clicked_id) {

    // Check if Basic/Challenge selected. 
    if (!levelSelected) {
        resultDisplay.innerHTML = notChooseHtml_2;
        } 

    // Check if Game start button has been pressed. 

    else if (levelSelected && gameon) {

        if (wordOfGame.name.includes(clicked_id)) {
            var position = [];
            position = getLetterIndexes(wordOfGame.name, clicked_id);
            correctNumLetter = correctNumLetter + position.length;

            console.log(position)
            console.log(letterOfWord);
            console.log("correct number total", + correctNumLetter);
            
            // Disable button that has string matches with the string list of word.
            document.getElementById(clicked_id).disabled = true;

            for (var i=0; i<position.length;i++) {
                var letterDisplay = document.getElementById(letterIdList[position[i]]);
                console.log(position[i]);
                letterDisplay.textContent = letterOfWord[position[i]];

                if (correctNumLetter === letternum) {
                    resultDisplay.innerHTML = successNote;
                    currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + wordImgList[wordOfGame.name] +' "  alt="your pick display" />';
                    nextgame();
                    }
                }
            } else {
                imageIndex ++;
                currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + hangmanimglist[imageIndex] +' "  alt="your pick display" />';
                }
        }
}
