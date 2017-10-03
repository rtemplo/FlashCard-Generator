var inquirer = require("inquirer");
var basicCard = require("./BasicCard.js");
var basicCardData = require("./basic.json");

//I could have passed this and not have them here in the global scope but it's a small program and thought it reasonable to type less by not requiring arguments in getQuestion :)
var score;
var currentIndex;
var cardArray;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm (computer-optimized version of Fisher-Yates algorithm).
 * Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function initGame() {
    score = 0;
    currentIndex = 0;
    cardArray = [];   

    //might want to randomize array here
    for (var i = 0; i < basicCardData.length; i++) {
        cardArray.push(new basicCard(basicCardData[i].question, basicCardData[i].answer));
    }

    shuffleArray(cardArray);
    getQuestion();
}

function getQuestion() {
    if (currentIndex < basicCardData.length) {
        
        inquirer.prompt([
            {
                type:"input",
                name:"answer",
                message:cardArray[currentIndex].front
            }
        ]).then(function (userResponse) {
            if (userResponse.answer.trim().toLowerCase() === cardArray[currentIndex].back.toLowerCase().trim()) {
                console.log("Nice job! That's correct.");
                score++;
            } else {
                console.log("Sorry that's not correct. The correct answer is: " + cardArray[currentIndex].back);
            }
            
            console.log("Score: " + score);
            console.log("################################################################################################\n");

            currentIndex++;

            //get the next question
            getQuestion();
        });
    } else {
        inquirer.prompt([{
            type:"list",
            name: "playAgain",
            message: "Would you like to play again?",
            choices: ["Yes", "No"]
        }]).then(function (userResponse) {
            console.log("Your final score was: " + score);

            if (userResponse.playAgain === "Yes") {
                //start the game over completely
                console.log("\nNEW GAME ################################################################################################\n");
                initGame();
            } else {
                console.log("\n############# Thanks for playing! ##############\n");
            }
        });;        
    }
}

//let the games begin
initGame();







