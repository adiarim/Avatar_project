const moreButtons = document.querySelector('#btn1');
const detail = document.querySelector('#moviesDetail1');
const closeButton = document.querySelector('#closeDetail1');
const card1 = document.querySelector('#card1');


card1.addEventListener('click', () => {
  detail.classList.add('active');
  document.body.style.overflow = 'hidden';
});

moreButtons.addEventListener('click', () => {
    detail.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

closeButton.addEventListener('click', () => {
  detail.classList.remove('active');
  document.body.style.overflow = '';
});

detail.addEventListener('click', (e) => {
  if (e.target === detail) {
    detail.classList.remove('active');
    document.body.style.overflow = '';
  }
}); 

const moreButtons1 = document.querySelector('#btn2');
const detail1 = document.querySelector('#moviesDetail2');
const closeButton1 = document.querySelector('#closeDetail2');
const card2 = document.querySelector('#card2');

card2.addEventListener('click', () => {
  detail1.classList.add('active');
  document.body.style.overflow = 'hidden';
});

moreButtons1.addEventListener('click', () => {
    detail1.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

closeButton1.addEventListener('click', () => {
  detail1.classList.remove('active');
  document.body.style.overflow = '';
});

detail1.addEventListener('click', (e) => {
  if (e.target === detail1) {
    detail1.classList.remove('active');
    document.body.style.overflow = '';
  }
}); 

const moreButtons2 = document.querySelector('#btn3');
const detail2 = document.querySelector('#moviesDetail3');
const closeButton2 = document.querySelector('#closeDetail3');
const card3 = document.querySelector('#card3');

card3.addEventListener('click', () => {
  detail2.classList.add('active');
  document.body.style.overflow = 'hidden';
});

moreButtons2.addEventListener('click', () => {
    detail2.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

closeButton2.addEventListener('click', () => {
  detail2.classList.remove('active');
  document.body.style.overflow = '';
});

detail2.addEventListener('click', (e) => {
  if (e.target === detail2) {
    detail2.classList.remove('active');
    document.body.style.overflow = '';
  }
}); 