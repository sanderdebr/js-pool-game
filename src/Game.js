import "./styles.css";

import BallFactory from "./BallFactory";
import Canvas from "./Canvas";
import Cue from "./Cue";
import GameInfo from "./GameInfo";

export default class Game {
  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.ctx;
    this.balls = [];
    this.ballFactory = new BallFactory(this.ctx, this.canvas.holes);
    this.gameInfo = new GameInfo(this.ctx);

    this.setupGame();
    this.loadLoop();
  }

  setupGame() {
    this.setupObjects();
    this.cue.addRotateCueHandler();
    this.cue.addMouseDownHandler();
  }

  setupObjects() {
    this.cue = new Cue(this.ctx, this.canvas.getPosition());

    this.balls = this.ballFactory.createBalls();

    this.whiteBall = this.balls.filter((ball) => ball.id === 0)[0];
  }

  handleGame() {
    // Wait for all balls to be still before moving the cue
    if (!this.cue.show) {
      setTimeout(() => {
        const noBallsRolling = this.balls.every((ball) => ball.speed < 10);
        if (noBallsRolling) {
          this.cue.show = true;
          this.cue.addRotateCueHandler();
          this.cue.addMouseDownHandler();
        }
      });
    }

    if (this.cue.shot) {
      this.whiteBall.moveTo(this.cue.rotateAngle, this.cue.power);
    }
  }

  showLoadingScreen() {
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Loading...", 10, 50);
  }

  loadLoop() {
    this.showLoadingScreen();

    const checkIfReady = setInterval(() => {
      const isReady = (ball) => ball.state === "ready";
      if (this.canvas.state === "ready" && this.balls.every(isReady)) {
        console.log("Game is ready");
        clearInterval(checkIfReady);
        this.gameLoop();
      }
    }, 1000);
  }

  gameLoop() {
    this.canvas.clearAndDrawContext();
    this.handleGame();
    this.cue.update();

    this.gameInfo.update();

    // Set cue at whiteball after finishing rolling
    this.cue.moveToWhiteBall({
      x: this.whiteBall.posX,
      y: this.whiteBall.posY,
    });

    for (var i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];

      if (ball.pocketed) {
        this.gameInfo.handlePocketedBall(ball);
        this.balls = this.balls.filter((x) => x !== ball);
      } else {
        ball.update(this.balls);
        ball.detectCollision(this.balls);
      }
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
