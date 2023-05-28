// get the bird element
const birdElement: any = document.querySelector<HTMLElement>('#bird');

// extract the css property of bird
const birdStyle:CSSStyleDeclaration = window.getComputedStyle(birdElement);

// in order to make the bird down smoothly
const gravity: number = 1;
const velocity: number = 70;

// since we have to make the bird jump and so on, therefore we have to extract the top value
let positionY: number = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));

let isJumped: boolean = false;

let animationId: number;

// this is this jumping stuff
function jump(): void {
    isJumped = true;
    if(isJumped) {
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(()=>{
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-20deg)';
    }
}

// an event listener that will make the bird jump once space bar is pressed
document.addEventListener('keydown', (event: KeyboardEvent) => {
    if(event.code === 'Space'){
        // making sure the animation id is 0 for the animation to begin
        if (!animationId) {
            // Start the animation only if it's not already running
            animate();
        }
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
    if (birdElement.style.top === '900px') {
        cancelAnimationFrame(animationId);
        animationId = 0;
        birdElement.style.top = '900px';
        return;
    };
    animationId = requestAnimationFrame(animate);
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}

animate();
