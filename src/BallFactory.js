import Ball from "./Ball";

export default class BallFactory {
  constructor() {
    this.balls = [];
  }

  createBalls(amount) {
    for (let i = 0; i < amount; i++) {
      this.addBall();
    }
    return this.balls;
  }

  addBall() {
    const ball = new Ball();
    this.balls.push(ball);
  }
}
