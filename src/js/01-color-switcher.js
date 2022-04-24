function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let colorPalette = null;
refs.stop.disabled = true;

refs.start.addEventListener('click', onBtnStart);
refs.stop.addEventListener('click', onBtnStop);

function onBtnStart() {
  colorPalette = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function onBtnStop() {
  clearInterval(colorPalette);

  refs.start.disabled = false;
  refs.stop.disabled = true;
}
