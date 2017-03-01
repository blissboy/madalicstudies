const max_angle_delta = 270 * Math.PI / 180; // radians (75 degrees)
const stepSize = 6;
const squiggCount = 9;
let squiggles = [];
let context;
let recording = false;
let started = false;
let drawCount = 0;
const maxSquiggles = 30;
const maxSteps = 40;

var hite = window.innerHeight;
var widdth = window.innerWidth;
var gif;

function setup() {
    frameRate(30);
    gif = new Animated_GIF({
        repeat: null, // Don't repeat
        width: widdth,
        height: hite,
        useQuantizer: true,
        sampleInterval: 1,
    });
    gif.setDelay(.088);
    
    let canvas = createCanvas(widdth, hite);
    context = canvas.canvas.getContext('2d');
    window.onresize = () =>
        widdth = window.innerWidth;
    hite = window.innerHeight;
    resizeCanvas(widdth, hite);

    squiggles.push(createSquiggle());

    setupSaveFrames();

}

function setupSaveFrames() {
        
    saveFrames("woo", "png", 7, 10, (frames) => {
        // deal with all the frames    
        frames.forEach(frame => {
            let img = new Image();
            img.src = 'data:image/png;base64,' + frame.imageData.substring(31); // 31 = length of 'data:image/octet-stream;base64,';
            gif.addFrame(img);
        });

        // generate and dl the ani gif
        gif.getBlobGIF((blob) => {
            //console.log(blob);
            download(blob, 'woo.gif', 'image/gif');
        });
    });
}

function draw() {
    drawCount++;

    const degree = Math.PI / 180;
    background(255);
    //line(0,0,widdth, hite);
    squiggles.forEach(squiggle => {
        drawSquiggleAsMandala(squiggle);
    });

    squiggles.push(createSquiggle());

    if (squiggles.length > maxSquiggles) {
        squiggles.splice(0, 1);
    }
}


// Function to download data to a file
function download(data, filename, type) {
    var a = document.createElement("a"),
        blob = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(blob, filename);
    else { // Others
        var url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function keyPressed() {
    console.log(key);
    console.log(keyCode);
    if (key == ' ') {
        if (recording) {
            recording = false;
            if (started) {
                gif.render();
            }
        } else {
            started = true;
            recording = true;
        }
    }
}

function getStepsAcrossScreen() {
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
        currentPoint.x <= widdth
        && currentPoint.x >= 0
        && currentPoint.y <= hite
        && currentPoint.y >= 0
        && steeps.length < maxSteps)


    return steeps;
}

function createSquiggle() {
    let steeps = getStepsAcrossScreen();

    return (x, y) => {

        context.moveTo(0, 0);
        curPtX = x;
        curPtY = y;
        context.beginPath();
        context.lineWidth = "1";
        //context.strokeStyle = "green";
        //context.strokeStyle = getMovingRainbowXGradient(0, widdth);
        context.strokeStyle = getPerDrawRainbowXGradient(0, widdth, drawCount);
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

function drawSquiggleAsMandala(squiggle) {
    translate(widdth / 2, hite / 2);
    let radius = 0;
    do {
        //for (radius = 0; radius < widdth / 2; radius += 100) {
        for (i = 0; i < 7; i++) {
            rotate((Math.PI * 2) / i);
            squiggle(radius, 0);
        }
        radius += 10;
    } while (radius < widdth);
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
                    y: Math.random() * hite
                },
                startDirection: 0
            };
        case 1: // top edge
            //console.log("te1 ");
            return {
                startPoint: {
                    x: Math.random() * widdth,
                    y: 0
                },
                startDirection: 0.5 * Math.PI
            }
        case 2: // right edge
            //console.log("re2 ");
            return {
                startPoint: {
                    x: widdth,
                    y: Math.random() * hite
                },
                startDirection: Math.PI
            }
        case 3: // bottom edge
            //console.log("be3 ");
            return {
                startPoint: {
                    x: Math.random() * widdth,
                    y: hite
                },
                startDirection: 1.5 * Math.PI
            };
        default:
            console.log("Bad random ");
            return {
                startPoint: {
                    x: 0,
                    y: Math.random() * hite
                },
                startDirection: 0
            };
    }

}