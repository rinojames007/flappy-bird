// get the bird element
const birdElement: any = document.querySelector<HTMLElement>('#bird');

// extract the css property of bird
const birdStyle:CSSStyleDeclaration = window.getComputedStyle(birdElement);

// since we have to make the bird jump and so on, therefore we have to extract the top value
let positionY: number = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));

// in order to make the bird down smoothly
const gravity: number = 1;
const velocity: number = 20;

let isJumped: boolean = false;

// this is this jumping stuff
function jump(): void {
    isJumped = true;
    if(isJumped) {
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
    }
}

// an event listener that will make the bird jump once space bar is pressed
document.addEventListener('keydown', (event: KeyboardEvent) => {
    if(event.code === 'Space'){
        jump();
    }
})

// function for the bird to come down
function fall(): void {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}

function animate(): void {
    fall();
    requestAnimationFrame(animate);
}

animate();