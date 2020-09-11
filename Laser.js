//Laser Fired by Ship
class Laser {
    constructor(img, canvas, scaleFactor, space, shipX, shipY, shipAngle){
        this.img = img;
        this.canvas = canvas;
        this.scaleFactor = scaleFactor;
        this.space = space;
        this.x = shipX;
        this.y = shipY;
        this.angle = shipAngle;
        this.xVel = space.laserVel * Math.sin(this.angle);
        this.yVel = space.laserVel * -1 * Math.cos(this.angle); //has to be reversed because y-up is negative
        this.dead = false;
    }

    //Function that resizes objects to match current window size
    resizeX(x) {
        return round(x * (this.canvas.width / this.scaleFactor.w));
    }

    //Function that resizes objects to match current window size
    resizeY(y) {
        return round(y * (this.canvas.height / this.scaleFactor.h));
    }

    //returns scaled x value for laser
    getX() {
        return this.resizeX(this.x);
    }

    //returns scaled y value for laser
    getY() {
        return this.resizeY(this.y);
    }

    //returns angle
    getAngle() {
        return this.angle;
    }

    //returns whether dead
    isDead(){
        return this.dead;
    }

    draw(){
        //draw the frame at the correct position and rotated the correct amount
        resetMatrix();
        imageMode(CENTER);
        translate(this.getX(), this.getY());
        rotate(this.getAngle());
        image(this.img, 0, 0, this.resizeX(this.img.width), this.resizeY(this.img.height));
        resetMatrix();
    }

    update(){
        //Indicate that the laser should die if it goes off screen
        if (this.getY() < -20)
            this.dead = true;
        if (this.getY() > this.canvas.height)
            this.dead = true;
        if (this.getX() > this.canvas.width)
            this.dead = true;
        if (this.getX() < -20)
            this.dead = true;

        //Actually move the laser
        this.x += this.xVel;
        this.y += this.yVel;
    }

}

