const cityInput = document.querySelector(".cityName");
const btnSearch = document.querySelector("#search");
const cityNameDisplay = document.querySelector(".city"); 
const tempText = document.querySelector(".temp");

const KEY = '83b3ebd39b878f8be8acd104821aa61a';
const BASE_API = 'https://api.openweathermap.org/data/2.5/weather';

btnSearch.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city === '') {
        if(cityNameDisplay) cityNameDisplay.innerHTML = 'Enter a city';
        return;
    }

    fetch(`${BASE_API}?q=${city}&units=metric&lang=ru&appid=${KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); 
            const { name, main: { temp } } = data;
            
            if(cityNameDisplay) cityNameDisplay.innerHTML = name;
            if(tempText) tempText.innerHTML = `${Math.round(temp)}°C`;
        })
        .catch(err => {
            if(cityNameDisplay) cityNameDisplay.innerHTML = 'City not found. Please try again';
            if(tempText) tempText.innerHTML = '';
            console.error("Something went wrong:", err);
        });

    cityInput.value = '';
});

console.log(new Date(1768476128 * 1000));


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
    let stopwatchValue = 0;
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
    characterImage.src = character.image;
    displayOptions(); 
  }
  
  function displayOptions() {
    const optionsDiv = document.getElementById('options');
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
    if (correctGuess) {
      return;
    }
  
    const character = characters[currentCharacterIndex];
    const optionsDiv = document.getElementById('options');
    const optionButtons = optionsDiv.querySelectorAll('.option');
  
    optionButtons.forEach(button => {
      button.disabled = true; 
    });
  
    if (guess === character.name) {
      optionButtons.forEach(button => {
        if (button.textContent === guess) {
          button.classList.add('ok');
        } else {
          button.classList.add('disabled');
        }
      });
      correctGuess = true; 
      setTimeout(() => {
        nextCharacter();
        optionButtons.forEach(button => {
          button.classList.remove('ok', 'disabled');
          button.disabled = false; 
        });
        correctGuess = false; 
      }, 1000);
    } else {
      optionButtons.forEach(button => {
        if (button.textContent === guess) {
          button.classList.add('error');
        } else {
          button.classList.add('disabled');
        }
      });
      setTimeout(() => {
        optionButtons.forEach(button => {
          button.classList.remove('error', 'disabled');
          button.disabled = false; 
        });
      }, 1000);
    }
  }
  function nextCharacter() {
    currentCharacterIndex++;
  
    if (currentCharacterIndex < characters.length) {
      displayCharacter();
    } else {
      stopStopwatch();
  
      const totalSeconds = stopwatchMinutes * 60 + stopwatchSeconds;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      document.getElementById('result').innerText = `You completed the game in ${formattedTime}!`;
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
    document.getElementById('timer').textContent = '00:00';
    currentCharacterIndex = 0;
    displayCharacter();
    document.getElementById('result').innerText = '';
    document.getElementById('timer').textContent = '00:00';
    stopwatchValue = 0;
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
  
    document.getElementById('timer').textContent = `${minutesDisplay}:${secondsDisplay}`;
  }
  
  function disableStartButton() {
    const startButton = document.getElementById('start');
    startButton.disabled = true;
  }
  
  function enableStartButton() {
    const startButton = document.getElementById('start');
    startButton.disabled = false;
  }
  
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const resetButton = document.getElementById('reset');
  
  startButton.addEventListener('click', startStopwatch);
  stopButton.addEventListener('click', stopStopwatch);
  resetButton.addEventListener('click', resetStopwatch);
  
  window.onload = startGame;
  

