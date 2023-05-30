// get the bird element
const birdElement: any = document.querySelector<HTMLElement>('#bird');

// extract the css property of bird
const birdStyle:CSSStyleDeclaration = window.getComputedStyle(birdElement);

// in order to make the bird down smoothly
const gravity: number = 1.9;
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
        birdElement.style.transform = 'rotate(-30deg)';
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
    if (birdElement.style.top === '850px') {
        cancelAnimationFrame(animationId);
        animationId = 0;
        birdElement.style.top = '850px';
        return;
    };
    animationId = requestAnimationFrame(animate);
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}

animate();

// pipe
const pipeContainer: any = document.getElementById('pipe-container');
const pipeElement: HTMLElement | any = document.createElement('img');

let positionX = 10;
let pipeSpeed: number = 1;
let pipes: HTMLElement[] = [];
let pipeNumber:number = 0;

function createPipe(): void {
    let pipeElement: HTMLElement | any = document.createElement('img');

    // pipe init
    pipeElement.classList.add('pipe');
    pipeElement.src = "/client/assets/pipe.png";

    //setting height and width
    pipeElement.setAttribute('width', '200px');
    pipeElement.setAttribute('height', '40%');

    //pipe insertion
    pipes.push(pipeElement);
    pipeContainer.appendChild(pipes[pipeNumber]);
    pipeNumber++;
    console.log(pipeNumber + "on the createPipe()")

}
setInterval(()=> {
    createPipe();
}, 3000);
// console.log(pipeElement);
// function movePipe(): void {
//     positionX += pipeSpeed;
//     console.log(pipeNumber + " on the movePipe()")
//     pipeElement.style.right = positionX + 'px';
//     requestAnimationFrame(movePipe);
// };

// movePipe();