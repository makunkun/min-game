// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourcesLoader } from "./js/base/ResourcesLoader.js";
import { Director } from "./js/Director.js";

export class Main {
  constructor() {
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    // 资源加载器及获取回调的map对象
    const loader = ResourcesLoader.create();
    loader.onLoaded((map) => {
      this.onResourceFirstLoaded(map);
    })
    // 导演单例
    Director.getInstance();
    // 测试
    let image = new Image();
    image.src='../res/background.png';
    image.onload=() => {
      this.ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        image.width,
        image.height,
      );
    }
  }
  
  onResourceFirstLoaded(map) {
    console.log(map);
  }
}