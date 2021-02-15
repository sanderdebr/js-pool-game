import {
  BALL_SIZE,
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_TOTAL_HEIGHT,
} from "./settings";

import Ball from "./Ball";

export default class BallFactory {
  static CreateBall(ctx, type) {
    const whiteBallStartPos = {
      x: 345,
      y: CANVAS_TOTAL_HEIGHT / 2 - BALL_SIZE / 2,
    };

    if (type == "WhiteBall") {
      return new Ball(ctx, 1, whiteBallStartPos);
    }

    if (type == "TestBall") {
      return new Ball(ctx, 2, { x: 800, y: 340 }, null);
    }

    if (type == "TestBall2") {
      return new Ball(ctx, 3, { x: 900, y: 350 }, null);
    }

    if (type == "TestBall3") {
      return new Ball(ctx, 3, { x: 850, y: 320 }, null);
    }

    if (type == "TestBall4") {
      return new Ball(ctx, 3, { x: 880, y: 370 }, null);
    }
  }
}
