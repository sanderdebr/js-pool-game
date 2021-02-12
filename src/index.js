import "./styles.css";

import {
  BALL_SIZE,
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_WIDTH,
} from "./settings";

import Ball from "./Ball";
import Canvas from "./Canvas";
import Cue from "./Cue";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.objects = [];

    this.objects.push(new Cue(this.ctx, this.canvas.getPosition()));
    const whiteBallStartPos = {
      x: 400,
      y: (CANVAS_HEIGHT + CANVAS_PADDING * 2) / 2 - BALL_SIZE / 2,
    };

    const whiteBallEndPos = {
      x: 900,
      y: (CANVAS_HEIGHT + CANVAS_PADDING * 2) / 2 - BALL_SIZE / 2,
    };

    this.objects.push(
      new Ball(this.ctx, 1, whiteBallStartPos, whiteBallEndPos)
    );
    this.objects.push(
      new Ball(this.ctx, 2, { ...whiteBallStartPos, x: 800 }, null)
    );

    this.drawAndUpdate();
  }

  drawAndUpdate() {
    this.ctx.clearRect(
      0,
      0,
      CANVAS_WIDTH + CANVAS_PADDING * 2,
      CANVAS_HEIGHT + CANVAS_PADDING * 2
    );
    this.canvas.drawCanvas();

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
