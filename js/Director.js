import { DataStore } from "./base/DataStore.js";

// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
    console.log('导演构造器初始化');
    this.dataStore = DataStore.getInstance();
  }
  
  // 游戏运行的方法
  run() {
    // 获取dataStore中的map对象的精灵实例
    // 并调用精灵类所继承的Sprite的draw方法进行绘制
    this.dataStore.get('background').draw();
    this.dataStore.get('land').draw();
    let timer = requestAnimationFrame(() => { this.run(); })
    this.dataStore.put('timer', timer);
    // cancelAnimationFrame(this.dataStore.get('timer'));
  }

  // 单例模式
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
}