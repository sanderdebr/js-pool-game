import "./styles.css";

import { CANVAS_HEIGHT, CANVAS_PADDING, CANVAS_WIDTH } from "./settings";

import BallFactory from "./BallFactory";
import Canvas from "./Canvas";
import Cue from "./Cue";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.objects = [];

    this.objects.push(new Cue(this.ctx, this.canvas.getPosition()));

    this.objects.push(BallFactory.CreateBall(this.ctx, "WhiteBall"));
    this.objects.push(BallFactory.CreateBall(this.ctx, "TestBall"));

    this.drawAndUpdate();
  }

  clearAndDrawContext() {
    this.ctx.clearRect(
      0,
      0,
      CANVAS_WIDTH + CANVAS_PADDING * 2,
      CANVAS_HEIGHT + CANVAS_PADDING * 2
    );
    this.ctx.fillStyle = "rgb(0, 80, 0)";
    this.ctx.fillRect(
      CANVAS_PADDING,
      CANVAS_PADDING,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }

  drawAndUpdate() {
    this.clearAndDrawContext();

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
      this.objects[i].detectCollision(
        this.objects.filter((ball) => ball !== this.objects[i])
      );
    }

    requestAnimationFrame(this.drawAndUpdate.bind(this));
  }
}

const game = new Game();
