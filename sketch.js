const max_angle_delta = 270 * Math.PI / 180; // radians (75 degrees)
const stepSize = 50;
var steeps = [];
let squiggles = [];
let theSquiggle;
let context;

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    context = canvas.canvas.getContext('2d');
    window.onresize = () =>
        resizeCanvas(window.innerWidth, window.innerHeight);

    createSquiggle();
}

function createSquiggle() {
    steeps = [];
    let startingPoint = getStartingPointAndDirection();
    let currentPoint = startingPoint.startPoint;
    let currentAngle = startingPoint.startDirection;
    do {
        currentPoint = {
            x: currentPoint.x + (stepSize * Math.cos(currentAngle)),
            y: currentPoint.y + (stepSize * Math.sin(currentAngle)),
        };
        steeps.push({
            x: stepSize * Math.cos(currentAngle),
            y: stepSize * Math.sin(currentAngle)
        });
        currentAngle = steerAngle(currentAngle);
    } while (
        currentPoint.x <= window.innerWidth
        && currentPoint.x >= 0
        && currentPoint.y <= window.innerHeight
        && currentPoint.y >= 0)


    let gradient = getColorOrGradient();


    theSquiggle = (x, y) => {

        //context.strokeStyle = "red";
        context.moveTo(0, 0);

        //line(0,0,window.innerWidth,window.innerHeight);
        // context.beginPath();
        // context.lineWidth="5";
        // context.strokeStyle="green"; // Green path
        // context.moveTo(0,75);
        // context.lineTo(800,75);
        // context.stroke(); // Draw it

        curPtX = x;
        curPtY = y;
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = getMovingRainbowXGradient(0,window.innerWidth);
        context.moveTo(curPtX, curPtY);
        steeps.forEach(step => {
            curPtX += step.x;
            curPtY += step.y;
            context.lineTo(curPtX, curPtY);
        });
        context.stroke();
        context.closePath();
    }

}

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

let movingGradientStep = 0;
let movingGradientSteps = ['red', 'orange', 'yellow', 'green', 'blue', 'Indigo', 'Violet'];
function getMovingRainbowXGradient(min,max) {
    let gradient = context.createLinearGradient(min, 0, max, 0);
    gradient.addColorStop(0, movingGradientSteps[movingGradientStep % movingGradientSteps.length]);
    gradient.addColorStop(0.5, movingGradientSteps[(movingGradientStep + 1) % movingGradientSteps.length]);
    gradient.addColorStop(1, movingGradientSteps[(movingGradientStep + 2) % movingGradientSteps.length]);
    movingGradientStep++;
    return gradient;
}


function draw() {
    // create a path drawing mechanism that goes from one edge to another
    //const degree = Math.PI / 180;
    background(255);
    //line(0,0,window.innerWidth, window.innerHeight);
    if (theSquiggle) {

        drawSquiggleAsMandala(theSquiggle);

        // for (x = 0; x < window.innerWidth; x += (stepSize * 0.4)) {
        //     for (y = 0; y < window.innerHeight; y += (stepSize * 1.3)) {
        //         theSquiggle(x, y);
        //         //rotate(degree);
        //     }
        // }
    }
    //createSquiggle();
}




function drawSquiggleAsMandala(squiggle) {
    translate(window.innerWidth / 2, window.innerHeight / 2);
    let radius = 0;
    do {
        //for (radius = 0; radius < window.innerWidth / 2; radius += 100) {
        for (i = 0; i < 60; i++) {
            rotate((Math.PI * 2) / i);
            squiggle(radius++, 0);
        }
    } while (radius < window.innerWidth);
}


function steerAngle(angle) {
    return (angle + Math.random() * max_angle_delta - (max_angle_delta / 2));
}

function getStartingPointAndDirection() {
    switch (Math.floor(Math.random() * 4)) {
        case 0: // left edge
            return {
                startPoint: {
                    x: 0,
                    y: Math.random() * window.innerHeight
                },
                startDirection: 0
            };
        case 1: // top edge
            //console.log("te1 ");
            return {
                startPoint: {
                    x: Math.random() * window.innerWidth,
                    y: 0
                },
                startDirection: 0.5 * Math.PI
            }
        case 2: // right edge
            //console.log("re2 ");
            return {
                startPoint: {
                    x: window.innerWidth,
                    y: Math.random() * window.innerHeight
                },
                startDirection: Math.PI
            }
        case 3: // bottom edge
            //console.log("be3 ");
            return {
                startPoint: {
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight
                },
                startDirection: 1.5 * Math.PI
            };
        default:
            console.log("Bad random ");
            return {
                startPoint: {
                    x: 0,
                    y: Math.random() * window.innerHeight
                },
                startDirection: 0
            };
    }

}