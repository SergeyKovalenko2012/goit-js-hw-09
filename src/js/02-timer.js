// Описан в документации
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputField: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;

// let globalDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];
    const unixDate = new Date(date).getTime();
    // globalDate = unixDate;
    const now = new Date().getTime();

    if (unixDate <= now) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else refs.start.disabled = false;
  },
};

flatpickr(refs.inputField, options);

const onStart = () => {
  const date = refs.inputField.value;
  const unixDate = new Date(date).getTime();

  const intervalId = setInterval(() => {
    const now = new Date().getTime();
    const delta = unixDate - now;
    if (delta > 0) {
      setTimer(convertMs(delta));
    } else {
      clearInterval(intervalId);
      Notiflix.Notify.success('Timer ended!');
    }
  }, 1000);
};

const setTimer = ({ days, hours, minutes, seconds }) => {
  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.minutes.innerHTML = minutes;
  refs.seconds.innerHTML = seconds;
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

refs.start.addEventListener('click', onStart);
