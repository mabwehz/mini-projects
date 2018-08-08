// global variables
let images = [];
let slideIndex = 0;
let timeSlider = document.querySelector("input[type='range']");
let timeIndicator = document.querySelector(".slide-show-timer-display span");
let time = timeSlider.value;
let slideshow;

// ======= utility functions ============= //
// return a precise round up of a number
const precisionRound = (number, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

const setTimeIndicator = (time) => {
    // time is in milliseconds, convert to seconds using formular; 1000 milliseconds = 1 second;
    return `${precisionRound(time * 0.001, 2)} ${time > 1000 ? 'seconds' : 'second'}`;
}

// assign images
images[0] = './images/duty_above_pleasure.jpg';
images[1] = './images/fear_God.png';
images[2] = './images/strive_for_righteousness.png';
images[3] = './images/strive_for_virtue.jpg';
images[4] = './images/take_back_your_future.jpg';
images[5] = './images/you_have_power_over_your_mind.png';

// set slideshow speed
timeSlider.oninput = applyTimer;

// set current seconds
timeIndicator.innerHTML = setTimeIndicator(time);

function applyTimer() {
    time = this.value;
    timeIndicator.innerHTML = setTimeIndicator(this.value);
}

// change images
function changeImage() {
    // assign image to current slide
    document.slide.src = images[slideIndex];

    if (slideIndex < (images.length - 1)) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }

    // console.log(document.slide);

    slideshow = setTimeout(changeImage, time);
}

// pause slideshow
document.slide.addEventListener('mouseover', () => {
    clearTimeout(slideshow);
    showAlert("pause it");
});

// play slideshow
document.slide.addEventListener('mouseout', () => {
    changeImage();
    showAlert('');
});

function showAlert(message) {
    document.getElementById('alert').innerHTML = message;
}
// change images on window load
window.onload = changeImage();