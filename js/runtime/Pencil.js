import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 铅笔基类
export class Pencil extends Sprite{
  constructor(image, top) {
    super(image, 0, 0,
      image.width, image.height,
      // 刚好在右侧未出现到画布的位置
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height);
    this.top = top;
    this.moveSpeed = 2;
  }

  draw() {
    this.x = this.x - this.moveSpeed;
    super.draw(this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      this.x,
      this.y,
      this.width,
      this.height); 
  }
}