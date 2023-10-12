let startTime;
let runningInterval;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (runningInterval) {
        clearInterval(runningInterval);
        runningInterval = null;
        startStopButton.textContent = 'Start';
    } else {
        //startTime = performance.now() - (elapsedTime || 0);   // was using Date.now(), switched to performance.now()
	    startTime = performance.now();                          // get start time using performance.now()
        runningInterval = setInterval(updateDisplay, 1);   // changed from 10 to 1 for more precision when displaying and stopping
        startStopButton.textContent = 'Stop';
    }
});

lapButton.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
});

resetButton.addEventListener('click', () => {
    clearInterval(runningInterval);
    runningInterval = null;
    elapsedTime = 0;
    display.textContent = '00:00.000';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = '';
});

function updateDisplay() {
    elapsedTime = performance.now() - startTime;   // was using Date.now(), switched to performance.now()
    //console.log(elapsedTime);                      // for debugging
    display.textContent = formatTime(elapsedTime);
}

function formatTime(timeInMilliseconds) {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const msecs = Math.floor(timeInMilliseconds % 1000);
    
	//const tenths = Math.floor((timeInMilliseconds % 1000) / 100);      // re-tooled for msec precision
    //const hundredths = Math.floor((timeInMilliseconds % 1000) / 10);
    //const thousandths = Math.floor((timeInMilliseconds % 1000) / 1);
    //return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(msecs).padStart(3, '0')}`;   // updated display for minutes : seconds . msec
}