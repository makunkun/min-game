import { Sprite } from "../base/Sprite.js";
import { Pencil } from "./Pencil.js";

// 下半部分的铅笔类
export class DownPencil extends Pencil{

  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top);
  }

  draw() {
    let gap = window.innerHeight / 5;
    this.y = this.top + gap;
    super.draw();
  }


}