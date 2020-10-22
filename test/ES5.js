(function() {
  'use strict';

  // 函数声明
  // 因为声明提前，需要判断是否为函数来判断赋值不同值是不可操作的，故不推荐使用
  // function Animal() {

  // }

  // 函数表达式(推荐使用)
  var Animal = function(name, age) {
    this.name = name;
    this.age = age;
  };
  Animal.prototype.say = function() {
    console.log(this.name + '   ' + this.age);
  };
  var cat = new Animal('小猫', 3);
  cat.say();

  // call() apply()
  // 调用一个对象的一个方法，用另一个对象替换当前对象

  // Animal.prototype.say.apply(cat);
  // var params = {
  //   name: '小猫2',
  //   age: 4,
  // }
  // cat.say.call(params);

  // 寄生组合继承
  var Cat = function(name, age) {
    Animal.apply(this, [ name, age ]);
    // Animal.apply(this, arguments);
    // Animal.call(this, ...arguments)
  }

  Cat.prototype = Object.create(Animal.prototype);
  // 将子类的prototype的constructor指向子类本身
  Cat.prototype.constructor = Cat;
  Cat.prototype.say = function() {
    var p = {
      name: '父类名字',
      age: 10,
    }
    Animal.prototype.say.apply(p);
    console.log('这是子类的名字', this.name);
  }
  // console.log(Cat.prototype.say.toString())
  var cat1 = new Cat('子猫', 2);
  cat1.say();
})()