---
layout: post
title: JavaScript单线程&setTimeout
comments: true
categories: [web, javascript]
tags: [单线程, setTimeout]
---

###JavaScript是单线程的
* JavaScript是单线程的，同一时间只能做一件事情。

	作为浏览器语言，JavaScript的主要用途是实现交互。
	试想：如果JavaScript是多线程的。如果同时有两个线程，这两个线程同时操作同一个DOM节点，一个添加内容，一个是删除操作，这时浏览器该如何响应呢？

* 单线程机制—》任务队列排队执行

	同步任务：主线程排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。（主线程上形成一个执行栈）
	异步任务：不进入主线程，而进入“任务队列”的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
	
	（一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行）

> 先执行同步任务，再执行异步任务。

<!--more-->
* 事件和回调函数

	“任务队列”是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在“任务队列”中添加一个事件，表示相关的异步任务可以进入“执行栈”了。主线程读取“任务队列”，就是读取里面有哪些事件。
	
	所谓“回调函数”（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数


* Event Loop

    主线程从“任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![eventloop](/assets/img/eventloop.png)  

###setTimeout()
定时器事件会放置在“任务队列”中。需要等待“执行栈”中的事件执行完之后才会执行。

定时器功能主要由`setTimeout()`和`setInterval()`这两个函数来完成.

区别在于：

	setTimeout(callback fn, time)：调用一次
    setInterval()：调用多次

`HTML5`标准规定了`setTimeout()`的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。

对于`DOM`的变动（尤其涉及重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用`requestAnimationFrame()`的效果要好于`setTimeout()`。

####setTimeout(fn, 0)
setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，就是尽可能早地执行setTimeout中的回调函数，而不是立即执行，因为它需要等待执行栈中的任务执行完毕。

####每隔一秒执行一次
利用闭包

	for(var j = 0; j < 4; j++) {
		// 闭包传参
	    (function(i) {
	        setTimeout(function() {
	            alert(i);  
	        }, (i + 1) * 1000);   // 第二个参数这样传不是很理解，但这样的确可以达到每隔一秒执行一次的效果
	    })(j);
	}


####参考
1. [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
2. [定时器](http://javascript.ruanyifeng.com/bom/timer.html)
