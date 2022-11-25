const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

// stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener('click', startChangeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);

function startChangeBodyColor(event) {
    timerId = setInterval(backgroundColor, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function backgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function stopChangeBodyColor() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};


