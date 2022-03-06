let gamerName;

function nameIsAvailable() {
    gamerName = localStorage.getItem('gamerName');
    if (gamerName != null) {
        return true;
    }
}
const nameContainer = document.getElementById("nameContainer");
const game = document.getElementById("game");
const gamerNameSpan = document.getElementById("gamerName");

function askForNameIfNotAvalable() {
    if (!nameIsAvailable()) {
        nameContainer.style.display = "block";
    } else {
        gamerNameSpan.innerText = gamerName;
        game.style.display = "block";
    }

}


const name = document.getElementById("name");

function verfyGivenName() {
    if (name.value != "") {
        localStorage.setItem('gamerName', name.value);
        nameContainer.style.display = "none";
        gamerNameSpan.innerText = localStorage.getItem('gamerName');
        game.style.display = "block";
    }
}

const gamerScoreSpan = document.getElementById("gamerScore");

function checkGamerScore() {
    if (localStorage.getItem('gamerScore') == null) {
        localStorage.setItem('gamerScore', 0);
        gamerScoreSpan.innerText = 0;
    } else {
        gamerScoreSpan.innerText = localStorage.getItem('gamerScore');
    }
}

let randomNumber;
let leftTrials;
let levelPoints;
const mainMessage = document.getElementById("mainMessage");
const trialsMessage = document.getElementById("trialsMessage");
const pointsMessage = document.getElementById("pointsMessage");

function easyLevel() {
    leftTrials = 3;
    levelPoints = 1;
    mainMessage.style.color = "#CCFF00";
    mainMessage.innerText = "Entrez un nombre entier entre 1 et 10";
    trialsMessage.innerText = "Vous avez " + leftTrials + " Essais pour deviner";
    pointsMessage.innerText = "Pour chaque nombre valide vous gagnez " + levelPoints + " point";
    randomNumber = Math.ceil(Math.random() * 10);
}

function mediumLevel() {
    leftTrials = 5;
    levelPoints = 3;
    mainMessage.style.color = "#CCFF00";
    mainMessage.innerText = "Entrez un nombre entier entre 10 et 100";
    trialsMessage.innerText = "Vous avez " + leftTrials + " Essais pour deviner";
    pointsMessage.innerText = "Pour chaque nombre valide vous gagnez " + levelPoints + " points";
    randomNumber = Math.ceil(Math.random() * 100);
    if (randomNumber < 10) {
        randomNumber = randomNumber + 10;
    }
}

function difficultLevel() {
    leftTrials = 10;
    levelPoints = 5;
    mainMessage.style.color = "#CCFF00";
    mainMessage.innerText = "Entrez un nombre entier entre 100 et 1000";
    trialsMessage.innerText = "Vous avez " + leftTrials + " Essais pour deviner";
    pointsMessage.innerText = "Pour chaque nombre valide vous gagnez " + levelPoints + " points";
    randomNumber = Math.ceil(Math.random() * 1000);
    if (randomNumber < 100) {
        randomNumber = randomNumber + 100;
    }
}

let checkedRadio;
const radioButtons = document.getElementsByName("levels");
const givenNumberInput = document.getElementById("givenNumber");

function isAnyLevelChecked(levelChecked) {
    for (let i = 0; i < 3; i++) {
        let radioButton = radioButtons[i];
        if (radioButton.checked) {
            levelChecked = true;
        }
    }
    if (levelChecked != true) {
        mainMessage.style.color = "red";
        givenNumberInput.blur();
    }
}

function uncheckRadioButtons() {
    for (let j = 0; j < 3; j++) {
        let radioButton = radioButtons[j];
        radioButton.checked = false;
        checkedRadio == undefined;
    }
}

function disableRadioButtons() {
    for (let k = 0; k < 3; k++) {
        radioButtons[k].disabled = true;
    }
}

const gameResultMessage = document.getElementById("gameResultMessage");
const playAgainMessage = document.getElementById("playAgain");

function verfyGivenNumber() {
    let givenNumber = givenNumberInput;
    let sPoints;
    let sTrials;
    (levelPoints > 1) ? sPoints = "s": sPoints = "";
    if (givenNumber.value != "") {
        if (givenNumber.value == randomNumber) {
            localStorage.setItem('gamerScore', parseInt(localStorage.getItem('gamerScore')) + levelPoints)
            gameResultMessage.style.color = "green";
            gameResultMessage.innerText = "Bravo vous avez gagné " + levelPoints + " point" + sPoints;
            playAgainMessage.innerText = "Voulez vous continuer?"
            gameOver();
        } else {
            mainMessage.style.color = "red";
            mainMessage.innerText = "Désolé ce n'est pas le bon nombre!";
            leftTrials = leftTrials - 1;
            (leftTrials > 1) ? sTrials = "s": sTrials = "";
            pointsMessage.innerText = ""
            trialsMessage.innerText = "Il vous reste " + leftTrials + " Essai" + sTrials;
            disableRadioButtons();
            if (leftTrials == 0) {
                gameResultMessage.style.color = "red";
                gameResultMessage.innerText = "Désolé vous avez perdu!"
                playAgainMessage.innerText = "Voulez vous réessayer?"
                gameOver();
            }
        }
    }
}

function clearGivenNumber() {
    if (givenNumber.value != "") {
        givenNumberInput.value = "";
    }
}

const gameResult = document.getElementById("gameResult");
const goodByeName = document.getElementById("goodByeName");
const goodByeScore = document.getElementById("goodByeScore");
const goodByeMessage = document.getElementById("goodBye");

function gameOver() {
    game.style.display = "none";
    gameResult.style.display = "block";
}

function goodBye() {
    gameResult.style.display = "none";
    goodByeName.innerText = localStorage.getItem('gamerName') + " !";
    goodByeScore.innerText = localStorage.getItem('gamerScore');
    goodByeMessage.style.display = "block";
}

function playAgain() {
    location.reload();
}