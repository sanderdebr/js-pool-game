import { BALL_SIZE } from "./settings";
import WhiteBallImage from "./assets/images/ball_white.png";

export default class Ball {
  constructor(mainContext, id, from, to) {
    this.mainContext = mainContext;
    this.id = id;
    this.radius = BALL_SIZE;

    this.image = new Image();
    this.image.src = WhiteBallImage;

    // Speed
    this.maxFrames = 25000;
    this.frames = this.maxFrames;
    this.frame = 0;
    this.ease = 0;
    this.allowGetEase = true;

    // Position
    this.posX = from.x;
    this.posY = from.y;
    this.to = to;
    this.reachedDestination = false;
  }

  update(otherBalls, power) {
    this.posX = this.getX();
    this.posY = this.getY();

    this.detectCollision(otherBalls, power);

    this.mainContext.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.radius,
      this.radius
    );

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  // Mainly used for whiteball
  moveTo(angle, power) {
    const x = this.posX + Math.cos((Math.PI * angle) / 180) * power * 5;
    const y = this.posY + Math.sin((Math.PI * angle) / 180) * power * 5;

    this.to = {
      x: parseInt(x),
      y: parseInt(y),
    };

    return { x, y };
  }

  detectCollision(otherBalls, power) {
    for (let i = 0; i < otherBalls.length; i++) {
      // Calculate distance between two center points
      const thisCenterPointX = this.posX + this.radius / 2;
      const thisCenterPointY = this.posY + this.radius / 2;
      const otherCenterPointX = otherBalls[i].posX + otherBalls[i].radius / 2;
      const otherCenterPointY = otherBalls[i].posY + otherBalls[i].radius / 2;

      const dx = thisCenterPointX - otherCenterPointX;
      const dy = thisCenterPointY - otherCenterPointY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Helper lines
      /* this.mainContext.beginPath();
      this.mainContext.moveTo(thisCenterPointX, thisCenterPointY);
      this.mainContext.lineTo(otherCenterPointX, otherCenterPointY);
      this.mainContext.stroke(); */

      // Collision detected
      if (distance < this.radius / 2 + otherBalls[i].radius / 2) {
        // Not the whiteball
        if (this.id !== 1) {
          // Get easing speed
          let speed = otherBalls[i].ease * 2;
          otherBalls[i].allowGetEase = false;
          this.allowGetEase = false;

          if (speed < 0) speed = speed * -1;

          const diffX = (thisCenterPointX - otherCenterPointX) * speed;
          const diffY = (otherCenterPointY - thisCenterPointY) * speed;

          // Move this ball relative to power
          this.to = {
            x: parseInt(this.posX + diffX),
            y: parseInt(this.posY - diffY),
          };

          // Move the other ball half the power
          otherBalls[i].to = {
            x: parseInt(otherBalls[i].posX - diffX),
            y: parseInt(otherBalls[i].posY + diffY),
          };
        }
      }
    }
  }

  resetFrames(frames = 5000) {
    this.frames = frames || this.maxFrames;
    this.frame = 0;
  }

  getEase(currentProgress, position, distance, steps) {
    const ease = -distance * (currentProgress /= steps) * (currentProgress - 2);
    // Save easing for ball effect
    if (ease !== 0 && this.allowGetEase) {
      this.ease = ease;
    }
    return ease + position;
  }

  getX() {
    if (!this.to) return this.posX;
    let distance = this.to.x - this.posX;
    let steps = this.frames;
    let currentProgress = this.frame;
    // Reset frames
    if (this.frames !== this.maxFrames) {
      console.log("Frames are: ", this.frames);
    }
    if (distance > 0 && distance < 1 && this.frames !== this.maxFrames) {
      this.resetFrames();
    }
    return this.getEase(currentProgress, this.posX, distance, steps);
  }

  getY() {
    if (!this.to) return this.posY;
    let distance = this.to.y - this.posY;
    let steps = this.frames;
    let currentProgress = this.frame;
    // Reset frames
    if (distance > 0 && distance < 1 && this.frames !== this.maxFrames) {
      this.resetFrames();
    }
    return this.getEase(currentProgress, this.posY, distance, steps);
  }
}
