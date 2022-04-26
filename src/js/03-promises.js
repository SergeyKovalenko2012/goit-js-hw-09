import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  // delay: document.querySelector('[name = delay]'),
  // step: document.querySelector('[name = step]'),
  // amount: document.querySelector('[name = amount]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onSubmit = e => {
  e.preventDefault();

  const delay = e.currentTarget.elements.delay.value;
  const step = e.currentTarget.elements.step.value;
  const amount = e.currentTarget.elements.amount.value;

  for (let i = 1; i <= amount; i += 1) {
    const newDelay = delay + step * (i - 1);
    // console.log({ i, newDelay });
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  refs.form.reset();
};

refs.form.addEventListener('submit', onSubmit);
