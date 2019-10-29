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

//Asset Vars
var backImg;
var shipImg = [];
var pewSound;
var clokSound;
var upgradeMusic;
var instructionMusic;
var gameMusic;
var titleScreenMusic;

var canvas;

const assets = 'https://cdn.jsdelivr.net/gh/snydecor000/PewPewSpaceship-2.0/assets/';

function preload() {
    //load Image Assets
    backImg = loadImage(assets + 'spaceBackground.png');
    //shipImg = loadImage(assets + 'ship.png');
    for (let i = 0; i < 5; i++)
        shipImg.push(loadImage(assets + 'ship' + i + '.png'));
    //load Sound Assets
    pewSound = loadSound(assets + 'Pew.ogg');
    pewSound.setVolume(0.3);
    clokSound = loadSound(assets + 'Clok.ogg');
    clokSound.setVolume(1);
    upgradeMusic = loadSound(assets + '05_ComeAndFindMe.ogg');
    upgradeMusic.setVolume(0.5);
    instructionMusic = loadSound(assets + '08_Ascending.ogg');
    instructionMusic.setVolume(0.6);
    gameMusic = loadSound(assets + 'SpaceTrip.ogg');
    gameMusic.setVolume(0.5);
    titleScreenMusic = loadSound(assets + '10_Arpanauts.ogg');
    titleScreenMusic.setVolume(0.3);
}

//Triggered once after preload()
function setup() {
    //Create the canvas then properly size it
    canvas = createCanvas(1, 1);
    windowResized();

    ship = new Ship(shipImg, canvas, scaleFactor, space);

    getAudioContext().resume();
    titleScreenMusic.play();
}

//Triggered before every frame
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
}

//Chrome makes you resume the audioContext after a user input
function mouseClicked() {
    getAudioContext().resume();
}

//Chrome makes you resume the audioContext after a user input
function keyTyped() {
    getAudioContext().resume();
}