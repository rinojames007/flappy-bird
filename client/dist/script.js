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
// this is this jumping stuff
function jump() {
    isJumped = true;
    if (isJumped) {
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(() => {
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-30deg)';
    }
}
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
// function for the bird to come down
function fall() {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}
function animate() {
    fall();
    if (birdElement.style.top === '850px') {
        cancelAnimationFrame(animationId);
        animationId = 0;
        birdElement.style.top = '850px';
        return;
    }
    ;
    animationId = requestAnimationFrame(animate);
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}
animate();
// pipe
const pipeContainer = document.getElementById('pipe-container');
const pipeElement = document.createElement('img');
let positionX = 10;
let pipeSpeed = 1;
let pipes = [];
let pipeNumber = 0;
function createPipe() {
    let pipeElement = document.createElement('img');
    // pipe init
    pipeElement.setAttribute('class', 'pipe');
    pipeElement.src = "/client/assets/pipe.png";
    //setting height and width
    pipeElement.setAttribute('width', '200px');
    pipeElement.setAttribute('height', '40%');
    //pipe insertion
    pipes.push(pipeElement);
    pipeContainer.appendChild(pipes[pipeNumber]);
    pipeNumber++;
    console.log(pipeNumber + "on the createPipe()");
}
setInterval(() => {
    createPipe();
}, 3000);
console.log(pipeElement);
function movePipe() {
    positionX += pipeSpeed;
    console.log(pipeNumber + " on the movePipe()");
    pipeElement.style.right = positionX + 'px';
    requestAnimationFrame(movePipe);
}
;
movePipe();
