// ==================================================================
//                                   CHALLENGE 01
// ==================================================================
function ageInDays() {

    var birthyear = prompt('Which year were you born?');
    var ageInDayss = (2021 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you were ' + ageInDayss + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// ==================================================================
//                                   CHALLENGE 02
// ==================================================================

function generateCat() {

    var img = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    img.src = "static/images/cat.png";
    div.appendChild(img);
}

// ==================================================================
//                                   CHALLENGE 03
// ==================================================================

function rpsGame(yourChoice) {
    var humanChoice, botChoice;

    botChoice = numberToChoice(randomToRpsInt());
    humanChoice = yourChoice.id;

    results = decideWinner(humanChoice, botChoice);

    msg = finalMessage(results);


    rpsFrontEnd(yourChoice.id, botChoice, msg);
}

// function will generate random number
function randomToRpsInt() {
    return Math.floor(Math.random() * 3);
}

// will take random number and pass the assigned role
function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(humanChoice, computerChoice) {

    var rpsDatabase =
    {
        'rock': { 'rock': 0.5, 'paper': 0, 'scissor': 1 },
        'paper': { 'paper': 0.5, 'rock': 1, 'scissor': 0 },
        'scissor': { 'scissor': 0.5, 'rock': 0, 'paper': 1 }
    }

    var yourScore = rpsDatabase[humanChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][humanChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {

    if (yourScore === 0) {
        return { 'message': 'You Lose!', 'color': 'red' };
    } else if (yourScore === 0.5) {
        return { 'message': 'You Tied!', 'color': 'yellow' };
    } else {
        return { 'message': 'You Won!', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {

    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    // remove the images 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(37, 50, 233, 1)'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding:30px'>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow:0px 10px 50px rgba(243, 38, 24, 1)'>";


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// ==================================================================
//                                   CHALLENGE 04
// ==================================================================

var all_buttons = document.getElementsByTagName('button');


var copyAllBtn = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllBtn.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {

    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'random') {
        buttonsRandom();
    } else if (buttonThingy.value === 'reset') {
        buttonsColorReset();
    }
}

function buttonsRed() {

    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {

    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset() {

    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllBtn[i]);
    }
}

function buttonsRandom() {

    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for (let i = 0; i < all_buttons.length; i++) {
        var colorChoices = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[colorChoices])
    }

}

// ==================================================================
//                                   CHALLENGE 05
// ==================================================================

let blackJackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'loses': 0,
    'drews': 0,
    'isStand' : false,
    'turnsOver' : false,
}

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);

function blackJackHit() {
    if(blackJackGame['isStand'] === false){
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    }
}

function randomCard() {
    let randomNum = Math.floor(Math.random() * 12);
    return blackJackGame['cards'][randomNum];
}

function showCard(card, activePlayer) {

    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;           // this is called string templating
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackJackDeal() {
    if(blackJackGame['turnsOver'] === true){

        blackJackGame['isStand'] = false;

        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();
        }

        for (let i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;


        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = "#ffffff";
        document.querySelector('#dealer-blackjack-result').style.color = "#ffffff";
 
        document.querySelector('#blackjack-result').textContent = "Let's PLay";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackJackGame['turnsOver'] = true;
    }
}


function updateScore(card, activePlayer) {

    // if adding 11 keeps me below 21, add 11 otherwise add 1
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    } else {

        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "Bust!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async  function dealerLogic() {
    blackJackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackJackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000 );
    }   

    blackJackGame['turnsOver'] = true;   
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {

    let winner;

    // condition that i do not bust and my score is greater than dealer
    if (YOU['score'] <= 21) {

        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackJackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackJackGame['loses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackJackGame['drews']++;
        }
        //condition: when the user busts and dealer does not    
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackJackGame['loses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['drews']++;
    }

    return winner;
}

function showResult(winner) {

    let message, messageColor;

    if(blackJackGame['turnsOver'] === true){

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message = "You Won!";
            messageColor = "green";
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackJackGame['loses'];
            message = "You Loss!";
            messageColor = "red";
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackJackGame['drews'];
            message = "You Drew!";
            messageColor = "black";
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}