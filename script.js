
let randomNumber = Math.floor(Math.random()*100+1);

const userInput = document.getElementById("guessField");
const remaining = document.querySelector(".lastResult");
const GuessSlot = document.querySelector(".guesses");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
const submit = document.getElementById("subt");

let prevGuess = [];
let numOfGuess = 1;

//For every game there is play game 
let playGame = true;

const p = document.createElement('p');

// First we check if player is eligible to play or not
if(playGame){
    submit.addEventListener('click',(e)=>{
        e.preventDefault(); // backend mai value nhi bhejega 
        const guess = Number(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}
function newGame(){

    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click',(e)=>{
        //Reset all the variables
        randomNumber = Math.floor(Math.random()*100+1);
        prevGuess = [];
        numOfGuess = 1;
        GuessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numOfGuess}`;
        userInput.removeAttribute('disabled');
        startOver.remove(p);

        playGame = true;
    });
    
}
function endGame()
{
    userInput.value = '';
    userInput.setAttribute('disabled','');// Now user cannot enter the new value
    p.classList.add('button');
    p.innerHTML = `<h2 id ="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function clearGuess(guess)
{
    userInput.value ='';//Making it ready for next value;
    GuessSlot.innerHTML += `${guess},`;//add the current guessed value 
    //to the prevGuess Array
    numOfGuess++;
    remaining.innerHTML = `${11 - numOfGuess}`;
    
    
}
function displayMessage(message)
{
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function validateGuess(guess)
{
    if(isNaN(guess) || guess < 1 || guess > 100)
    {
        alert ('Please Enter a valid Number');
    }
    else{
        prevGuess.push(guess);
        if(numOfGuess === 11)
        {
            clearGuess(guess);
            displayMessage(`Game Over.Random Number was ${randomNumber}`);
            endGame();
        }
        else{
            clearGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess)
{
    if(guess === randomNumber)
    {
        displayMessage("You won the game");
        endGame();
    }
    else if(guess < randomNumber)
    {
        displayMessage("Number is too low");
    }
    else{
        displayMessage("Number is too high");
    }

}