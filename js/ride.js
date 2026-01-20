
const characters = [
  {
    name: "Jake Sully",
    image: "./images/character/JakeSully_photo.jpg",
    options: ["Jake Sully", "Colonel Quaritch", "Norm Spellman", "Trudy Chacon"]
  },
  {
    name: "Neytiri",
    image: "./images/character/NeitiryPhoto.jpg",
    options: ["Mo'at", "Neytiri", "Kiri", "Tsu'tey"]
  },
  {
    name: "Colonel Miles Quaritch",
    image: "./images/character/kuritchHuman.jpg",
    options: ["Parker Selfridge", "Max Patel", "Colonel Miles Quaritch", "Lyle Wainfleet"]
  },
  {
    name: "Kiri",
    image: "./images/character/kiriPhoto.jpg",
    options: ["Grace Augustine", "Tuktirey", "Kiri", "Tsireya"]
  },
  {
    name: "Tonowari",
    image: "./images/character/tonowaryPhoto.jpg",
    options: ["Ronal", "Tonowari", "Ao'nung", "Eytukan"]
  }
];

let currentCharacterIndex = 0;
let stopwatchInterval;
let gameCompleted = false;
let gameStopped = true;
let correctGuess = false;
let stopwatchSeconds = 0;
let stopwatchMinutes = 0;

function startGame() {
    displayCharacter();
    gameCompleted = false;
    enableStartButton();
}

function displayCharacter() {
    const character = characters[currentCharacterIndex];
    const characterImage = document.querySelector('.game-img-box img');
    if (characterImage) {
        characterImage.src = character.image;
    }
    displayOptions();
}

function displayOptions() {
    const optionsDiv = document.getElementById('options');
    if (!optionsDiv) return;
    
    optionsDiv.innerHTML = '';
    const character = characters[currentCharacterIndex];
    
    character.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.onclick = () => {
            if (!gameStopped) {
                checkGuess(option);
            }
        };
        optionsDiv.appendChild(optionButton);
    });
}

function checkGuess(guess) {
    if (correctGuess) return;

    const character = characters[currentCharacterIndex];
    const optionsDiv = document.getElementById('options');
    const optionButtons = optionsDiv.querySelectorAll('.option');

    const clickedButton = Array.from(optionButtons).find(btn => btn.textContent === guess);

    if (guess === character.name) {
        correctGuess = true;
        
        optionButtons.forEach(button => button.disabled = true);
        
        clickedButton.classList.add('ok');

        setTimeout(() => {
            nextCharacter();
            correctGuess = false;
        }, 1000);
    } else {
        clickedButton.classList.add('error');
        
        clickedButton.disabled = true;
        clickedButton.style.opacity = "0.6";
        clickedButton.style.cursor = "not-allowed";
    }
}

function nextCharacter() {
    currentCharacterIndex++;
    if (currentCharacterIndex < characters.length) {
        displayCharacter();
    } else {
        stopStopwatch();
        const minutes = stopwatchMinutes < 10 ? '0' + stopwatchMinutes : stopwatchMinutes;
        const seconds = stopwatchSeconds < 10 ? '0' + stopwatchSeconds : stopwatchSeconds;
        const formattedTime = `${minutes}:${seconds}`;

        const resultEl = document.getElementById('result');
        if (resultEl) resultEl.innerText = `You completed the game in ${formattedTime}!`;
        
        gameCompleted = true;
        disableStartButton();
    }
}


function startStopwatch() {
    if (!gameCompleted && !stopwatchInterval) {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        gameStopped = false;
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    gameStopped = true;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    stopwatchMinutes = 0;
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = '00:00';
    
    currentCharacterIndex = 0;
    displayCharacter();
    
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.innerText = '';
    
    gameCompleted = false;
    gameStopped = true;
    enableStartButton();
}

function updateStopwatch() {
    stopwatchSeconds++;
    if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    const secondsDisplay = stopwatchSeconds < 10 ? `0${stopwatchSeconds}` : stopwatchSeconds;
    const minutesDisplay = stopwatchMinutes < 10 ? `0${stopwatchMinutes}` : stopwatchMinutes;
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = `${minutesDisplay}:${secondsDisplay}`;
}

function disableStartButton() {
    const btn = document.getElementById('start');
    if (btn) btn.disabled = true;
}

function enableStartButton() {
    const btn = document.getElementById('start');
    if (btn) btn.disabled = false;
}

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

if (startBtn) startBtn.addEventListener('click', startStopwatch);
if (stopBtn) stopBtn.addEventListener('click', stopStopwatch);
if (resetBtn) resetBtn.addEventListener('click', resetStopwatch);

window.onload = startGame;
