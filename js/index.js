let gamerName;

function nameIsAvailable() {
    gamerName = localStorage.getItem('gamerName');
    if (gamerName != null) {
        return true;
    }
}

function askForNameIfNotAvalable() {
    if (!nameIsAvailable()) {
        document.getElementById("nameContainer").style.display = "block";
    } else {
        document.getElementById("gamerName").innerText = gamerName;
        document.getElementById("game").style.display = "block";
    }

}

function verfyGivenName() {
    if (document.getElementById("name").value != "") {
        localStorage.setItem('gamerName', document.getElementById("name").value);
        document.getElementById("nameContainer").style.display = "none";
        document.getElementById("gamerName").innerText = localStorage.getItem('gamerName');
        document.getElementById("game").style.display = "block";
    }
}

function checkGamerScore() {
    if (localStorage.getItem('gamerScore') == null) {
        localStorage.setItem('gamerScore', 0);
        document.getElementById("gamerScore").innerText = 0;
    } else {
        document.getElementById("gamerScore").innerText = localStorage.getItem('gamerScore');
    }
}

let randomNumber;
let leftTrials;
let levelPoints;

function easyLevel() {
    document.getElementById("message").style.color = "#CCFF00";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 1 et 10";
    document.getElementById("trialsMessage").innerText = "Vous avez 3 Essais pour deviner";
    randomNumber = Math.ceil(Math.random() * 10);
    leftTrials = 3;
    levelPoints = 1;
}

function mediumLevel() {
    document.getElementById("message").style.color = "#CCFF00";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 10 et 100";
    document.getElementById("trialsMessage").innerText = "Vous avez 5 Essais pour deviner";
    randomNumber = Math.ceil(Math.random() * 100);
    if (randomNumber < 10) {
        randomNumber = randomNumber + 10;
    }
    leftTrials = 5;
    levelPoints = 3;
}

function difficultLevel() {
    document.getElementById("message").style.color = "#CCFF00";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 100 et 1000";
    document.getElementById("trialsMessage").innerText = "Vous avez 10 Essais pour deviner";
    randomNumber = Math.ceil(Math.random() * 1000);
    if (randomNumber < 100) {
        randomNumber = randomNumber + 100;
    }
    leftTrials = 10;
    levelPoints = 5;
}

let checkedRadio;

function isAnyLevelChecked(levelChecked) {
    for (let i = 0; i < 3; i++) {
        let radioButton = document.getElementsByName("levels")[i];
        if (radioButton.checked) {
            levelChecked = true;
        }
    }
    if (levelChecked != true) {
        document.getElementById("message").style.color = "red";
        document.getElementById("givenNumber").blur();
    }
}

function uncheckRadioButtons() {
    for (let j = 0; j < 3; j++) {
        let radioButton = document.getElementsByName("levels")[j];
        radioButton.checked = false;
        checkedRadio == undefined;
    }
}

function disableRadioButtons() {
    for (let k = 0; k < 3; k++) {
        document.getElementsByName("levels")[k].disabled = true;
    }
}


function verfyGivenNumber() {
    let givenNumber = document.getElementById("givenNumber");
    if (givenNumber.value != "") {
        if (givenNumber.value == randomNumber) {
            localStorage.setItem('gamerScore', parseInt(localStorage.getItem('gamerScore')) + levelPoints)
            document.getElementById("gameResultMessage").style.color = "green";
            document.getElementById("gameResultMessage").innerText = "Bravo vous avez gagné!"
            document.getElementById("playAgain").innerText = "Voulez vous continuer?"
            gameOver();
        } else {
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = "Désolé ce n'est pas le bon nombre!";
            leftTrials = leftTrials - 1
            document.getElementById("trialsMessage").innerText = "Il vous reste " + leftTrials + " Essais";
            disableRadioButtons();
            if (leftTrials == 0) {
                document.getElementById("gameResultMessage").style.color = "red";
                document.getElementById("gameResultMessage").innerText = "Désolé vous avez perdu!"
                document.getElementById("playAgain").innerText = "Voulez vous réessayer?"
                gameOver();
            }
        }
    }
}

function clearGivenNumber() {
    if (givenNumber.value != "") {
        document.getElementById("givenNumber").value = "";
    }
}

function gameOver() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameResult").style.display = "block";
}

function goodBye() {
    document.getElementById("gameResult").style.display = "none";
    document.getElementById("goodByeName").innerText = localStorage.getItem('gamerName') + " !";
    document.getElementById("goodByeScore").innerText = localStorage.getItem('gamerScore');
    document.getElementById("goodBye").style.display = "block";
}

function playAgain() {
    location.reload();
}