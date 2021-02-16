import {
  BALL_SIZE,
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_TOTAL_HEIGHT,
  CUE_HEIGHT,
  CUE_WIDTH,
} from "./settings";

import CueImage from "./assets/images/cue.png";

export default class Cue {
  constructor(mainContext, canvasPosition) {
    this.mainContext = mainContext;
    this.canvasPosition = canvasPosition;
    this.image = new Image();
    this.image.src = CueImage;

    this.shotFromStart = false;

    // Shooting
    this.mouseDown = false;
    this.power = 0;
    this.shot = false;

    // Rotation
    this.rotateAngle = 0;

    // Starting position of cue context
    this.ctxPosX = 355;
    this.ctxPosY = CANVAS_TOTAL_HEIGHT / 2;

    // Starting position of cue image
    this.posX = -CUE_WIDTH;
    this.posY = -CUE_HEIGHT / 2;
  }

  handleRotateCue(e) {
    const { clientY } = e;

    // Only half circle when shot from start
    const isHalfCircle =
      clientY > this.canvasPosition.top + CANVAS_PADDING &&
      clientY < this.canvasPosition.bottom - CANVAS_PADDING;

    // Calculate angle for cue to circle around ball
    if (this.shotFromStart && isHalfCircle) {
      const relativeMouseYPos =
        clientY - (this.canvasPosition.top + CANVAS_PADDING);
      const percentage = relativeMouseYPos / CANVAS_HEIGHT;
      // Calculate angle
      if (percentage < 0.5) {
        this.rotateAngle = 270 + percentage * 2 * 90;
      } else {
        this.rotateAngle = (percentage - 0.5) * 2 * 90;
      }
    } else {
      this.rotateAngle = clientY;
    }
  }

  increasePower() {
    this.mainContext.save();
    this.mainContext.rotate(this.rotateAngle * (Math.PI / 180));

    this.posX--;
    this.power += 10;

    this.mainContext.restore();
  }

  moveToWhiteBall({ x, y }) {
    this.ctxPosX = x + BALL_SIZE / 2;
    this.ctxPosY = y + BALL_SIZE / 2;
  }

  drawRotatingCue() {
    this.mainContext.save();
    // Move context to main ball position
    this.mainContext.translate(this.ctxPosX, this.ctxPosY);
    this.mainContext.rotate(this.rotateAngle * (Math.PI / 180));
    this.mainContext.drawImage(
      this.image,
      this.posX,
      this.posY,
      CUE_WIDTH,
      CUE_HEIGHT
    );

    // Helper box for main context
    // this.mainContext.beginPath();
    // this.mainContext.rect(this.posX, this.posY, 100, 100);
    // this.mainContext.stroke();
    this.mainContext.restore();
  }

  update() {
    this.drawRotatingCue();

    if (this.mouseDown) {
      this.increasePower();
    }

    // Only shoot once, reset power
    if (this.shot) {
      this.shot = false;
    }

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  handleMouseDown() {
    this.latestPos = { x: this.posX, y: this.posY };
    this.mouseDown = true;
    this.power = 0;
  }

  handleMouseUp() {
    this.mouseDown = false;
    this.shot = true;
    this.posX = this.latestPos.x;
    this.posY = this.latestPos.y;
  }

  addMouseDownHandler() {
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  addRotateCueHandler() {
    this.handleRotateCueBinding = this.handleRotateCue.bind(this);
    document.addEventListener("mousemove", this.handleRotateCueBinding);
  }

  removeRotateCueHandler() {
    document.removeEventListener("mousemove", this.handleRotateCueBinding);
  }
}
