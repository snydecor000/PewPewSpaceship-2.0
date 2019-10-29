//Player Ship
class Ship {
    constructor(img, canvas, scaleFactor, space) {
        this.img = img;
        this.canvas = canvas;
        this.scaleFactor = scaleFactor;
        this.space = space;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.xVel = 0;
        this.yVel = 0;
        this.xAcc = 0.25;
        this.yAcc = 0.25;
        this.angle = 0;
        this.thruster = false;
        this.frame = 0;
    }

    //Function that resizes objects to match current window size
    resizeX(x) {
        return round(x * (this.canvas.width / this.scaleFactor.w));
    }

    //Function that resizes objects to match current window size
    resizeY(y) {
        return round(y * (this.canvas.height / this.scaleFactor.h));
    }

    //returns scaled x value for ship
    getX() {
        return this.resizeX(this.x);
    }

    //returns scaled y value for ship
    getY() {
        return this.resizeY(this.y);
    }

    //returns angle
    getAngle() {
        return this.angle;
    }

    draw() {
        if(this.thruster){
            this.frame ++;
            if(this.frame >= this.img.length){
                this.frame = 1;
            }
        }
        else{
            this.frame = 0;
        }
        imageMode(CENTER);
        translate(this.getX(), this.getY());
        rotate(this.getAngle());
        image(this.img[this.frame], 0, 0, this.resizeX(this.img[this.frame].width), this.resizeY(this.img[this.frame].height));
        resetMatrix();
        translate(-this.getX(), -this.getY());
        imageMode(CORNER); 
    }

    update() {
        let upPressed = keyIsDown(UP_ARROW) || keyIsDown(87);
        let downPressed = keyIsDown(DOWN_ARROW) || keyIsDown(83);
        let rightPressed = keyIsDown(RIGHT_ARROW) || keyIsDown(68);
        let leftPressed = keyIsDown(LEFT_ARROW) || keyIsDown(65);
        this.thruster = upPressed || downPressed || rightPressed || leftPressed;

        //Calculate xVel and yVel
        if (this.xVel > -this.space.maxVel && leftPressed)
            this.xVel -= this.xAcc;
        else if (leftPressed)
            this.xVel = -this.space.maxVel;
        if (this.xVel < this.space.maxVel && rightPressed)
            this.xVel += this.xAcc;
        else if (rightPressed)
            this.xVel = this.space.maxVel;
        if (this.yVel > -this.space.maxVel && upPressed)
            this.yVel -= this.yAcc;
        else if (upPressed)
            this.yVel = -this.space.maxVel;
        if (this.yVel < this.space.maxVel && downPressed)
            this.yVel += this.yAcc;
        else if (downPressed)
            this.yVel = this.space.maxVel;

        //If not moving, get slowed by space friction
        if (this.xVel != 0 && this.xVel > 0 && !rightPressed)
            this.xVel -= this.space.deAcc;
        if (this.xVel != 0 && this.xVel < 0 && !leftPressed)
            this.xVel += this.space.deAcc;
        if (this.yVel != 0 && this.yVel > 0 && !downPressed)
            this.yVel -= this.space.deAcc;
        if (this.yVel != 0 && this.yVel < 0 && !upPressed)
            this.yVel += this.space.deAcc;

        //Make sure floating point errors don't make ship drift
        if (abs(this.xVel) < 0.1 && !rightPressed && !leftPressed)
            this.xVel = 0;
        if (abs(this.yVel) < 0.1 && !upPressed && !downPressed)
            this.yVel = 0;

        //Make ship bounce off of walls
        if (this.getY() < 0)
            this.yVel *= -1;
        if (this.getY() > this.canvas.height)
            this.yVel *= -1;
        if (this.getX() > this.canvas.width)
            this.xVel *= -1;
        if (this.getX() < 0)
            this.xVel *= -1;

        //Point ship towards the mouse
        if (mouseX - this.getX() >= 0)
            this.angle = HALF_PI +
                Math.atan((mouseY - this.getY()) / (mouseX - this.getX()));
        else
            this.angle = PI + HALF_PI +
                Math.atan((mouseY - this.getY()) / (mouseX - this.getX()));

        //Actually move the ship
        this.x += this.xVel;
        this.y += this.yVel;
    }
}