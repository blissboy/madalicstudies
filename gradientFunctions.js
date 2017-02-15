let movingGradientStep = 0;
let movingGradientSteps = ['red', 'orange', 'yellow', 'green', 'blue', 'Indigo', 'Violet'];

function getColorOrGradient() {
    let gradient = context.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "black");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    return gradient;
}

/**
 * returns a rainbow gradient in the x direction from x=min to x=max
 */
function getRainbowXGradient(min, max) {
    let gradient = context.createLinearGradient(min, 0, max, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green')
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'Indigo');
    gradient.addColorStop(1, 'Violet'); return gradient;
}

/**
 * returns a gradient in the x direction from x=min to x=max. Used to get a new gradient for
 * each call to the function. 
 */
function getPerCallMovingRainbowXGradient(min,max) {
    movingGradientStep++;
    return getMovingRainbowXGradient(min,max,movingGradientStep);
}

/**
 * returns a gradient in the x direction from x=min to x=max. Used to get the same gradient for
 * all uses of the function during a single draw interval. 
 */
function getPerDrawMovingRainbowXGradient(min,max) {
    return getMovingRainbowXGradient(min,max,drawCount);
}


/**
 * function used by other gradient functions, most likely not used by clients
 */
function getMovingRainbowXGradient(min,max,startAt) {
    let gradient = context.createLinearGradient(min, 0, max, 0);
    gradient.addColorStop(0, movingGradientSteps[startAt % movingGradientSteps.length]);
    gradient.addColorStop(0.5, movingGradientSteps[(startAt + 1) % movingGradientSteps.length]);
    gradient.addColorStop(1, movingGradientSteps[(startAt + 2) % movingGradientSteps.length]);
    return gradient;
}

function getRandomRainbowXGradient(min,max) {
    let gradient = context.createLinearGradient(min, 0, max, 0);
    gradient.addColorStop(0, movingGradientSteps[Math.floor(random() * movingGradientSteps.length)]);
    gradient.addColorStop(0.5, movingGradientSteps[Math.floor(random() * movingGradientSteps.length)]);
    gradient.addColorStop(1, movingGradientSteps[Math.floor(random() * movingGradientSteps.length)]);
    return gradient;
}

