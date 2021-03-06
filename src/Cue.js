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
    this.image.onLoad = null; //TODO
    this.image.src = CueImage;
    this.show = true;

    // Shooting
    this.mouseDown = false;
    this.power = 0;
    this.maxPower = 5000;
    this.shot = false;
    this.shotFromStart = false;

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
    if (this.power < this.maxPower) {
      this.mainContext.save();
      this.mainContext.rotate(this.rotateAngle * (Math.PI / 180));

      this.posX--;
      this.power += 25;

      this.mainContext.restore();
    }
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

  handleShot() {
    this.shot = true;
    this.show = false;
    this.removeListeners();
  }

  update() {
    if (this.show) {
      this.drawRotatingCue();
    }

    this.shot = false;

    if (this.mouseDown) {
      this.increasePower();
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
    this.handleShot();
    this.posX = this.latestPos.x;
    this.posY = this.latestPos.y;
  }

  addMouseDownHandler() {
    this.handleMouseDownBinding = this.handleMouseDown.bind(this);
    this.handleMouseUpBinding = this.handleMouseUp.bind(this);
    document.addEventListener("mousedown", this.handleMouseDownBinding);
    document.addEventListener("mouseup", this.handleMouseUpBinding);
  }

  addRotateCueHandler() {
    this.handleRotateCueBinding = this.handleRotateCue.bind(this);
    document.addEventListener("mousemove", this.handleRotateCueBinding);
  }

  removeListeners() {
    document.removeEventListener("mousedown", this.handleMouseDownBinding);
    document.removeEventListener("mouseup", this.handleMouseUpBinding);
    document.removeEventListener("mousemove", this.handleRotateCueBinding);
  }
}
