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
    this.balls = [];

    this.setupGame();
    this.gameLoop();
  }

  setupGame() {
    this.setupObjects();
    this.cue.addRotateCueHandler();
    this.cue.addMouseDownHandler();
  }

  setupObjects() {
    this.cue = new Cue(this.ctx, this.canvas.getPosition());

    this.balls.push(BallFactory.CreateBall(this.ctx, "WhiteBall"));
    this.balls.push(BallFactory.CreateBall(this.ctx, "TestBall"));

    this.whiteBall = this.balls.filter((ball) => ball.id === 1)[0];
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
    if (this.cue.shot) {
      const nextPos = this.whiteBall.moveTo(
        this.cue.rotateAngle,
        this.cue.power
      );
      this.cue.moveCueToWhiteBall(nextPos);
    }
  }

  gameLoop() {
    this.clearAndDrawContext();
    this.handleGame();

    this.cue.update();

    for (var i = 0; i < this.balls.length; i++) {
      const otherBalls = this.balls.filter(
        (ball) => ball.id !== this.balls[i].id
      );

      this.balls[i].update(otherBalls, this.cue.power);
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const game = new Game();
