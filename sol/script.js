const track = document.querySelector('.product-track');
const cardWidth = () => track.querySelector('.product-card').getBoundingClientRect().width + 20;

document.querySelector('.slider-arrow.next').addEventListener('click', () => {
  track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
});

document.querySelector('.slider-arrow.prev').addEventListener('click', () => {
  track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
});

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: 'smooth' }));
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const range = document.querySelector('#flavor-range');
const matchImage = document.querySelector('#match-image');
const matchTitle = document.querySelector('#match-title');
const flavorButton = document.querySelector('#flavor-button');
const matches = [
  { max: 25, title: 'Happy-Cola', image: 'assets/happy-cola.png', mood: 'SMOOTH & NOSTALGIC' },
  { max: 50, title: 'Goldbears', image: 'assets/goldbears.png', mood: 'CLASSICALLY HAPPY' },
  { max: 75, title: 'Twin Snakes', image: 'assets/twin-snakes.png', mood: 'SWEET WITH A TWIST' },
  { max: 101, title: 'Sour Goldbears', image: 'assets/sour-goldbears.png', mood: 'MAXIMUM TANG' }
];

function updateRange() {
  range.style.setProperty('--value', `${range.value}%`);
}
range.addEventListener('input', updateRange);

flavorButton.addEventListener('click', () => {
  const pick = matches.find(item => Number(range.value) < item.max);
  matchImage.classList.remove('pop');
  void matchImage.offsetWidth;
  matchImage.src = pick.image;
  matchImage.alt = `HARIBO ${pick.title}`;
  matchTitle.textContent = pick.title;
  document.querySelector('.match-name small').textContent = pick.mood;
  matchImage.classList.add('pop');
});

document.querySelector('.signup-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('.form-message').textContent = `Sweet! We’ll save a happy spot for ${email.value}.`;
  email.value = '';
});

updateRange();
