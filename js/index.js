function nameIsAvailable() {
    let tester = localStorage.getItem('gamerName');
    if (tester != null) {
        return true;
    }
}

function askForNameIfNotAvalable() {
    if (!nameIsAvailable()) {
        prompt("Entrer Votre Nom");
    }

}

let levelChoice;
let randomNumber;
let maxTrials;
let leftTrials;

function easyLevel() {
    levelChoice = document.getElementById("easy").value;
    document.getElementById("message").style.color = "black";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 1 et 10";
    randomNumber = Math.ceil(Math.random() * 10);
    maxTrials = 3;
    leftTrials = maxTrials;
    // console.log(randomNumber);
}

function mediumLevel() {
    levelChoice = document.getElementById("medium").value;
    document.getElementById("message").style.color = "black";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 10 et 100";
    randomNumber = Math.ceil(Math.random() * 100);
    if (randomNumber < 10) {
        randomNumber = randomNumber + 10;
    }
    maxTrials = 5;
    console.log(randomNumber);
}

function difficultLevel() {
    levelChoice = document.getElementById("difficult").value;
    document.getElementById("message").style.color = "black";
    document.getElementById("message").innerText = "Entrez un nombre entier entre 100 et 1000";
    randomNumber = Math.ceil(Math.random() * 1000);
    if (randomNumber < 100) {
        randomNumber = randomNumber + 100;
    }
    maxTrials = 10;
    console.log(randomNumber);
}

let checkedRadio;

function isAnyLevelChecked() {
    for (let i = 0; i < 3; i++) {
        let radioButton = document.getElementsByName("levels")[i];
        if (radioButton.checked) {
            checkedRadio = radioButton.value;
        }
    }
    console.log(randomNumber);
    if (checkedRadio == undefined) {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerText = "Selectionnez d'abord un niveau avant de commencer!";
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

function enableRadioButtons() {
    for (let l = 0; l < 3; l++) {
        document.getElementsByName("levels")[k].disabled = false;
    }
}

function verfyGivenNumber() {
    let givenNumber = document.getElementById("givenNumber");
    if (givenNumber.value != "") {
        console.log(givenNumber.value, randomNumber);
        if (givenNumber.value == randomNumber) {
            document.getElementById("gameResultMessage").style.color = "green";
            document.getElementById("gameResultMessage").innerText = "Bravo vous avez gagné!"
            gameOver();
        } else {
            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerText = "Désolé ce n'est pas le bon nombre!";
            leftTrials = leftTrials - 1
            if (leftTrials == 0) {
                document.getElementById("gameResultMessage").style.color = "red";
                document.getElementById("gameResultMessage").innerText = "Vous avez perdu!"
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
    document.getElementById("game").style.visibility = "hidden";
    document.getElementById("gameResult").style.visibility = "visible";
}

function goodBye() {
    document.getElementById("gameResult").style.visibility = "hidden";
    document.getElementById("goodBye").style.visibility = "visible";
}

function playAgain() {
    location.reload();
}