let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const lapSound = document.getElementById("lapSound");

function timeToString(time) {
  const ms = time % 1000;
  const s = Math.floor(time / 1000) % 60;
  const m = Math.floor(time / 60000) % 60;
  const h = Math.floor(time / 3600000);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${ms.toString().padStart(3,'0')}`;
}

function pad(unit) {
  return unit.toString().padStart(2, '0');
}

function printTime() {
  display.textContent = timeToString(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      printTime();
    }, 10);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  printTime();
  laps.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = timeToString(elapsedTime);
    laps.prepend(li);
    lapSound.play();

    // Highlight last lap
    document.querySelectorAll('#laps li').forEach(el => el.classList.remove('highlight'));
    li.classList.add('highlight');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
