import { Sprite } from '../base/Sprite.js'

// 小鸟类
// 循环渲染图片的三个部分小鸟
export class Birds extends Sprite{

  constructor() {
    const image = Sprite.getImage('birds');
    super(image, 0, 0,
      image.width, image.height,
      0, 0, image.width, image.height);
  }

}