


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

let intervalId;

function startColorChange() {
  const startButton = document.querySelector('[data-start]');
  const body = document.body;

  startButton.disabled = true;

  
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}


function stopColorChange() {
  const startButton = document.querySelector('[data-start]');
  const body = document.body;

  startButton.disabled = false;
  clearInterval(intervalId);
  body.style.backgroundColor = '';
}



document.querySelector('[data-start]').addEventListener('click', startColorChange);
document.querySelector('[data-stop]').addEventListener('click', stopColorChange);

