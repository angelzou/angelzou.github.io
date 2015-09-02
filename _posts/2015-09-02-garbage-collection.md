---
layout: post
title: JavaScript-垃圾收集
comments: true
categories: [web, javascript]
tags: [垃圾收集]
---

> 《JavaScript高级程序设计》读书笔记

###垃圾收集
JavaScript具有自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的内存。这种垃圾收集机制的原理，就是找出那些不再继续使用的变量，然后释放其占用的内存。整个过程会按照固定的时间间隔（或代码执行中预定的收集时间）周期性地执行。

上面提到JavaScript的垃圾收集是通过判断变量是否在使用。那如果判断呢？

比如说函数中的局部变量的生命周期。局部变量只在函数执行的过程中存在。在这个过程中，会为局部变量在栈（或堆）内存上分配相应的空间，以便存储它们的值。然后在函数中使用这些变量，直至函数执行结束。一旦函数执行结束，函数内的局部变量就不在使用，也就没有存在的必要了，因此可以释放它们的内存以供将来使用。对于全局变量，在浏览器关闭相应页面时释放。
	
	var outer = "i'm global"; // 关闭页面时释放
	function gc() {
		var inner = "test"; //局部变量inner
		console.log(inner);
	}
	gc(); // 函数执行完成后，释放局部变量内存空间

JavaScript的垃圾回收具体用到浏览器中的实现，通常有两个策略。
<!--more-->
### 1. 标记清除（mark-and-sweep）

JavaScript中最常用的垃圾收集方式是标记清除。当变量进入环境（eg，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上的标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作。销毁那些带标记的值并回收它们所占用的内存空间。

###2. 引用计数（reference counting）

引用计数的含义是跟踪记录每个值被引用的次数。当声明一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次数加1.相反，如果包含对这个值的引用的变量又取得了另外一个值，则这个值的引用次数减1。当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收。这样，当垃圾收集器下次再运行时，它就会释放哪些引用次数为零的值所占用的内存。

这里需要注意的一个概念是**循环引用**

####循环引用
循环引用指的是对象A包含一个指向对象B的指针，而对象B中也包含一个指向对象A的引用。如下所示：

	function problem() {
		var objectA = new Object();
		var objectB = new Object();
		objectA.someObject = objectB;
		objectB.anotherObject = objectA;
	}

在这个例子中，objectA和objectB通过各自的属性相互引用，就产生了循环引用，导致内存无法有效释放。

IE中有一部分对象并不是原生JavaScript对象。例如，其BOM和DOM中的对象就是使用C++以COM(Component Object Model)对象的形式实现的，而COM对象的垃圾收集机制采用的就是引用计数策略。   
因此，即使IE的JavaScript引擎是使用的标记清除策略来实现的，但JavaScript访问的COM对象依然是基于引用计数策略的。**换句话说，只要在IE中涉及COM对象，就会存在循环引用的问题。**

eg1（一个DOM元素与一个原生JavaScript对象之间创建了循环引用）：
	
	var element = document.getElementById("elem");
	var myObject = new Object();
	myObject.elem = element;
	element.someObject = myObject;

	// 为了避免循环引用的问题，在不使用的时候，手工断开原生JavaScript对象与DOM元素之间的连接。
	myObject.elem = null;
	element.someObject = null;

eg2（如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素无法被销毁）：

	function assignHandler() {
		var elem = document.getElementById("someElement");
		elem.onclick = function() {
			console.log(elem.id);
		}
	}

以上代码创建了一个作为`elem`元素时间处理程序的闭包，而这个闭包则又创建了一个循环引用。由于匿名函数保存了一个对`assignHandler()`活动对象的引用，因此就会导致无法减少elem的引用数。改成如下代码即可。

	function assignHandler() {
		var elem = document.getTlementById("someElement");
		var id = elem.id;
		elem.onclick = function() {
			console.log(id);
		};
		elem = null;
	}

在上面的代码中，通过把`elem.id` 的一个副本保存在一个变量中，并且在闭包中引用改变量消除了循环引用。

必须要记住：**闭包会引用包含函数的整个活动对象，而其中包含着`elem`。即使闭包不直接引用`elem`，包含函数的多动对象中也依旧会保存一个引用。因此，有必要把`elem`变量设置为null。这样就能够解除对DOM对象的引用，顺利地减少其引用数，确保正常回收其占用的内存。**

**将变量设置为null意味着切断变量与它此前引用的值之间的连接。当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存。**

为了解决上述问题，IE9把BOM和DOM对象都转换成了真正的JavaScript对象。



####引申阅读：    
[浅谈V8引擎中的垃圾回收机制](http://segmentfault.com/a/1190000000440270)

