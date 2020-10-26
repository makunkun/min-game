import { Sprite } from "../base/Sprite.js";
import { Pencil } from "./Pencil.js";

// 上半部分的铅笔类
export class UpPencil extends Pencil{

  constructor(top) {
    const image = Sprite.getImage('pencilUp');
    super(image, top);
  }

  draw() {
    let gap = window.innerHeight / 5;
    this.y = this.top + gap;
    super.draw();
  }

}