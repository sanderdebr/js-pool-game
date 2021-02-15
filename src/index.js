import "./styles.css";

import {
  BOARD_COLOR,
  CANVAS_HEIGHT,
  CANVAS_PADDING,
  CANVAS_TOTAL_HEIGHT,
  CANVAS_TOTAL_WIDTH,
  CANVAS_WIDTH,
} from "./settings";

import BallFactory from "./BallFactory";
import Canvas from "./Canvas";
import Cue from "./Cue";

class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.objects = [];

    this.gameState = "shooting";
    this.setupObjects();
    this.gameLoop();
  }

  setupObjects() {
    this.cue = new Cue(this.ctx, this.canvas.getPosition());
    this.objects.push(this.cue);

    this.objects.push(BallFactory.CreateBall(this.ctx, "WhiteBall"));
    this.objects.push(BallFactory.CreateBall(this.ctx, "TestBall"));
  }

  clearAndDrawContext() {
    this.ctx.clearRect(0, 0, CANVAS_TOTAL_WIDTH, CANVAS_TOTAL_HEIGHT);
    this.ctx.fillStyle = BOARD_COLOR;
    this.ctx.fillRect(
      CANVAS_PADDING,
      CANVAS_PADDING,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }

  handleGame() {
    if (this.gameState === "shooting") {
      this.cue.addRotateCueHandler();
    }
  }

  gameLoop() {
    this.clearAndDrawContext();
    this.handleGame();

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
      this.objects[i].detectCollision(
        this.objects.filter((ball) => ball !== this.objects[i])
      );
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
