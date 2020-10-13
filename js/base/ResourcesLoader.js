// 资源文件加载器，确保canvas在图片资源完成后才进行渲染
import { Resources } from './Resources.js'

export class ResourcesLoader {
  constructor() {
    this.map = new Map(Resources);
    console.log(this.map);
    for (let [key, value] of this.map) {
      console.log(key);
      const image = new Image();
      image.src = value;
      // 将map中的每个key的value替换为已经加载了对应图片资源的图片实例
      this.map.set(key, image);
    }
  }

  onLoaded(callback) {
    let loadedCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++;
        if (loadedCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

  static create() {
    return new ResourcesLoader();
  }
}