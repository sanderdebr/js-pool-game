import { BALL_SIZE, CANVAS_TOTAL_HEIGHT, CANVAS_TOTAL_WIDTH } from "./settings";

import Ball from "./Ball";

export default class BallFactory {
  constructor(ctx, holes) {
    this.ctx = ctx;
    this.holes = holes;
    this.setupDistance = 300;
    this.centerY = CANVAS_TOTAL_HEIGHT / 2 - BALL_SIZE / 2;
    this.spaceBetweenBalls = 5;
    this.balls = [];
  }

  createBalls() {
    this.createWhiteBall();
    this.createRowOfFive();
    this.createRowOfFour();
    this.createRowOfThree();
    this.createRowOfTwo();
    this.createRowOfOne();
    return this.balls;
  }

  createWhiteBall() {
    const whiteBallStartPos = {
      x: 345,
      y: CANVAS_TOTAL_HEIGHT / 2 - BALL_SIZE / 2,
    };
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 0, whiteBallStartPos)
    );
  }

  createRowOfFive() {
    let xLine = CANVAS_TOTAL_WIDTH - this.setupDistance;

    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 5, {
        x: xLine,
        y: this.centerY - BALL_SIZE * 2 - this.spaceBetweenBalls * 2,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 4, {
        x: xLine,
        y: this.centerY - BALL_SIZE - this.spaceBetweenBalls,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 13, { x: xLine, y: this.centerY })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 2, {
        x: xLine,
        y: this.centerY + BALL_SIZE + this.spaceBetweenBalls,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 11, {
        x: xLine,
        y: this.centerY + BALL_SIZE * 2 + this.spaceBetweenBalls * 2,
      })
    );
  }

  createRowOfFour() {
    let xLine =
      CANVAS_TOTAL_WIDTH -
      this.setupDistance -
      BALL_SIZE -
      this.spaceBetweenBalls;

    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 14, {
        x: xLine,
        y:
          this.centerY - BALL_SIZE / 2 - this.spaceBetweenBalls * 2 - BALL_SIZE,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 3, {
        x: xLine,
        y: this.centerY - BALL_SIZE / 2 - this.spaceBetweenBalls,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 10, {
        x: xLine,
        y: this.centerY + BALL_SIZE / 2,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 6, {
        x: xLine,
        y: this.centerY + BALL_SIZE / 2 + this.spaceBetweenBalls + BALL_SIZE,
      })
    );
  }

  createRowOfThree() {
    let xLine =
      CANVAS_TOTAL_WIDTH -
      this.setupDistance -
      BALL_SIZE * 2 -
      this.spaceBetweenBalls * 2;

    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 1, {
        x: xLine,
        y: this.centerY - BALL_SIZE - this.spaceBetweenBalls * 2,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 8, {
        x: xLine,
        y: this.centerY - BALL_SIZE / 2 + this.spaceBetweenBalls * 2,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 15, {
        x: xLine,
        y: this.centerY + BALL_SIZE,
      })
    );
  }

  createRowOfTwo() {
    let xLine =
      CANVAS_TOTAL_WIDTH -
      this.setupDistance -
      BALL_SIZE * 3 -
      this.spaceBetweenBalls * 3;

    this.balls.push(
      new Ball(this.ctx, this.holes, "whole", 7, {
        x: xLine,
        y: this.centerY - BALL_SIZE / 2 - this.spaceBetweenBalls,
      })
    );
    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 12, {
        x: xLine,
        y: this.centerY + BALL_SIZE / 2,
      })
    );
  }

  createRowOfOne() {
    let xLine =
      CANVAS_TOTAL_WIDTH -
      this.setupDistance -
      BALL_SIZE * 4 -
      this.spaceBetweenBalls * 4;

    this.balls.push(
      new Ball(this.ctx, this.holes, "half", 9, {
        x: xLine,
        y: this.centerY - BALL_SIZE / 2 + this.spaceBetweenBalls * 2,
      })
    );
  }
}
