//Cory Snyder
//PewPewSpaceship-2.0
//Complete remake of python PewPewSpaceship

var scaleFactor = {
    h: 729,//The height of my personal window
    w: 1296//The width of my personal window
};

var space = {
    maxVel: 5,
    deAcc: 0.025
};

var backImg;
var shipImg;
var canvas;

const assets = 'https://cdn.jsdelivr.net/gh/snydecor000/PewPewSpaceship-2.0/assets/';

function preload() {
    backImg = loadImage(assets + 'spaceBackground.png');
    shipImg = loadImage(assets + 'ship.png');
}

function setup() {
    //Create the canvas then properly size it
    canvas = createCanvas(1, 1);
    windowResized();
    print(canvas);
    ship = new Ship(shipImg, canvas, scaleFactor, space);
}

function draw() {
    background(0);

    //background Image
    imageMode(CORNER);
    image(backImg, 0, 0, canvas.width, canvas.height);
    //Draw Ship
    ship.draw();
    ship.update();
}

//Event triggered when the window is resized
function windowResized() {
    /*Subtracts a lil from the height to make sure that 
    canvas loads on the webpage without scroll bars*/
    let heightLimit = round(windowHeight - (windowHeight / 30));

    //Use 16:9 ratio to calculate width
    let widthLimit = round(heightLimit * (16.0 / 9.0));

    resizeCanvas(widthLimit, heightLimit);
    print(canvas);
}