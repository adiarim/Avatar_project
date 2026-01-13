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
            
            // Вычисляем кросс-курс на основе данных из JSON
            const yuanToSom = data.usd / data.yuan;

            if (element.value === '') {
                somInput.value = '';
                yuanInput.value = '';
                usdInput.value = '';
                return;
            }

            // Логика конвертации
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