const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownRunning;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set minimum value of Countdown to Today
var today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// update DOM

function updateDOM() {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance % minute)/second); 

    // Hide input & show Countdown
    inputContainer.hidden = true;

    // Show completion if countdown over
if (distance < 0) {
    countdownEl.hidden = true;
    completeEl.hidden = false;
    clearInterval(countdownRunning);
    completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
} else //. Show Countdown in prgress
{completeEl.hidden = true; 
countdownEl.hidden = false;

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
}
}



// Take values from form input
function updateCountdown(e) {
e.preventDefault();
countdownTitle = e.srcElement[0].value;
countdownDate = e.srcElement[1].value;
savedCountdown = {
    title: countdownTitle,
    date: countdownDate
};
localStorage.setItem('countdown', JSON.stringify(savedCountdown));
// Get number version of current Date, update DOM
countdownValue = new Date(countdownDate).getTime();
updateDOM();
countdownRunning = setInterval(updateDOM,second);
}


function reset() {
  // Show input & hide Countdown
    inputContainer.hidden = false;
    countdownEl.hidden = true;  
    completeEl.hidden = true;
    clearInterval(countdownRunning);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
 }

function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
countdownRunning = setInterval(updateDOM,second);
    } 
}



// Event listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();