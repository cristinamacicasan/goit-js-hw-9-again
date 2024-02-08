


import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements['delay'].value, 10);
  const delayStep = parseInt(this.elements['step'].value, 10);
  const amount = parseInt(this.elements['amount'].value, 10);

  if (isNaN(firstDelay) || isNaN(delayStep) || isNaN(amount)) {
    Notiflix.Notify.failure('Please enter valid numbers for all fields');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * delayStep;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}







