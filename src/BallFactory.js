import { BALL_SIZE, CANVAS_HEIGHT, CANVAS_PADDING } from "./settings";

import Ball from "./Ball";

export default class BallFactory {
  static CreateBall(ctx, type) {
    const whiteBallStartPos = {
      x: 345,
      y: (CANVAS_HEIGHT + CANVAS_PADDING * 2) / 2 - BALL_SIZE / 2,
    };

    if (type == "WhiteBall") {
      return new Ball(ctx, 1, whiteBallStartPos, { x: 500, y: 350 });
    }

    if (type == "TestBall") {
      return new Ball(ctx, 2, { ...whiteBallStartPos, x: 800 }, null);
    }
  }
}
