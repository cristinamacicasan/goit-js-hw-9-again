
// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix";





const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startDate = new Date();
    const endDate = new Date(selectedDates[0]);

    const startButton = document.querySelector('[data-start]');
    startButton.disabled = endDate <= startDate;

   if (endDate <= startDate) {
  Notiflix.Notify.failure("Please choose a date in the future");
}
  },
};

flatpickr("#datetime-picker", options);

let intervalId;

document.querySelector('[data-start]').addEventListener('click', () => {
  const endDate = new Date(document.querySelector('#datetime-picker').value);
  const now = new Date();

  const timeDifference = endDate - now;

  intervalId = setInterval(() => {
    const timeRemaining = convertMs(timeDifference);
    updateUI(timeRemaining);

    if (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      clearInterval(intervalId);
      window.alert("Countdown complete!");
    }
  }, 1000);
});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}





function updateUI(timeRemaining) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(timeRemaining.days);
  hoursElement.textContent = addLeadingZero(timeRemaining.hours);
  minutesElement.textContent = addLeadingZero(timeRemaining.minutes);
  secondsElement.textContent = addLeadingZero(timeRemaining.seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
