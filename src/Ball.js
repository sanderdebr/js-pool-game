import {
  BALL_SIZE,
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_TOTAL_WIDTH,
  CANVAS_WIDTH,
} from "./settings";

import WhiteBallImage from "./assets/images/ball_white.png";

export default class Ball {
  constructor(mainContext, id, from, to) {
    this.mainContext = mainContext;
    this.id = id;
    this.radius = BALL_SIZE / 2;

    this.image = new Image();
    this.image.src = WhiteBallImage;

    // Speed
    this.maxFrames = 100000;
    this.frames = this.maxFrames;
    this.frame = 0;
    this.speed = 0;

    // Position
    this.posX = from.x;
    this.posY = from.y;
    this.to = to;
    this.angle = null;
  }

  update() {
    const newX = this.getX();
    const newY = this.getY();

    this.calculateSpeed(newX, newY);

    this.posX = newX;
    this.posY = newY;

    this.getCurrentAngle();
    this.keepOnTable();

    this.mainContext.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.radius * 2,
      this.radius * 2
    );

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  calculateSpeed(x, y) {
    let deltaX = this.posX - x;
    let deltaY = this.posY - y;
    if (deltaX < 0) deltaX *= -1;
    if (deltaY < 0) deltaY *= -1;
    this.speed = (deltaX + deltaY) * 100;
    if (this.speed < 0.001) this.speed = 0;
    if (this.speed > 300) this.speed = 300;
  }

  // Mainly used for whiteball
  moveTo(angle, power) {
    const x = this.posX + Math.cos((Math.PI * angle) / 180) * power;
    const y = this.posY + Math.sin((Math.PI * angle) / 180) * power;

    this.to = {
      x: parseInt(x),
      y: parseInt(y),
    };

    return { x, y };
  }

  getCurrentAngle() {
    if (this.to) {
      let angle =
        (Math.atan2(this.to.y - this.posY, this.to.x - this.posX) * 180) /
        Math.PI;
      if (angle < 0) angle += 360;
      this.angle = angle;
    }
  }

  keepOnTable() {
    const touchLeft = this.posX <= CANVAS_PADDING;
    const touchRight =
      this.posX + this.radius * 2 >= CANVAS_WIDTH + CANVAS_PADDING;
    const touchTop = this.posY <= CANVAS_PADDING;
    const touchBottom =
      this.posY + this.radius * 2 >= CANVAS_HEIGHT + CANVAS_PADDING;

    let newAngle = this.angle - 90;
    if (newAngle < 0) newAngle += 360;

    if (touchLeft || touchRight || touchBottom || touchTop) {
      this.moveTo(newAngle, this.speed * 0.5);
    }
  }

  detectCollision(balls) {
    for (let i = 0; i < balls.length; i++) {
      // Calculate distance and angle between two balls centerpoints
      const otherBall = balls[i];
      if (otherBall.id === this.id) return;

      const radiusCombined = this.radius + otherBall.radius;
      const { distance, dx, dy, angle } = this.getDeltaCenterpoints(
        this,
        otherBall
      );

      // Collision detected
      if (distance < radiusCombined) {
        // Not the whiteball
        if (this.id !== 1) {
          console.log("detected", this.id);
          // Take largest speed
          let speed =
            this.speed > otherBall.speed ? this.speed : otherBall.speed;

          let newAngle = angle - 180;
          if (newAngle < 0) newAngle += 360;

          if (speed < 0.001) speed = 0;
          if (speed > 300) speed = 300;

          this.moveTo(newAngle, speed * 0.75);
          otherBall.moveTo(angle, speed * 0.5);
          // // Move both balls
          // this.to = {
          //   x: this.posX + dx + speed,
          //   y: this.posY - dy - speed,
          // };

          // otherBall.to = {
          //   x: otherBall.posX - dx - speed,
          //   y: otherBall.posY + dy + speed,
          // };
        }
      }
    }
  }

  getDeltaCenterpoints(ball1, ball2) {
    // Calculate distance between two center points
    const ball1CenterPointX = ball1.posX + ball1.radius + 5;
    const ball1CenterPointY = ball1.posY + ball1.radius + 5;
    const ball2CenterPointX = ball2.posX + ball2.radius + 5;
    const ball2CenterPointY = ball2.posY + ball2.radius + 5;

    const dx = ball1CenterPointX - ball2CenterPointX;
    const dy = ball1CenterPointY - ball2CenterPointY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let angle =
      (Math.atan2(
        ball2CenterPointY - ball1CenterPointY,
        ball2CenterPointX - ball1CenterPointX
      ) *
        180) /
      Math.PI;
    if (angle < 0) angle += 360;

    // Helper lines
    // this.mainContext.beginPath();
    // this.mainContext.moveTo(ball1CenterPointX, ball1CenterPointY);
    // this.mainContext.lineTo(ball2CenterPointX, ball2CenterPointY);
    // this.mainContext.stroke();

    return { distance, dx, dy, angle };
  }

  resetFrames(frames = 50000) {
    this.frames = frames || this.maxFrames;
    this.frame = 0;
  }

  getEase(currentProgress, position, distance, steps) {
    const ease = -distance * (currentProgress /= steps) * (currentProgress - 2);
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
    // Calculate delta for speed
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
