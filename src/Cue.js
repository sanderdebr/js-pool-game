import {
  CANVAS_HEIGHT,
  CANVAS_PADDING,
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

    this.shotFromStart = true;

    // Shooting
    this.power = 0;

    // Rotation
    this.allowRotating = false;
    this.rotateAngle = 0;

    // Position
    this.posX = -100;
    this.posY = CANVAS_HEIGHT / 2 + CANVAS_PADDING - 50;
    this.latestPos = null;
  }

  handleRotateCue(e) {
    // Circle mouse around ball
    this.allowRotating = true;

    if (this.shotFromStart) {
      if (e.clientY > 265 && e.clientY < 455) {
        this.rotateAngle = e.clientY;
      }
    } else {
      this.rotateAngle = e.clientY;
    }
  }

  handleMouseDown() {
    if (!this.latestPos) {
      this.latestPos = { x: this.posX, y: this.posY };
    }
    this.posX++;
    this.posY++;
    this.power++;
  }

  handleMouseUp() {
    if (!this.latestPos) {
      this.latestPos = { x: this.posX, y: this.posY };
    }
    this.posX = this.latestPos.x;
    this.posY = this.latestPos.y;
    this.latestPos = null;
    this.power = 0;
  }

  addRotateCueHandler() {
    document.addEventListener("mousemove", this.handleRotateCue.bind(this));
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  drawRotatingCue() {
    this.mainContext.save();
    this.mainContext.translate(355, 355);
    this.mainContext.rotate(-this.rotateAngle * (Math.PI / 180));
    this.mainContext.drawImage(
      this.image,
      this.posX - 355,
      this.posY - 355,
      CUE_WIDTH,
      CUE_HEIGHT
    );
    this.mainContext.restore();
  }

  drawCue() {
    this.mainContext.drawImage(
      this.image,
      this.posX,
      this.posY,
      CUE_WIDTH,
      CUE_HEIGHT
    );
  }

  update() {
    this.allowRotating ? this.drawRotatingCue() : this.drawCue();

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  detectCollision() {
    return null;
  }
}
