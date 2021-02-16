export default class Player {
  constructor(name, wholeOrHalf) {
    this.name = name;
    this.wholeOrHalf = wholeOrHalf;
    this.isPlaying = false;
    this.points = 0;
  }
}
