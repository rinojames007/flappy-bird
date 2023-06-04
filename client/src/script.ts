const birdElement: any = document.querySelector<HTMLElement>('#bird');
const birdStyle:CSSStyleDeclaration = window.getComputedStyle(birdElement);
const gravity: number = 1.9;
const velocity: number = 70;
const pipeContainer: any = document.getElementById('pipe-container');
const scoreElement: HTMLElement | any = document.getElementById('score');
let positionY: number = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));
let isJumping: boolean = false;
let firstJump: boolean = true;
let animationId: number;
let isPaused: boolean = false;
let pipes: HTMLElement[] = [];
let score: number = 0;

function jump(): void {
    if(!isJumping) {
        isJumping = true;
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(()=>{
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-30deg)';
    } else {
        fall();
    }
}
function fall(): void {
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
}
function animate(): void {

        fall();
        animationId = requestAnimationFrame(animate);

        if(firstJump){
            if (birdElement.style.top === '850px') {
                cancelAnimationFrame(animationId);
                animationId = 0;
                birdElement.style.top = '850px';
                return;
            }
        } else {
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
document.addEventListener('keydown' || 'touchstart', (event: KeyboardEvent) => {
    if(event.code === 'Space'){
        isJumping = false;
        // making sure the animation id is 0 for the animation to begin
        if (!animationId) {
            // Start the animation only if it's not already running
            animate();
        }
        jump();
    }
    else if(event.code === 'KeyP') {
        if (isPaused) {
            isPaused = false;
            animate();
        } else {
            isPaused = true;
            console.log("stop the pipes!!!")
            cancelAnimationFrame(animationId);
        }
    }
})
function generatePipeHeight(): string {
    // Define the minimum and maximum heights for the pipes
    const minHeight = 30;
    const maxHeight = 45;

    // Generate a random height for the pipe
    const pipeHeight = `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}%`;

    return pipeHeight;
}
function initializePipeElement(element: HTMLElement | any, source: string): void {
    element.src = source;
    element.setAttribute('width', '400px');
}
function createAndCheckPipe(): any {
    let upperElement: HTMLElement | any = document.createElement('img');
    let lowerElement: HTMLElement | any = document.createElement('img');

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
        if(birdElement.offsetTop < lowerElement.offsetTop){
            score = score + 1;
            console.log(`going good ${score} is the current val of score`);
            scoreElement.innerText = score.toString();
        }
    }, 10500);
}

animate();
setInterval(createAndCheckPipe, 5000);


