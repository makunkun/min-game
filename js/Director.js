import { DataStore } from "./base/DataStore.js";
import { DownPencil } from "./runtime/DownPencil.js";
import { UpPencil } from "./runtime/UpPencil.js";

// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
    console.log('导演构造器初始化');
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
  }
  
  // 加速度
  // addSpeed() {
  //   if (this.moveSpeed < 6) {
  //     this.moveSpeed += 0.005;
  //   } else if (this.moveSpeed >= 6) {
  //     this.moveSpeed += 0.002;
  //   } else if (this.moveSpeed >= 10) {
  //     this.moveSpeed = 10;
  //   }
  //   console.log(this.moveSpeed);
  // }

  createPencil() {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  // 游戏运行的方法
  run() {
    if (!this.isGameOver) { 
      // this.addSpeed();
      // 获取dataStore中的map对象的精灵实例
      // 并调用精灵类所继承的Sprite的draw方法进行绘制
      // 注意绘制图层的顺序！！！

      // 绘制背景图
      this.dataStore.get('background').draw();

      const pencils = this.dataStore.get('pencils');

      // 当第一组铅笔离开画布时,销毁掉它
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        // shift() 方法将数组第一个元素推出数组，并length减1
        pencils.shift();
        pencils.shift();
      }

      // 如果距离合适且只有一组铅笔， 就再创建一组
      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 &&
      pencils.length === 2) {
        this.createPencil();
      }

      // 循环绘制铅笔
      pencils.forEach((value) => {
        value.draw();
      });

      // 绘制陆地
      this.dataStore.get('land').draw();

      // 绘制小鸟
      this.dataStore.get('birds').draw();
      let timer = requestAnimationFrame(() => { this.run(); })
      this.dataStore.put('timer', timer);
    } else {
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
    }
  }

  // 单例模式
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
}