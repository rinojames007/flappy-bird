"use strict";
// get the bird element
const birdElement = document.querySelector('#bird');
// extract the css property of bird
const birdStyle = window.getComputedStyle(birdElement);
// in order to make the bird down smoothly
const gravity = 1.9;
const velocity = 70;
// since we have to make the bird jump and so on, therefore we have to extract the top value
let positionY = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));
let isJumped = false;
let animationId;
// pipe
const pipeContainer = document.getElementById('pipe-container');
// an array which will stores the generated pipes
let upperPipes = [];
let lowerPipes = [];
let pipeNumber = 0;
const screenHeight = window.innerHeight;
// this is this jumping stuff
function jump() {
    if (!isJumped) {
        isJumped = true;
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(() => {
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-30deg)';
    }
}
// function for the bird to come down
function fall() {
    if (isJumped) {
        positionY += gravity;
        birdElement.style.top = positionY + 'px';
    }
}
function animate() {
    fall();
    if (birdElement.style.top === '850px') {
        cancelAnimationFrame(animationId);
        animationId = 0;
        birdElement.style.top = '850px';
        isJumped = false;
        return;
    }
    ;
    animationId = requestAnimationFrame(animate);
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}
animate();
// an event listener that will make the bird jump once space bar is pressed
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // making sure the animation id is 0 for the animation to begin
        if (!animationId) {
            // Start the animation only if it's not already running
            animate();
        }
        jump();
    }
});
//upper generation
function createPipe() {
    let upperElement = document.createElement('img');
    let lowerElement = document.createElement('img');
    // pipe init
    upperElement.classList.add('pipe-upper');
    lowerElement.classList.add('pipe-lower');
    upperElement.src = "assets/pipe.png";
    lowerElement.src = "assets/pipe.png";
    //setting height and width
    upperElement.setAttribute('width', '400px');
    upperElement.setAttribute('height', '40%');
    lowerElement.setAttribute('width', '400px');
    lowerElement.setAttribute('height', '40%');
    //pipe insertion
    upperPipes.push(upperElement);
    lowerPipes.push(lowerElement);
    pipeContainer.appendChild(upperPipes[pipeNumber]);
    pipeContainer.appendChild(lowerPipes[pipeNumber]);
    pipeNumber++;
}
;
setInterval(() => {
    createPipe();
}, 3000);
