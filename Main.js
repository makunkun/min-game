// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourcesLoader } from './js/base/ResourcesLoader.js';
import { BackGround } from './js/runtime/BackGround.js';
import { Director } from "./js/Director.js";
import { DataStore } from './js/base/DataStore.js';

export class Main {
  constructor() {
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    // 初始化单例全局数据DataStore
    this.dataStore = DataStore.getInstance();
    // 资源加载器及获取回调的map对象
    const loader = ResourcesLoader.create();
    loader.onLoaded((map) => {
      this.onResourceFirstLoaded(map);
    })
    // 导演单例
    // Director.getInstance();
  }
  

  // 第一次加载，获取到资源全部加载完成的map对象
  onResourceFirstLoaded(map) {
    // 不需要销毁的变量进行直接进行赋值，不放在map中（否则会被销毁）
    // 放入画笔
    this.dataStore.ctx = this.ctx;
    // 放入所有图片组成的map对象
    this.dataStore.res = map;
    // 初始化精灵类
    this.init();
  }
  
  // 初始化
  init() {
    // 向dataStore的map中 放入 background实例对象
    this.dataStore
      .put('background',
        new BackGround(this.ctx,
           this.dataStore.res.get('background')));
    // 用单例导演 开始绘制
    Director.getInstance().run();
  }

}