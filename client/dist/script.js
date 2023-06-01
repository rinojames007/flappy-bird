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
let isJumping = false;
let animationId;
// this is this jumping stuff
function jump() {
    if (!isJumping) {
        isJumping = true;
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(() => {
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-30deg)';
    }
    else {
        fall();
    }
}
// function for the bird to come down
function fall() {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}
function animate() {
    if (isJumping) {
        fall();
        if (birdElement.style.top === '850px') {
            cancelAnimationFrame(animationId);
            animationId = 0;
            birdElement.style.top = '850px';
            return;
        }
    }
    else {
        isJumping = false;
    }
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
function generatePipeHeight() {
    // Define the minimum and maximum heights for the pipes
    const minHeight = 30;
    const maxHeight = 45;
    // Generate a random height for the pipe
    const pipeHeight = `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}%`;
    return pipeHeight;
}
// pipe
const pipeContainer = document.getElementById('pipe-container');
// an array which will stores the generated pipes
let pipes = [];
let pipeNumber = 0;
//pipe generation
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
    upperElement.style.height = generatePipeHeight();
    lowerElement.setAttribute('width', '400px');
    lowerElement.style.height = generatePipeHeight();
    //pipe insertion
    pipes.push(upperElement);
    pipes.push(lowerElement);
    pipeContainer.appendChild(pipes[0]);
    pipeContainer.appendChild(pipes[1]);
    pipes = [];
}
setInterval(() => {
    createPipe();
}, 3000);
