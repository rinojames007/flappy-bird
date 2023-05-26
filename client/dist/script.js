var birdElement = document.querySelector('#bird');
var position = 0;
var velocity = 5;
var isPaused = false;
var animationId;
// pause the bird's movement
document.addEventListener("keydown", function (event) {
    // if p is pressed
    if (event.code === 'KeyP') {
        togglePause();
    }
});
var animate = function () {
    position += velocity;
    birdElement.style.left = position + 'px';
    // Call the animate function recursively using requestAnimationFrame
    animationId = requestAnimationFrame(animate);
};
var togglePause = function () {
    isPaused = !isPaused;
    if (isPaused) {
        cancelAnimationFrame(animationId);
    }
    else {
        animate();
    }
};
animate();
