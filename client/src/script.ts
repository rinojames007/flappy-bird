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
// pipe
const pipeContainer: any = document.getElementById('pipe-container');
// an array which will stores the generated pipes
let upperPipes: HTMLElement[] = [];
let lowerPipes: HTMLElement[] = [];
let pipeNumber:number = 0;
const screenHeight: number = window.innerHeight;

// this is this jumping stuff
function jump(): void {
    if(!isJumped) {
        isJumped = true;
        positionY -= velocity;
        birdElement.style.top = positionY + 'px';
        setTimeout(()=>{
            birdElement.style.transform = 'rotate(0deg)';
        }, 10);
        birdElement.style.transform = 'rotate(-30deg)';
    }
}

// function for the bird to come down
function fall(): void {
    if(isJumped){
    positionY += gravity;
    birdElement.style.top = positionY + 'px';
    }
}

function animate(): void {
    fall();
    if (birdElement.style.top === '850px') {
        cancelAnimationFrame(animationId);
        animationId = 0;
        birdElement.style.top = '850px';
        isJumped = false;
    };
    animationId = requestAnimationFrame(animate);
    // executing this works, but the animation does not begin even after pressing space, although bird jumps
}

animate();

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


//upper generation
function createPipe(): void {
    let upperElement: HTMLElement | any = document.createElement('img');
    let lowerElement: HTMLElement | any = document.createElement('img');

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
};

setInterval(()=> {
    createPipe();
}, 3000);