import { CANVAS_TOTAL_HEIGHT, CANVAS_TOTAL_WIDTH } from "./settings";

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
    this.canvas.width = CANVAS_TOTAL_WIDTH;
    this.canvas.height = CANVAS_TOTAL_HEIGHT;
    document.body.appendChild(this.canvas);
  }
}
