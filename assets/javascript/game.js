var word_basic = ['tree', 'boat', 'human', 'baby', 'moon'];
var word_challenge = ['laundry','hangmang','coldplay','newyork','philadelphia'];

var word_pool = [];

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

var gameon = false;
var levelSelected = false;

var resultDisplay = document.getElementById("hiddenDisplay");

var currentImg = document.getElementById("img_id");

var notChooseHtml = "<p>choose basic or challenging first</p>";
var chooseHtml = "<p></p>";

var gameround = 0;
var imageIndex = 0;

var imagelist = ["assets/images/Step_0.png","assets/images/Step_1.png","assets/images/Step_2.png","assets/images/Step_3png","assets/images/Step_4.png","assets/images/Step_5.png","assets/images/Step_6.png"];

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

function getRandomInt(num) {
    return Math.floor(Math.random() * Math.floor(num));
}


function startGame() {

    gameon = true;
    
    while (gameon && word_pool.length >= 1) {

        console.log("word pool lenght is:" + word_pool.length);

        if (!levelSelected) {
            resultDisplay.innerHTML = notChooseHtml;
        } 
        else if (levelSelected) {
            
            resultDisplay.innerHTML = chooseHtml;
            
            currentImg.innerHTML = '<img class = "imgDisplay" src =" ' + imagelist[0] +' "  alt="your pick display" />';
            
            var guessleft = 0;

            var num = word_pool.length;
            var ramdnum = getRandomInt(num);
            console.log(ramdnum);

            var wordOfGame = new word(word_pool[ramdnum]);
            console.log(wordOfGame);

            var letternum = wordOfGame.wordlen;
            console.log(letternum);

            var letterOfWord = wordOfGame.wordstr;
               console.log(letterOfWord);

            word_pool.splice(ramdnum,1);
            console.log(word_pool);
        }

        }

}
