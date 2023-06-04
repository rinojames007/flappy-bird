"use strict";
const birdElement = document.querySelector('#bird');
const birdStyle = window.getComputedStyle(birdElement);
const gravity = 1.9;
const velocity = 70;
const pipeContainer = document.getElementById('pipe-container');
const scoreElement = document.getElementById('score');
let positionY = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));
let isJumping = false;
let firstJump = true;
let animationId;
let isPaused = false;
let pipes = [];
let score = 0;
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
function fall() {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}
function animate() {
    fall();
    animationId = requestAnimationFrame(animate);
    if (firstJump) {
        if (birdElement.style.top === '850px') {
            cancelAnimationFrame(animationId);
            animationId = 0;
            birdElement.style.top = '850px';
            return;
        }
    }
    else {
        if (birdElement.style.top === '850px') {
            cancelAnimationFrame(animationId);
            animationId = 0;
            birdElement.style.top = '0';
            console.log("game over buddy");
            return;
        }
    }
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}
document.addEventListener('keydown' || 'touchstart', (event) => {
    if (event.code === 'Space') {
        isJumping = false;
        // making sure the animation id is 0 for the animation to begin
        if (!animationId) {
            // Start the animation only if it's not already running
            animate();
        }
        jump();
    }
    else if (event.code === 'KeyP') {
        if (isPaused) {
            isPaused = false;
            animate();
        }
        else {
            isPaused = true;
            console.log("stop the pipes!!!");
            cancelAnimationFrame(animationId);
        }
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
function initializePipeElement(element, source) {
    element.src = source;
    element.setAttribute('width', '400px');
}
function createAndCheckPipe() {
    let upperElement = document.createElement('img');
    let lowerElement = document.createElement('img');
    // init
    initializePipeElement(upperElement, "assets/pipe.png");
    initializePipeElement(lowerElement, "assets/pipe.png");
    upperElement.classList.add('pipe-upper');
    lowerElement.classList.add('pipe-lower');
    // setting height for pipe
    upperElement.style.height = generatePipeHeight();
    lowerElement.style.height = generatePipeHeight();
    //pipe insertion
    pipes.push(pipeContainer.appendChild(upperElement));
    pipes.push(pipeContainer.appendChild(lowerElement));
    setInterval(() => {
        upperElement.remove();
        lowerElement.remove();
    }, 11000);
    // check the bird
    setTimeout(() => {
        if (birdElement.offsetTop < lowerElement.offsetTop) {
            score = score + 1;
            console.log(`going good ${score} is the current val of score`);
            scoreElement.innerText = score.toString();
        }
    }, 10500);
}
animate();
setInterval(createAndCheckPipe, 5000);
