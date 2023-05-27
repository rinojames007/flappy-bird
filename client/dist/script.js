"use strict";
// get the bird element
const birdElement = document.querySelector('#bird');
// extract the css property of bird
const birdStyle = window.getComputedStyle(birdElement);
// since we have to make the bird jump and so on, therefore we have to extract the top value
let positionY = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));
// in order to make the bird down smoothly
const gravity = 1;
const velocity = 20;
let isJumped = false;
// this is this jumping stuff
function jump() {
    isJumped = true;
    if (isJumped) {
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
    }
}
// an event listener that will make the bird jump once space bar is pressed
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
function fall() {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}
function animate() {
    fall();
    requestAnimationFrame(animate);
}
animate();
