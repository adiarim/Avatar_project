const grid = document.querySelector('.characters-grid');
const characterModal = document.querySelector('.characters-detail');
const modalImg = document.querySelector(".char-poster");
const characterName = document.querySelector(".char-name");
const charModalClose = document.querySelector('.closeChar');


const characterDesc = document.querySelector(".char-desc");
const characterClan = document.querySelector(".char-clan");
const characterWeapon = document.querySelector(".char-weapon");

const defaultImg = "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg";

const charecterModalOpen = (character) => {
    modalImg.src = character.photo || defaultImg;
    modalImg.alt = character.name;
    characterName.innerText = character.name;

    const detailRequester = new XMLHttpRequest();
    detailRequester.open('GET', '../data/details.json');
    detailRequester.send();

    detailRequester.onload = () => {
        const detailData = JSON.parse(detailRequester.response);
        const info = detailData.characters_info.find(item => item.name === character.name);

        if (info) {
            characterDesc.innerText = info.description;
            characterClan.innerHTML = `<strong>Clan:</strong> ${info.clan}`;
            characterWeapon.innerHTML = `<strong>Weapon:</strong> ${info.weapon}`;

            characterName.style.textShadow = "none";
            characterModal.querySelector('.character-container').style.borderColor = "rgba(0, 242, 255, 0.3)";

            if (info.clan.includes("Omatikaya")) {
                characterName.style.color = "#2ecc71"; 
                characterName.style.textShadow = "0 0 10px #2ecc71";
            } else if (info.clan.includes("Metkayina")) {
                characterName.style.color = "#00f2ff"; 
                characterName.style.textShadow = "0 0 10px #00f2ff";
            } else if (info.clan.includes("Mangwan")) {
                characterName.style.color = "#ff4d4d"; 
                characterName.style.textShadow = "0 0 10px #ff4d4d";
            } else if (info.clan.includes("RDA")) {
                characterName.style.color = "#fdbb2d";
            } else {
                characterName.style.color = "#fff"; 
            }
        }
    };

    characterModal.classList.add("active");
};


charModalClose.onclick = () => {
    characterModal.classList.remove("active");
};

characterModal.addEventListener('click', (e) => {
  if (e.target === characterModal) {
    characterModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}); 


const requester = new XMLHttpRequest();
requester.open('GET', '../data/characters.json');
requester.send();

requester.onload = () => {
    const characters = JSON.parse(requester.response);
    grid.innerHTML = "";
    
    characters?.forEach((char) => {
        const card = document.createElement('div');
        card.classList.add("character-card");
        
        card.innerHTML = `
            <div class="character-photo">
                <img src="${char.photo || defaultImg}" alt="${char.name}">
            </div>
            <h3>${char.name}</h3>
        `;

        card.onclick = () => {
            charecterModalOpen(char);
        };

        grid.append(card);
    });
};