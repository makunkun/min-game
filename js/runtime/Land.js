import { Sprite } from "../base/Sprite.js";

// 不断移动的陆地
export class Land extends Sprite{
  constructor() {
    const image = Sprite.getImage('land');
    super(image, 0, 0,
      image.width, image.height,
      0, window.innerHeight - image.height,
      image.width, image.height);
    // 地板的水平变化坐标
    this.landX = 0;
    // 每次移动的速度 px/次
    this.landSpeed = 2;
  }

  draw() {
    this.landX = this.landX + this.landSpeed;
    if (this.landX > (this.img.width - window.innerWidth)) {
      this.landX = 0;
    }
    super.draw(this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height)
  }
}