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

    this.shotFromStart = true;

    // Shooting
    this.mouseDown = false;

    // Rotation
    this.allowRotating = false;
    this.rotateAngle = 0;

    // Position
    this.posX = -100;
    this.posY = CANVAS_HEIGHT / 2 + CANVAS_PADDING - 50;
  }

  handleRotateCue(e) {
    const { clientY } = e;
    this.allowRotating = true;

    // Calculate angle for cue to circle around ball
    if (
      clientY > this.canvasPosition.top + CANVAS_PADDING &&
      clientY < this.canvasPosition.bottom - CANVAS_PADDING
    ) {
      const relativeMouseYPos =
        clientY - (this.canvasPosition.top + CANVAS_PADDING);
      const percentage = relativeMouseYPos / CANVAS_HEIGHT;
      // Calculate angle
      if (percentage < 0.5) {
        this.rotateAngle = 270 + percentage * 2 * 90;
      } else {
        this.rotateAngle = (percentage - 0.5) * 2 * 90;
      }
    }
  }

  increasePower() {
    this.posX++;
    this.posY++;

    this.mainContext.beginPath();
    this.mainContext.moveTo(0, this.rotateAngle);
    this.mainContext.lineTo(345 + BALL_SIZE / 2, CANVAS_TOTAL_HEIGHT / 2);
    this.mainContext.stroke();
  }

  handleMouseDown() {
    this.latestPos = { x: this.posX, y: this.posY };
    this.mouseDown = true;
  }

  handleMouseUp() {
    this.mouseDown = false;
    this.posX = this.latestPos.x;
    this.posY = this.latestPos.y;
  }

  addMouseDownHandler() {
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  addRotateCueHandler() {
    document.addEventListener("mousemove", this.handleRotateCue.bind(this));
  }

  drawRotatingCue() {
    this.mainContext.save();
    this.mainContext.translate(355, 355);
    this.mainContext.rotate(this.rotateAngle * (Math.PI / 180));
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
    if (this.allowRotating) {
      this.drawRotatingCue();
    } else {
      this.drawCue();
    }

    if (this.mouseDown) {
      this.increasePower();
    }

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  detectCollision() {
    return null;
  }
}
