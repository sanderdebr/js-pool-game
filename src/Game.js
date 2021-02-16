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

export default class Game {
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
    this.balls.push(BallFactory.CreateBall(this.ctx, "TestBall1"));
    this.balls.push(BallFactory.CreateBall(this.ctx, "TestBall2"));
    // this.balls.push(BallFactory.CreateBall(this.ctx, "TestBall3"));
    // this.balls.push(BallFactory.CreateBall(this.ctx, "TestBall4"));

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
      this.whiteBall.moveTo(this.cue.rotateAngle, this.cue.power);
    }
  }

  gameLoop() {
    this.clearAndDrawContext();
    this.handleGame();

    this.cue.update();

    // Set cue at whiteball after finishing rolling
    this.cue.moveToWhiteBall({
      x: this.whiteBall.posX,
      y: this.whiteBall.posY,
    });

    for (var i = 0; i < this.balls.length; i++) {
      this.balls[i].allowGetEase = true;
      this.balls[i].update(this.balls);
      this.balls[i].detectCollision(this.balls);
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
