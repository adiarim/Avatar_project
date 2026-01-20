const grid = document.querySelector('.characters-grid');
const characterModal = document.querySelector('.characters-detail');
const modalImg = document.querySelector(".char-poster");
const characterName = document.querySelector(".char-name");
const charModalClose = document.querySelector('.closeChar');
const characterDesc = document.querySelector(".char-desc");
const characterClan = document.querySelector(".char-clan");
const characterWeapon = document.querySelector(".char-weapon");
const mainBtn = document.querySelector('.main-filter-btn');
const options = document.querySelector('.filter-options');

const defaultImg = "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg";

let allCharacters = [];

const renderCharacters = (data) => {
    grid.innerHTML = "";
    data.forEach((char) => {
        const card = document.createElement('div');
        card.classList.add("character-card");
        card.innerHTML = `
            <div class="character-photo">
                <img src="${char.photo || defaultImg}" alt="${char.name}">
            </div>
            <h3>${char.name}</h3>
        `;
        card.onclick = () => charecterModalOpen(char);
        grid.append(card);
    });
};

const fetchCharacters = async () => {
    try {
        const response = await fetch('../data/characters.json');
        allCharacters = await response.json();
        renderCharacters(allCharacters);
    } catch (error) {
        console.error("Ошибка загрузки персонажей:", error);
    }
};

const filterByClan = (selectedClan) => {
    if (selectedClan === 'all') {
        renderCharacters(allCharacters);
    } else {
        const filtered = allCharacters.filter(char => {
            return char.clan && char.clan.includes(selectedClan);
        });
        renderCharacters(filtered);
    }
};


const charecterModalOpen = async (character) => {
    modalImg.src = character.photo || defaultImg;
    characterName.innerText = character.name;

    try {
        const response = await fetch('../data/details.json');
        const detailData = await response.json();
        const info = detailData.characters_info.find(item => item.name === character.name);

        if (info) {
            characterDesc.innerText = info.description;
            characterClan.innerHTML = `<strong>Clan:</strong> ${info.clan}`;
            characterWeapon.innerHTML = `<strong>Weapon:</strong> ${info.weapon}`;
            
            applyClanStyles(info.clan);
        }
    } catch (e) { console.log(e); }

    characterModal.classList.add("active");
};

const applyClanStyles = (clan) => {
    characterName.style.textShadow = "none";
    const container = characterModal.querySelector('.character-container');
    container.style.borderColor = "rgba(0, 242, 255, 0.3)";

    if (clan.includes("Omatikaya")) {
        characterName.style.color = "#2ecc71"; 
    } 
    else if (clan.includes("Metkayina")) {
        characterName.style.color = "#00f2ff"; 
    } 
    else if (clan.includes("Mangwan")) {
        characterName.style.color = "#ff4d4d"; 
        container.style.borderColor = "#ff4d4d";
    } 
    else if (clan.includes("Tlalim")) {
        characterName.style.color = "#f1c40f";
        container.style.borderColor = "#f1c40f";
    } 
    else if (clan.includes("RDA")) {
        characterName.style.color = "#fdbb2d";
    } 
    else if (clan.includes("Human")) {
        characterName.style.color = "#ecf0f1"; 
    } 
    else {
        characterName.style.color = "#fff"; 
    }
};

mainBtn.addEventListener('click', () => {
    options.classList.toggle('hidden');
});

options.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        const clan = e.target.getAttribute('data-clan'); 
        const label = e.target.textContent;
        
        mainBtn.innerHTML = `${label} <span class="arrow">▼</span>`;
        options.classList.add('hidden');
        
        filterByClan(clan); 
    }
});

charModalClose.onclick = () => characterModal.classList.remove("active");

fetchCharacters();