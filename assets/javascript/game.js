


var word_basic = ['tree', 'boat', 'human', 'baby', 'moon'];
var word_challenge = ['laundry','hangmang','coldplay','newyork','philadelphia'];

var word_pool = [];

var gameon = false;
var gamependingkey = false;
var levelSelected = false;

var resultDisplay = document.getElementById("hiddenDisplay");
var roundDisplay = document.getElementById("numberofround");
var currentImg = document.getElementById("img_id");

var letterIdList = ["letter_0","letter_1","letter_2","letter_3","letter_4","letter_5","letter_6","letter_7","letter_8","letter_9","letter_10","letter_11"];

var notChooseHtml = "<p>choose basic or challenging first</p>";
var successNote = "<p>Congratulations You Made It</p>"
var chooseHtml = "<p></p>";

var gameround = 0;
var imageIndex = 0;
var guessleft = 0;
var correctNumLetter = 0;

var letternum = 0;

var wordOfGame = "";

var letterOfWord = [];

var hangmanimglist = ["assets/images/Step_0.png","assets/images/Step_1.png","assets/images/Step_2.png","assets/images/Step_3.png","assets/images/Step_4.png","assets/images/Step_5.png","assets/images/Step_6.jpeg"];

var wordImgList = {
    "tree" : "assets/images/tree.jpg",
    "boat" : "assets/images/boat.jpg",
    "human" : "assets/images/human.jpg",
    "baby" : "assets/images/baby.jpg",
    "moon" : "assets/images/moon.jpg",

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

    // removeStr(value){
    //     this.name = this.name.replace(/value/g,"");
    // }

}

// Get random index of the array to pick the word
function getRandomInt(num) {
    return Math.floor(Math.random() * Math.floor(num));
}

function getLetterIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


function basic() {
    levelSelected = true;
    word_pool = word_basic;
}

function challenge() {
    levelSelected = true;
    word_pool = word_challenge;
}

function stopGame() {
    gameon = false;
}

function restartGame() {
    gameon = true;
    gameround = 0;
}


function startGame() {

    gameon = true;
    // gameon && word_pool.length >= 1
    console.log("word pool lenght is:" + word_pool.length);

    if (!levelSelected) {
        resultDisplay.innerHTML = notChooseHtml;
        } 
    else if (levelSelected) {
            
        resultDisplay.innerHTML = chooseHtml;
            
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
}

function gamerun() {

}

function nextgame() {
    correctNumLetter = 0;
}

function btnfunction(clicked_id) {

    if (wordOfGame.name.includes(clicked_id)) {
        var position = [];
        position = getLetterIndexes(wordOfGame.name,clicked_id);
        correctNumLetter = correctNumLetter + position.length;

        console.log(position)
        console.log(letterOfWord);
        console.log("correct number total", + correctNumLetter);

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
