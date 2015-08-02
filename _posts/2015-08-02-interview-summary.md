---
layout: post
title: 面试记录
comments: true
categories: [面试]
tags: [面试]
---

###一面
这一次的面试我真的是乱糟糟的，由于事发突然，面试赶在了组内开会和组内聚餐的中间了
，接到电话的时候我都是手足无措，不知道怎么处理了。当时的我，应该和面试官说明情况，
争取下次时间面试的。可是迟钝的我，硬着头皮面试了，还让组内的同事到处找我吃饭。最后，
面试的中途又不得不和面试官说，今天进行不下去了......。已哭瞎啊~

####this的使用场景
写在前面的话：需要注意的是，在严格模式下（即使用`"use strict";`进行声明），函数调用中的this的值会指向undefined。

MDN中的一篇文章[向严格模式过渡](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)，中写道：

> 在普通的函数调用f()中，this的值会指向全局对象。在严格模式中，this的值会指向undefined。
> 当函数通过call和apply调用时，如果传入的thisvalue参数是一个null和undefined除外的原始值(字符串,数字,布尔值)，则this的值会成为那个原始值对应的包装对象，如果thisvalue参数的值是undefined或null，则this的值会指向全局对象.在严格模式中，this的值就是thisvalue参数的值，没有任何类型转换。
<!--more-->
使用场景（可以直接看[详解JavaScript中的this](http://foocoder.com/blog/xiang-jie-javascriptzhong-de-this.html/)这篇文章）：   
1. 全局中的this，将会指向全局对象，在浏览器中则是window。
	
	```javascript
		console.log(this);
	```
2. 当函数作为对象的方法调用时，this指向该对象。

	```javascript
		var foo = {
			name: "angelzou",
			sayName: function() {
				console.log("Hello, " + this.name);
			}
		};
		foo.sayName(); // Hello, angelzou
	```
3. 只作为单纯的函数调用的话，this指向全局window。（这里请注意严格模式）

	```
		function foo1(x) {
			this.x = x;
		}
		foo1(2);
		console.log(x); // 2。严格模式下会报错Uncaught TypeError: Cannot set property 'x' of undefined
	```

4. 构造函数的this指向新创建的对象。

	```
		function Foo2(x) {
			this.x = x;
			console.log(this);
		}
		new Foo2(2); //Foo2 {x: 2}
	```

5. 嵌套函数中的this不会继承父级函数的this，需要将this变量进行暂存，保存到另外一个变量中才行。

	```
		// eg 1
		var name = "outer";
		var foo3 = {
			name: "inner",
			sayHello: function() {
				console.log(this.name);
				var subSayHello = function() {
					console.log(this.name);
				}
				subSayHello();
			}
		}
		foo3.sayHello(); //先输出inner，后输出outer
		
		// eg 2
		var name = "outer";
		var foo3 = {
			name: "inner",
			sayHello: function() {
				var that = this;
				console.log(that.name);
				var subSayHello = function() {
					console.log(that.name);
				}
				subSayHello();
			}
		}
		foo3.sayHello();  // 都输出inner

	```

6. call和apply函数中的this，指向传入的对象。

	```
		var name = "outer";
		var foo4 = {
			name: "inner",
			sayHello: function() {
				var that = this;
				console.log(that.name);
				var subSayHello = function() {
					console.log(that.name);
				}
				subSayHello();
			}
		}
		foo4.sayHello.call(foo4); // 都输出inner
		foo4.sayHello.call(window); // 都输出outer
	```

7. DOM事件中，传入的this是指向对应的DOM元素的

####CSS有哪几种选择器？怎么判断优先级？
CSS选择器有：
1. 通配符选择器：*
2. 元素选择器，eg：div、p    
3. ID选择器，eg：#ID
4. 类选择器，eg：.className
5. 后代选择器，eg：E F
6. 子元素选择器，eg：E>F。  (IE6不支持)
7. 相邻兄弟元素选择器，eg：E + F。  (IE6不支持)
8. 通用兄弟选择器，eg：E ~ F。  (IE6不支持)
9. 群组选择器，eg：E, F, ...
10. 属性选择器
11. 伪类选择器
12. 伪元素，`::first-letter`，`::first-line`，`::before`，`::after`，`::selection`

具体请看w3cplus里面的几篇文章   
[基本选择器](http://www.w3cplus.com/css3/basic-selectors)
[属性选择器](http://www.w3cplus.com/css3/attribute-selectors)
[伪类选择器](http://www.w3cplus.com/css3/pseudo-class-selector)
[选择器的优化](http://www.w3cplus.com/css/css-selector-performance)

优先级是根据CSS的权重等级来确定的。   
1. #ID：+100
2. .className，属性选择器，伪类选择器：+10
3. 元素选择器，伪元素：+1   
在计算的时候，进行累加。
4. 需要注意的是，行内样式是：+1000

```css
	body #id .class a:hover
```

上面的例子的最终权重为122，`#id`为100，`.class`和`:hover`都为10，`body`和`a`都为1。

具体请看w3cplus里面的一篇介绍：[你应该知道的一些事情——CSS权重](http://www.w3cplus.com/css/css-specificity-things-you-should-know.html)


####img元素的alt属性和title属性的区别
alt属性是规定的图片的替代文本，即当图片无法显示的时候，显示alt属性中的文本；alt属性是img标签的必须属性。   

title属性不是必须的，是规定元素的额外信息，有视觉效果，当鼠标放到文字或是图片上时有文字显示。

```html
	<img src="" alt="i am alt" tilte="i am title">
```
![img-alt-title.png](/img/img-alt-title.png)


####谈谈对闭包的理解
闭包：当前作用域总是能够访问外部作用域中的变量的函数。*可以将局部变量驻留在内存中* ，会增加内存消耗。创建闭包，其实就是在一个函数中嵌套另一个函数。我的一直理解是，闭包可以模拟私有变量，避免全局变量污染（理解的有问题么？）。

	```
		function outer() {
			var a = 10;
			function inner() {
				console.log(a);
			}
			inner();
		}
		outer();
	```

![closure](/img/closure-1.png)


特性：	
> 1. 函数嵌套函数
> 2. 函数内部可以引用外部的参数和变量
> 3. 参数和变量不会被垃圾回收机制回收

请看[JavaScript秘密花园-闭包和引用](http://bonsaiden.github.io/JavaScript-Garden/zh/#function.closures)


####visibility:hidden和display:none的区别
`visibility:hidden`：仅仅是使元素在视觉上看不见（完全透明），而它依旧在文档流中占有空间位置。    

`display:none`：元素的属性都将隐藏，并不会占有空间位置。

####line-height
`line-height`是能够被继承的属性，如果它的值是纯数字，则主要是参考`font-size`的值。具体可以看：[css中的line-height](http://segmentfault.com/a/1190000003038583).

####CSS的属性继承


####input元素的placeholder、readonly和disabled属性
`placeholder`：提示作用

`readonly`：只读属性。只读字段是不能修改的。不过，用户仍然可以使用 tab键切换到该字段，还可以选中或拷贝其文本。      
`readonly`属性可以防止用户对值进行修改，直到满足某些条件为止（比如选中了一个复选框）。然后，需要使用 JavaScript 消除 readonly 值，将输入字段切换到可编辑状态。    

`disabled`属性规定应该禁用 `input` 元素。`disabled` 属性无法与 `<input type="hidden"> `一起使用

####JavaScript中的垃圾回收机制（待总结）
主要有*”标记清除“*和*”引用计数“*。

[内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)      
[闭包拾遗](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)     
[重读JavaScript中的闭包部分](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)     


*闭包*，*循环引用*会导致内存泄露问题，例子：   

	```javascript
		function addHandler() {
    		var el = document.getElementById('el');
    		el.onclick = function() {
        		el.style.backgroundColor = 'red';
    		}
		}
	```

因为对 el的引用不小心被放在一个匿名内部函数中，所以el的引用数量最少是1，这就在 JavaScript 对象（这个内部函数）和本地对象之间（el）创建了一个循环引用，导致占用的内存永远不会被回收。解决方法，使用统一对象, 不使用新建的el对象。或者将el对象置为null。

	```
		function addHandler(){
		    document.getElementById('el').onclick = function(){
		        this.style.backgroundColor = 'red';
		    };
		}

		// 或者
		function addHandler () {
		   var el = document.getElementById( 'el');
		   var id = el.id;
		   el.onclick = function () {
		     alert(id);
		   };
		   el = null;
		}

	```


