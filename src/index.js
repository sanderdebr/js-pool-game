import "./styles.css";

import Ball from "./Ball";
import Canvas from "./Canvas";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.balls = [];

    this.balls.push(
      new Ball(this.ctx, 1, { x: 100, y: 178 }, { x: 800, y: 200 })
    );
    this.balls.push(new Ball(this.ctx, 2, { x: 400, y: 200 }, null));

    this.drawAndUpdate();
  }

  drawAndUpdate() {
    this.ctx.clearRect(0, 0, 900, 500);
    this.canvas.drawCanvas();

    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].update();
      this.balls[i].detectCollision(
        this.balls.filter((ball) => ball !== this.balls[i])
      );
    }

    requestAnimationFrame(this.drawAndUpdate.bind(this));
  }
}

const game = new Game();
