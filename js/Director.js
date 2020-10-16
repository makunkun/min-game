import { DataStore } from "./base/DataStore.js";

// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
    console.log('构造器初始化');
    this.dataStore = DataStore.getInstance();
  }
  
  // 游戏运行的方法
  run() {
    // 获取dataStore中的map对象的背景图实例background
    const backgroundSprite = this.dataStore.get('background');
    // 并调用BackGround类所继承的Sprite的draw方法进行绘制
    backgroundSprite.draw();
  }

  // 单例模式
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
}