// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourcesLoader } from "./js/base/ResourcesLoader.js";

export class Main {
  constructor() {
    console.log('我执行啦');
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    const loader = ResourcesLoader.create();
    loader.onLoaded((map) => {
      this.onResourceFirstLoaded(map);
    })
  }
  
  onResourceFirstLoaded(map) {
    console.log(map);
  }
}