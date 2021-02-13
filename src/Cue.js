import {
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_WIDTH,
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

    this.isRotating = false;
    this.rotateAngle = 0;

    this.posX = -100;
    this.posY = CANVAS_HEIGHT / 2 + CANVAS_PADDING - 50;
    this.addMouseHandler();
  }

  withinTopAndBottom() {
    const { clientY } = e;
    const notHittingTableTop =
      clientY > this.canvasPosition.top + CANVAS_PADDING - 5;
    const notHittingTableBottom =
      clientY < this.canvasPosition.bottom - CANVAS_PADDING - 5;
    if (notHittingTableTop && notHittingTableBottom) {
      this.posY = clientY - (CANVAS_PADDING + CUE_HEIGHT / 2);
    }
  }

  handleMouseMove(e) {
    // Circle mouse around ball
    this.isRotating = true;
    this.rotateAngle = e.clientY;

    // Calculate translation position
  }

  addMouseHandler() {
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  rotate() {
    this.mainContext.save();
    this.mainContext.translate(380, 360);
    this.mainContext.rotate(this.rotateAngle * (Math.PI / 180));
    this.mainContext.drawImage(
      this.image,
      this.posX - 380,
      this.posY - 360,
      CUE_WIDTH,
      CUE_HEIGHT
    );
    this.mainContext.fillStyle = "rgba(0, 0, 0, .4)";
    this.mainContext.fillRect(
      0,
      0,
      CANVAS_WIDTH + CANVAS_PADDING * 2,
      CANVAS_HEIGHT + CANVAS_PADDING * 2
    );
    this.mainContext.restore();
  }

  update() {
    this.isRotating && this.rotate();

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  detectCollision() {
    return null;
  }
}
