const somInput = document.querySelector("#som");
const yuanInput = document.querySelector("#yuan");
const usdInput = document.querySelector("#usd");

const converter = (element) => {
    element.oninput = () => {
        const requester = new XMLHttpRequest();
        requester.open('GET', '../data/converter.json');
        requester.setRequestHeader('Content-Type', 'application/json');
        requester.send();

        requester.onload = () => {
            const data = JSON.parse(requester.response);
            

            const yuanToSom = data.usd / data.yuan;

            if (element.value === '') {
                somInput.value = '';
                yuanInput.value = '';
                usdInput.value = '';
                return;
            }


            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                yuanInput.value = (element.value / yuanToSom).toFixed(2);
            } else if (element.id === 'yuan') {
                somInput.value = (element.value * yuanToSom).toFixed(2);
                usdInput.value = (element.value / data.yuan).toFixed(2);
            } else if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                yuanInput.value = (element.value * data.yuan).toFixed(2);
            }
        };
    };
};

converter(somInput);
converter(usdInput);
converter(yuanInput);

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
