(function() {
  'use strict';

  // 函数声明
  // function Animal() {

  // }

  // 函数表达式
  var Animal = function(name, age) {
    this.name = name;
    this.age = age;
  };
  Animal.prototype.say = function() {
    console.log(this.name + '   ' + this.age);
  };
  var cat = new Animal('小猫', 3);
  cat.say();

  // 寄生组合继承
  // call() apply()
  // 调用一个对象的一个方法，用另一个对象替换当前对象

  // Animal.prototype.say.apply(cat);
  // var params = {
  //   name: '小猫2',
  //   age: 4,
  // }
  // cat.say.call(params);
})()