// player choices
const playersDetails = {
    player: '',
    computer: '',
};

// statistics
const statistics = {
    gamesNumber: 0,
    winsNumber: 0,
    lossesNumber: 0,
    drawsNumber: 0,
}

const options = [...document.querySelectorAll('.select-options--option img')];

// human player's choice
function playerChoice() {
    // assign the selected option to the player property in playerChoice object
    playersDetails.player = this.dataset.option;
    // this.dataset.option - we store what is assigned to the data-option-x
    // console.log(playersDetails.player);
    options.forEach(option => option.style.boxShadow = '');
    this.style.borderRadius = '40px';
    this.style.boxShadow = '0 0 0 8px orange';
}

options.forEach(option => option.addEventListener('click', playerChoice));


// computer's random choice 
function computerChoice() {
    const computer = options[Math.floor(Math.random() * 3)].dataset.option;
    // console.log(`computer chose: ${computer}`);
    return computer;
}

// function to check who wins
function checkResult(player, computer) {
    if (player === computer) {
        return 'draw'
    } else if ((player === 'stone' && computer === 'scissors') ||
        (player === 'paper' && computer === 'stone') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'win'
    } else {
        return 'lose'
    }
}

// display results
function displayResults(player, computer, result) {
    document.querySelector('[data-summary="player-choice"]').textContent = player;
    document.querySelector('[data-summary="computer-choice"]').textContent = computer;

    // games number
    document.querySelector('.game-statistics--games span').textContent = ++statistics.gamesNumber;

    if (result === 'win') {
        document.querySelector('.game-statistics--wins span').textContent = ++statistics.winsNumber;
        const winner = document.querySelector('[data-summary="winner"]');
        winner.textContent = 'Congratulations! You win!';
        winner.style.color = 'green';
    } else if (result === 'lose') {
        document.querySelector('.game-statistics--losses span').textContent = ++statistics.lossesNumber;
        const lose = document.querySelector('[data-summary="winner"]');
        lose.textContent = 'Computer wins!';
        lose.style.color = 'red';
    } else if (result === 'draw') {
        document.querySelector('.game-statistics--draws span').textContent = ++statistics.drawsNumber;
        const draw = document.querySelector('[data-summary="winner"]');
        draw.textContent = 'Try once more!';
        draw.style.color = 'black';
    }
}

function resetChoice() {
    document.querySelector(`[data-option="${playersDetails.player}"]`).style.boxShadow = '';
    playersDetails.player = '';

}


function startGame() {
    // if player doesn't choice any option display an error message
    if (!playersDetails.player) {
        alert('Please choose an option. STONE, PAPER OR SCISSORS?')
    } else {
        playersDetails.computer = computerChoice();
        // check who wins?
        const gameResult = checkResult(playersDetails.player, playersDetails.computer);
        // display results
        displayResults(playersDetails.player, playersDetails.computer, gameResult);
        // reset player choice 
        resetChoice()
    }


}


// start game
document.querySelector('button').addEventListener('click', startGame);
