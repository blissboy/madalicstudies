let movingGradientStep = 0;
let movingGradientSteps = ['red', 'orange', 'yellow', 'green', 'blue', 'Indigo', 'Violet'];

function getColorOrGradient() {
    let gradient = context.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "black");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    return gradient;
}

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

function getMovingRainbowXGradient(min,max) {
    let gradient = context.createLinearGradient(min, 0, max, 0);
    gradient.addColorStop(0, movingGradientSteps[movingGradientStep % movingGradientSteps.length]);
    gradient.addColorStop(0.5, movingGradientSteps[(movingGradientStep + 1) % movingGradientSteps.length]);
    gradient.addColorStop(1, movingGradientSteps[(movingGradientStep + 2) % movingGradientSteps.length]);
    movingGradientStep++;
    return gradient;
}


