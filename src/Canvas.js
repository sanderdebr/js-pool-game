export default class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.addCanvas();
    return this.canvas;
  }

  addCanvas() {
    this.canvas.width = 900;
    this.canvas.height = 500;
    this.canvas.style.backgroundColor = "red";
    document.body.appendChild(this.canvas);
  }
}
