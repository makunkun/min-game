// 变量储存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  constructor() {
    this.map = new Map();
  }

  // 放入数据
  put(key, value) {
    if (typeof value === 'function') {
      value = new value();
    }
    this.map.set(key, value);
    // 为了链式调用put方法，将对象本身return
    return this;
  }
  
  // 获取数据
  get(key) {
    return this.map.get(key);
  }

  // 销毁所有数据
  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
  }

  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
}