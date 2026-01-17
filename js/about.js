const cityInput = document.querySelector(".cityName");
const btnSearch = document.querySelector("#search");
const cityNameDisplay = document.querySelector(".city"); 
const tempText = document.querySelector(".temp");

const KEY = '83b3ebd39b878f8be8acd104821aa61a';
const BASE_API = 'https://api.openweathermap.org/data/2.5/weather';

if (btnSearch && cityInput) {
    btnSearch.addEventListener('click', () => {
        const city = cityInput.value.trim();

        if (city === '') {
            if(cityNameDisplay) cityNameDisplay.innerHTML = 'Enter a city';
            return;
        }

        fetch(`${BASE_API}?q=${city}&units=metric&lang=ru&appid=${KEY}`)
            .then(response => {
                if (!response.ok) throw new Error('City not found');
                return response.json();
            })
            .then(data => {
                const { name, main: { temp } } = data;
                if(cityNameDisplay) cityNameDisplay.innerHTML = name;
                if(tempText) tempText.innerHTML = `${Math.round(temp)}°C`;
            })
            .catch(err => {
                if(cityNameDisplay) cityNameDisplay.innerHTML = 'Not found';
                if(tempText) tempText.innerHTML = '';
            });

        cityInput.value = '';
    });
}


const somInput = document.querySelector("#som");
const yuanInput = document.querySelector("#yuan");
const usdInput = document.querySelector("#usd");

const converter = (element) => {
    if (!element) return; 

    element.oninput = () => {
        const requester = new XMLHttpRequest();
        requester.open('GET', '../data/converter.json');
        requester.setRequestHeader('Content-Type', 'application/json');
        requester.send();

        requester.onload = () => {
            const data = JSON.parse(requester.response);
            п
            localStorage.setItem('lastConvertedValue', element.value);
            localStorage.setItem('lastConvertedId', element.id);

            if (element.value === '') {
                somInput.value = '';
                yuanInput.value = '';
                usdInput.value = '';
                return;
            }

            const val = parseFloat(element.value);

            if (element.id === 'som') {
                usdInput.value = (val / data.usd).toFixed(2);
                yuanInput.value = (val / (data.usd / data.yuan)).toFixed(2);
            } else if (element.id === 'yuan') {
                somInput.value = (val * (data.usd / data.yuan)).toFixed(2);
                usdInput.value = (val / data.yuan).toFixed(2);
            } else if (element.id === 'usd') {
                somInput.value = (val * data.usd).toFixed(2);
                yuanInput.value = (val * data.yuan).toFixed(2);
            }
        };
    };
};

converter(somInput);
converter(usdInput);
converter(yuanInput);

window.addEventListener('load', () => {
    const lastVal = localStorage.getItem('lastConvertedValue');
    const lastId = localStorage.getItem('lastConvertedId');
    if (lastVal && lastId) {
        const targetInput = document.getElementById(lastId);
        if (targetInput) {
            targetInput.value = lastVal;
            targetInput.dispatchEvent(new Event('input')); 
        }
    }
});

const audio = document.querySelector('#pandora-audio');
const audioBtn = document.querySelector('#audio-control-btn');

audioBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audio.volume = 0.4; 
        audioBtn.innerHTML = "⏸ Stop Ambience";
        audioBtn.classList.add('playing');
    } else {
        audio.pause();
        audioBtn.innerHTML = "🍃 Listen to Pandora";
        audioBtn.classList.remove('playing');
    }
});

const magicSpotlight = document.createElement('div');
magicSpotlight.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 242, 255, 0.07) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
`;
document.body.appendChild(magicSpotlight);

window.addEventListener('mousemove', (e) => {
    magicSpotlight.style.left = e.clientX + 'px';
    magicSpotlight.style.top = e.clientY + 'px';
});


const WILDLIFE_API = [
  {
    id: 1,
    name: "Great Leonopteryx",
    naviName: "Toruk",
    image: "./images/fauna-flora/toruk.jpg"
  },
  {
    id: 2,
    name: "Tulkun",
    naviName: "Tulkun",
    image: "./images/fauna-flora/TulkunPhoto.jpg"
  },
  {
    id: 3,
    name: "The Hometree",
    naviName: "Kelutral",
    image: "./images/fauna-flora/hometrhee.jpg"
  },
  {
    id: 4,
    name: "Ilu",
    naviName: "Marine Mount of the Metkayina Clan",
    image: "./images/fauna-flora/Ilu_claimPhoto.jpg"
  },
  {
    id: 5,
    name: "Tree of Souls",
    naviName: "Vitraya Ramunong",
    image: "./images/fauna-flora/threeAvatar.jpg"
  },
  {
    id: 6,
    name: "Tithonethere",
    naviName: "Tithonethere",
    image: "./images/fauna-flora/fauna-tithonethere.webp"
  },
  {
    id: 7,
    name: "Vanraykan",
    naviName: "Kelutral",
    image: "./images/fauna-flora/VunraykanPhoto.jpg"
  }
];

const MAX_WILDLIFE = WILDLIFE_API.length;
let wildlifeId = 1;

const wildlifeCard = document.querySelector("#wildlife-card");
const nextWildBtn = document.querySelector("#btn-next-wild");
const prevWildBtn = document.querySelector("#btn-prev-wild");

const wildlifeSwitcher = (id) => {
    const data = WILDLIFE_API.find(item => item.id === id);

    if (!data) {
        wildlifeCard.innerHTML = `<p style="color: red">Creature not found</p>`;
    } else {
        const { name, naviName, image } = data;
        
        wildlifeCard.innerHTML = `
            <div class="card-content">
                <div class="card-img-box">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="card-info">
                    <h3>${name}</h3>
                    <h4 style="color: var(--blue)">${naviName}</h4>
                </div>
            </div>
        `;
    }
}

wildlifeSwitcher(wildlifeId);


nextWildBtn.addEventListener('click', () => {
    wildlifeId = (wildlifeId >= MAX_WILDLIFE) ? 1 : wildlifeId + 1;
    wildlifeSwitcher(wildlifeId);
});

prevWildBtn.addEventListener('click', () => {
    wildlifeId = (wildlifeId <= 1) ? MAX_WILDLIFE : wildlifeId - 1;
    wildlifeSwitcher(wildlifeId);
});