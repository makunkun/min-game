import { DataStore } from "./base/DataStore.js";
import { DownPencil } from "./runtime/DownPencil.js";
import { UpPencil } from "./runtime/UpPencil.js";

// 导演类，控制游戏的逻辑
export class Director {
  constructor() {
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
  // }

  createPencil() {
    const minTop = DataStore.getInstance().canvas.height / 8;
    const maxTop = DataStore.getInstance().canvas.height / 2;
    const top = minTop + Math.random() * (maxTop - minTop);
    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }

  birdsEvent() {
    const birds = this.dataStore.get('birds');
    for (let i = 0; i <= 2; i++) {
      birds.y[i] = birds.birdsY[i];
    }
    birds.time = 0;
  }

  // 判断小鸟是否和铅笔撞击
  static isStrike(bird, pencil) {
    let s = false;
    if (bird.top > pencil.bottom ||
          bird.bottom < pencil.top ||
            bird.right < pencil.left ||
             bird.left > pencil.right) {
       s = true;
    }
    return !s;
  }

  // 判断小鸟是否撞击地板和铅笔
  check() {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');
    // 创建小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0],
    };

    // 地板的撞击判断
    if (birdsBorder.bottom >= land.y) {
      this.isGameOver = true;
      return;
    }

    // 创建铅笔的边框模型并调用判断撞击函数
    const  length = pencils.length;
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      // 创建每一支铅笔的边框模型
      const pencilBorder = {
        top:  pencil.y,
        bottom:  pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width,
      };
      // 判断每一支铅笔是否与小鸟撞击
      if (Director.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true;
        return;
      }
    }
    // 加分逻辑
    // this.dataStore.get('score').draw();
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width 
      &&score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    }

  }

  // 游戏运行的方法
  run() {
    this.check();
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
        // 回收铅笔时开启加分功能
        this.dataStore.get('score').isScore = true;
      }

      // 如果距离合适且只有一组铅笔， 就再创建一组
      if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
      pencils.length === 2) {
        this.createPencil();
      }

      // 循环绘制铅笔
      pencils.forEach((value) => {
        value.draw();
      });

      // 绘制陆地
      this.dataStore.get('land').draw();

      // 绘制分数
      this.dataStore.get('score').draw();

      // 绘制小鸟
      this.dataStore.get('birds').draw();
      let timer = requestAnimationFrame(() => { this.run(); })
      this.dataStore.put('timer', timer);
    } else {
      this.dataStore.get('startButton').draw();
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