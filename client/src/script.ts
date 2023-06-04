// get the bird element
const birdElement: any = document.querySelector<HTMLElement>('#bird');

// extract the css property of bird
const birdStyle:CSSStyleDeclaration = window.getComputedStyle(birdElement);

// in order to make the bird down smoothly
const gravity: number = 1.9;
const velocity: number = 70;

// since we have to make the bird jump and so on, therefore we have to extract the top value
let positionY: number = parseInt(birdStyle.getPropertyValue('top').slice(0, 5));

let isJumping: boolean = false;
let firstJump: boolean = true;

let animationId: number;
let isPaused: boolean = false;

// this is this jumping stuff
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

// function for the bird to come down
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

animate();

let upperPipe: any = document.querySelectorAll(".pipe-upper");

// an event listener that will make the bird jump once space bar is pressed
document.addEventListener('keydown', (event: KeyboardEvent) => {
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

function generatePipeHeight() {
    // Define the minimum and maximum heights for the pipes
    const minHeight = 30;
    const maxHeight = 45;

    // Generate a random height for the pipe
    const pipeHeight = `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}%`;

    return pipeHeight;
}


// pipe
const pipeContainer: any = document.getElementById('pipe-container');
// an array which will stores the generated pipes
let pipes: HTMLElement[] = [];
let pipeNumber: number = 0;

//pipe generation
function createPipe(): any {
    let upperElement: HTMLElement | any = document.createElement('img');
    let lowerElement: HTMLElement | any = document.createElement('img');

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
    pipes.push(pipeContainer.appendChild(upperElement));
    pipes.push(pipeContainer.appendChild(lowerElement));

    setInterval(() => {
        upperElement.remove();
        lowerElement.remove();
    }, 11000);

    let gap: string = (upperElement.style.height.slice(0, 2) - lowerElement.style.height.slice(0, 2)) + 'px';

    // check the bird
    setTimeout(() => {
        // if(birdStyle.top === gap.slice()) {
        //     console.log("ok");
        // } else {
        //     console.log("game over");
        // }
        console.log("gap between the pipes" + gap);
        console.log("bird height" + birdStyle.top);
    }, 10500);
}

setInterval(createPipe, 5000);


