//Cory Snyder
//PewPewSpaceship-2.0
//Complete remake of python PewPewSpaceship

var scaleFactor = {
    h: 729,//The height of my personal window
    w: 1296//The width of my personal window
};

function setup() {
    //Create the canvas then properly size it
    createCanvas(1, 1);
    windowResized();
}

function draw() {
    background(0);
    rectMode(CENTER);
    rect(resizeX(100), resizeY(100),
        resizeX(100), resizeY(100));
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

    //print("Height: ", heightLimit);
    //print("Width: ", widthLimit);
}