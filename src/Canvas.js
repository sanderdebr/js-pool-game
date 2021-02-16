import {
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_TOTAL_HEIGHT,
  CANVAS_TOTAL_WIDTH,
  CANVAS_WIDTH,
} from "./settings";

export default class Canvas {
  constructor() {
    this.state = "idle";
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.edgeSize = 30;
    this.holeSize = 25;
    this.holes = [];

    // Only show table after importing table image
    this.tableImage = new Image();
    import(`./assets/images/table_pattern.jpg`).then((src) => {
      this.state = "ready";
      this.tableImage.src = src.default;
    });

    this.calculateHoles();
    this.addCanvas();
  }

  clearAndDrawContext() {
    this.clearCanvas();
    this.drawEdges();
    this.drawCloth();
    this.drawHoles();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, CANVAS_TOTAL_WIDTH, CANVAS_TOTAL_HEIGHT);
  }

  drawEdges() {
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(
      CANVAS_PADDING - this.edgeSize,
      CANVAS_PADDING - this.edgeSize,
      CANVAS_WIDTH + this.edgeSize * 2,
      CANVAS_HEIGHT + this.edgeSize * 2
    );
  }

  calculateHoles() {
    let x, y;
    const holes = [];
    // First
    x = CANVAS_PADDING + 10;
    y = CANVAS_PADDING + 10;
    this.holes.push({ id: 1, x, y });
    // Second
    x = CANVAS_TOTAL_WIDTH / 2;
    this.holes.push({ id: 2, x, y });
    // Third
    x = CANVAS_WIDTH + CANVAS_PADDING - 10;
    this.holes.push({ id: 3, x, y });
    // Fourth
    x = CANVAS_PADDING + 10;
    y = CANVAS_HEIGHT + CANVAS_PADDING;
    this.holes.push({ id: 4, x, y });
    // Fifth
    x = CANVAS_TOTAL_WIDTH / 2;
    this.holes.push({ id: 5, x, y });
    // Sixth
    x = CANVAS_WIDTH + CANVAS_PADDING - 10;
    this.holes.push({ id: 6, x, y });
  }

  drawHoles() {
    this.ctx.fillStyle = "#202020";
    this.ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      this.ctx.arc(
        this.holes[i].x,
        this.holes[i].y,
        this.holeSize,
        0,
        2 * Math.PI
      );
    }
    this.ctx.fill();
    this.ctx.beginPath();
    for (let i = 3; i < 6; i++) {
      this.ctx.arc(
        this.holes[i].x,
        this.holes[i].y,
        this.holeSize,
        0,
        2 * Math.PI
      );
    }
    this.ctx.fill();
  }

  drawCloth() {
    const pattern = this.ctx.createPattern(this.tableImage, "repeat");
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(
      CANVAS_PADDING,
      CANVAS_PADDING,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
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
