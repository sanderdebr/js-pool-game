export default class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.addCanvas();
  }

  addCanvas() {
    this.canvas.width = 900;
    this.canvas.height = 500;
    document.body.appendChild(this.canvas);
  }

  drawCanvas() {
    this.ctx.fillStyle = "rgb(0,80,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
