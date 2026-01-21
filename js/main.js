const buttonsColor = document.querySelectorAll('.btn-color'); 
const avatarColor = document.querySelector('#av-color');
const sliderTitleColor = document.querySelector('.slider_title');
const btnColor = document.querySelectorAll('.btn-color');
 
const generateRandomColor = () => { 
    const hexCodes = '0123456789ABCDEF' 
    let color = '' 
    for (let i = 0; i < 6; i++) { 
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)] 
    } 
    return '#' + color 
} 
 
const setRandomColors = () => { 
    buttonsColor.forEach((buttonColor) => { 
        buttonColor.innerHTML = generateRandomColor() 
        buttonColor.onclick = (event) => { 
            avatarColor.style.color = event.target.innerHTML 
        } 
    }) 
} 
 
window.onload = () => setRandomColors() 
window.onkeydown = (event) => { 
    if (event.code.toLowerCase() === 'space') { 
        event.preventDefault() 
        setRandomColors() 
    } 
}


const modalOverlay = document.querySelector('#modal');
const openBtn = document.querySelector('#btn-get');
const closeBtn = document.querySelector('.modal-close');

openBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

function showModalScroll() {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight - 10
  ) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    window.removeEventListener('scroll', showModalScroll);
  }
}

window.addEventListener('scroll', showModalScroll);

const modalTime = setTimeout(showModalScroll, 10000);

const modalForm = document.querySelector('.modal-form');
const naviBtnText = document.querySelector('#btn-get .btn-lines');

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  clearTimeout(modalTime);
}

closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});


window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('naviName');
    if (savedName) {
        naviBtnText.innerText = `Welcome, ${savedName}`;
    }
});

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = modalForm.querySelector('input[type="text"]');
    const userName = nameInput.value.trim();
    
    if (userName) {
        localStorage.setItem('naviName', userName); 
        naviBtnText.innerText = `Welcome, ${userName}`;
        
        closeModal(); 
        
        nameInput.value = '';
    }
});


const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

let currentIndex = 0;

if (slides.length === 0) {
    console.warn("Слайды не найдены на этой странице.");
} else {
    function hideSlides() {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active_slide');
        });
    }

    function showSlide(index) {
        if (slides[index]) { 
            slides[index].style.display = 'block';
            slides[index].classList.add('active_slide');
        }
    }

    hideSlides();
    showSlide(currentIndex);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            hideSlides();
            showSlide(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            hideSlides();
            showSlide(currentIndex);
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        hideSlides();
        showSlide(currentIndex);
    }, 5000);
}

// console.log(tabs);


// const modal = document.querySelector('.modal');
// const modalClose = document.querySelector('.modal_close');
// const openModal = document.querySelector('#btn-get')

// function showModal() {
//     modal.style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// modalClose.addEventListener('click', () => {
//     modal.style.display = 'none';
//     document.body.style.overflow = '';
// });

// modal.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         modal.style.display = 'none';
//         document.body.style.overflow = '';
//     }
// });

// scrollY — сколько прокрутили сверху
// clientHeight — высота видимой области
// scrollHeight — вся высота страницы
// Когда сумма ≥ всей высоты — пользователь внизу

// function showModalScroll() {
//     if (window.scrollY + document.documentElement.clientHeight >=
//         document.documentElement.scrollHeight) { //Проверка «дошёл ли до низа»

//             modal.style.display = 'block';
//             document.body.style.overflow = 'hidden'; 

//             window.removeEventListener('scroll', showModalScroll);
//         }
// }

// window.addEventListener('scroll', showModalScroll);

// const modalTime = setTimeout(showModal, 10000);
//вызывать модалку через 10 секунд











