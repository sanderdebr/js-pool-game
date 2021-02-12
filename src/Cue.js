import Settings, {
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CUE_HEIGHT,
  CUE_WIDTH,
} from "./settings";

import Canvas from "./Canvas";
import CueImage from "./assets/images/cue.png";

export default class Cue {
  constructor(mainContext, canvasPosition) {
    this.mainContext = mainContext;
    this.canvasPosition = canvasPosition;
    this.image = new Image();
    this.image.src = CueImage;

    this.posX = -100;
    this.posY = CANVAS_HEIGHT / 2 + CANVAS_PADDING - 50;
    this.addMouseHandler();
  }

  handleMouseMove(e) {
    const { clientY } = e;
    const notHittingTableTop =
      clientY > this.canvasPosition.top + CANVAS_PADDING / 2;
    const notHittingTableBottom =
      clientY < this.canvasPosition.bottom + CANVAS_PADDING;
    if (notHittingTableTop && notHittingTableBottom) {
      this.posY = clientY - this.canvasPosition.top;
    }
  }

  addMouseHandler() {
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  update() {
    this.mainContext.drawImage(
      this.image,
      this.posX,
      this.posY,
      CUE_WIDTH,
      CUE_HEIGHT
    );

    if (this.frame < this.frames) {
      this.frame++;
    }
  }

  detectCollision() {
    return null;
  }
}
