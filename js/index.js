let gamerName;
let successSound = new Audio("../audio/success.mp3");
successSound.volume = 0.3;
let failSound = new Audio("../audio/fail.mp3");
failSound.volume = 0.3;

function nameIsAvailable() {
    gamerName = localStorage.getItem('gamerName');
    if (gamerName != null) {
        return true;
    }
}
const nameContainer = document.getElementById("nameContainer");
const game = document.getElementById("game");
const gamerNameSpan = document.getElementById("gamerName");
const nameInput = document.getElementById("name");

function askForNameIfNotAvalable() {
    if (!nameIsAvailable()) {
        nameContainer.style.display = "block";
        nameInput.focus();
    } else {
        gamerNameSpan.innerText = gamerName;
        game.style.display = "block";
    }

}


function verfyGivenName() {
    if (nameInput.value != "") {
        localStorage.setItem('gamerName', nameInput.value);
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
let minNumber;
let maxNumber;
const mainMessage = document.getElementById("mainMessage");
const trialsMessage = document.getElementById("trialsMessage");
const pointsMessage = document.getElementById("pointsMessage");

function selectLevel(minNum, maxNum, points, trials) {
    mainMessage.style.color = "#CCFF00";
    mainMessage.innerText = "Entrez un nombre entier entre " + minNum + " et " + maxNum;
    trialsMessage.innerText = "Vous avez " + leftTrials + " Essais pour deviner";
    pointsMessage.innerText = "Pour chaque nombre valide vous gagnez " + points + " points";
    randomNumber = Math.ceil(Math.random() * maxNum);
    if (randomNumber < minNum) {
        randomNumber = randomNumber + minNum;
    }
    levelPoints = points;
    leftTrials = trials;
    maxNumber = maxNum;
    minNumber = minNum;
    givenNumberInput.focus();
}

function easyLevel() {
    selectLevel(1, 10, 1, 3);
}

function mediumLevel() {
    selectLevel(10, 100, 3, 5);
}

function difficultLevel() {
    selectLevel(100, 1000, 5, 10);
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
    if (givenNumber.value == "" || givenNumber.value < minNumber || givenNumber.value > maxNumber) {
        mainMessage.style.color = "red";
        mainMessage.innerText = `Entrez un nombre entier entre ${minNumber} et ${maxNumber}`;
        givenNumberInput.focus();
    } else {
        if (givenNumber.value == randomNumber) {
            localStorage.setItem('gamerScore', parseInt(localStorage.getItem('gamerScore')) + levelPoints)
            gameResultMessage.style.color = "green";
            gameResultMessage.innerHTML = `<i class="bi bi-emoji-smile-fill"></i><p>Bravo ${gamerName} vous avez gagné ${levelPoints} point${sPoints}</p>`;
            playAgainMessage.innerText = "Voulez vous continuer?"
            uncheckRadioButtons();
            gameOver();
            successSound.play();
        } else {
            mainMessage.style.color = "red";
            mainMessage.innerText = "Désolé ce n'est pas le bon nombre!";
            leftTrials = leftTrials - 1;
            (leftTrials > 1) ? sTrials = "s": sTrials = "";
            pointsMessage.innerText = ""
            trialsMessage.innerText = `Il vous reste ${leftTrials} Essai${sTrials}`;
            disableRadioButtons();
            givenNumberInput.focus();
            if (leftTrials == 0) {
                gameResultMessage.style.color = "red";
                gameResultMessage.innerHTML = `<i class="bi bi-emoji-frown"></i><p>Désolé ${gamerName} vous avez perdu!</p>`;
                playAgainMessage.innerText = "Voulez vous réessayer?";
                uncheckRadioButtons();
                gameOver();
                failSound.play();
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