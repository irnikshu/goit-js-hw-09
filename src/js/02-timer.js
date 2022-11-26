import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

let timerID = null;
let userDate = null;
// startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
   
            Notiflix.Notify.info('Please choose a date in the future'),
                startBtn.disabled = true
        } else {
            startBtn.disabled = false;
            userDate = selectedDates[0];
        }
  },
};

const calendar = flatpickr('#datetime-picker', options);

function convertMs(ms) {
     const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      return { days, hours, minutes, seconds };
}
 
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }

startBtn.addEventListener('click', startTimer);


function startTimer() {
    timerID = setInterval(countTimer, 1000);
    startBtn.disabled = true;
    input.disabled = true;
    
}

function countTimer() {
   const deltaTime = userDate - Date.now();
    let { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (userDate <= Date.now()) {
        Notiflix.Notify.info('Please choose a date in the future');
        clearInterval(timerID);
        // startBtn.disabled = false;
        input.disabled = false;
    }
    if (deltaTime <= 1000) {
        clearInterval(timerID);
        // startBtn.disabled = true;
   input.disabled = true;
  }
    updateCountTimer({ seconds, minutes, hours, days });
    
}

function updateCountTimer({ seconds, minutes, hours, days }) {
 secondsField.textContent = seconds;
 minutesField.textContent = minutes;
  hoursField.textContent = hours;
  daysField.textContent = days;
}


