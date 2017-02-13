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
        context.strokeStyle = getColorOrGradient;
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
    for (radius = 0; radius < window.innerWidth / 2; radius += 100) {
        for (i = 0; i < 60; i++) {
            rotate((Math.PI * 2) / i);
            squiggle(radius, 0);
        }
    }
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