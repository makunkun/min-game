// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourcesLoader } from './js/base/ResourcesLoader.js';
import { BackGround } from './js/runtime/BackGround.js';
import { Land } from './js/runtime/Land.js';
import { Director } from "./js/Director.js";
import { DataStore } from './js/base/DataStore.js';

export class Main {
  constructor() {
    this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    // 初始化单例全局数据DataStore
    this.dataStore = DataStore.getInstance();
    // 存储导演单例实例
    this.director = Director.getInstance();
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
    console.log(map);
    // 初始化精灵类
    this.init();
  }
  
  // 初始化
  init() {
    // put方法可以通过传入的精灵类，new出名为'精灵'的实例
    // 并放入dataStore的map中
    this.dataStore
      .put('pencils', [])
      .put('background', BackGround)
      .put('land', Land);
    // 单例导演的run方法里调用dataStore的get方法，取出map中的精灵类
    // 创建pencil类,(要在游戏逻辑运行之前)
    this.director.createPencil();
    // 并调用精灵类所继承的Sprite的draw方法进行绘制
    this.director.run();
  }

}