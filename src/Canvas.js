import { CANVAS_HEIGHT, CANVAS_PADDING, CANVAS_WIDTH } from "./settings";

export default class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.addCanvas();
  }

  getPosition() {
    return this.canvas.getBoundingClientRect();
  }

  addCanvas() {
    this.canvas.width = CANVAS_WIDTH + CANVAS_PADDING * 2;
    this.canvas.height = CANVAS_HEIGHT + CANVAS_PADDING * 2;
    document.body.appendChild(this.canvas);
  }

  drawCanvas() {
    this.ctx.fillStyle = "rgb(0, 80, 0)";
    this.ctx.fillRect(
      CANVAS_PADDING,
      CANVAS_PADDING,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }
}
