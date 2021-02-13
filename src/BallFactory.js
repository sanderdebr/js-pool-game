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
      return new Ball(ctx, 2, { ...whiteBallStartPos, x: 800 }, null);
    }
  }
}
