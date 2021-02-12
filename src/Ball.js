import WhiteBall from "./assets/images/ball_white.png";

export default class Ball {
  constructor(id, x, y) {
    this.id = id;
    this.image = new Image();
    this.image.src = WhiteBall;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.updateX = 0.01;
    this.updateY = 0.01;
  }

  update(timestamp) {
    console.log(this.updateX);
    this.x += this.updateX;
    this.y += this.updateY;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
