const birdElement: any = document.querySelector<HTMLElement>('#bird');

let position = 0;
const velocity = 5;
let isPaused = false;

let animationId: number;

// pause the bird's movement
document.addEventListener("keydown", (event: KeyboardEvent) => {
    // if p is pressed
    if(event.code === 'KeyP') {
        togglePause();
    }
});

let animate = () => {
    position += velocity;
    birdElement.style.left = position + 'px';

    // Call the animate function recursively using requestAnimationFrame
    animationId = requestAnimationFrame(animate);
};

let togglePause = () => {
    isPaused = !isPaused;
    if(isPaused) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
};

animate();
