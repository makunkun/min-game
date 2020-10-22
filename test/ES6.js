class Animal {

  constructor(name = '无姓名', age = 0) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(this.name, this.age);
  }
}

class Cat extends Animal {
  constructor(name, age) {
    super(name, age);
  }

  say() {
    super.say();
    console.log('这是子类的say', this.name, this.age);
  }
}
var cat = new Cat('成精猫猫哈哈哈', 10);
cat.say();