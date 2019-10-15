//Cory Snyder
//PewPewSpaceship-2.0
//Complete remake of python PewPewSpaceship

var scaleFactor = {
    h: 729,//The height of my personal window
    w: 1296//The width of my personal window
};

var backImg;

//player
class Ship {
    constructor(img) {
        this.img = img;
        this.x = width / 2;
        this.y = height / 2;
        this.angle = 0;
    }

    getX() {
        return resizeX(ship.x);
    }

    getY() {
        return resizeY(ship.y);
    }

    getAngle() {
        return this.angle;
    }

    draw() {
        imageMode(CENTER);
        translate(this.getX(), this.getY());
        rotate(this.getAngle());
        image(this.img, 0, 0, resizeX(this.img.width), resizeY(this.img.height));
        resetMatrix();
        translate(0,0);
        imageMode(CORNER);
    }
}

var shipImg;

const assets = 'https://cdn.jsdelivr.net/gh/snydecor000/PewPewSpaceship-2.0/assets/';

function preload() {
    backImg = loadImage(assets + 'spaceBackground.png');
    shipImg = loadImage(assets + 'ship.png');
}

function setup() {
    //Create the canvas then properly size it
    createCanvas(1, 1);
    windowResized();

    ship = new Ship(shipImg);

    //Test Ship Render
    ship.angle = PI / 2;
    ship.x = 100;//refers to center
    ship.y = 100;//refers to center
}

function draw() {
    background(0);

    //background Image
    imageMode(CORNER);
    image(backImg, 0, 0, width, height);
    //Draw Ship
    ship.draw();
}

//Function that resizes objects to match current window size
function resizeX(x) {
    return round(x * (width / scaleFactor.w));
}

//Function that resizes objects to match current window size
function resizeY(y) {
    return round(y * (height / scaleFactor.h));
}

//Event triggered when the window is resized
function windowResized() {
    /*Subtracts a lil from the height to make sure that 
    canvas loads on the webpage without scroll bars*/
    let heightLimit = round(windowHeight - (windowHeight / 30));

    //Use 16:9 ratio to calculate width
    let widthLimit = round(heightLimit * (16.0 / 9.0));

    resizeCanvas(widthLimit, heightLimit);
}