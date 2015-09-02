---
layout: post
title: JavaScript-闭包
comments: true
categories: [web, javascript]
tags: [闭包]
---

> 《JavaScript高级程序设计》读书笔记

首先明确一下**匿名函数**的概念。匿名函数是指在function关键字后面没有标识符的函数。使用函数表达式创建的函数都是匿名函数。

	var test = function(arg1, arg2) {
		console.log("我是匿名函数");
	}

###闭包

**闭包**是指有权访问另一个函数作用域中的变量的函数。从这句话中，就可以看出，闭包的创建是依赖于函数的。

闭包是内部函数，存在于包含函数（即外部函数）里面的函数。它能够将包含函数的活动对象添加到它的作用域链中。

	function createComparisonFunction(propertyName) {
		return function(object1, object2) {
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			if(value1 < value2) {
				return -1;
			} else if (value1 > value2) {
				return 1;
			} else {
				return 0;
			}
		};
	}
	// 创建函数
	var compareNames = createComparisonFunction("name");
	// 调用函数
	var result = compareNames({name: "Nicholas"}, {name: "Greg"});
	// 解除对匿名函数的引用（以便释放内存）
	compareNames = null;

下图展示了调用`compareNames()`的过程中产生的作用域链之间的关系。也能够比较清楚的看到：**闭包会携带包含它的函数的作用域**。因此闭包会比其他函数占用更多的内存。过度使用闭包可能导致内存占用过多，只在绝对必要时再考虑使用闭包。
<!--more-->
![调用compareNames()过程中产生的作用域链之间的关系](/img/20150902/closure-1.png)

注意：**闭包只能取得包含函数中任何变量的最后一个值**。如下在循环中使用闭包的情况。

	// 该返回的数组中的值都是10
	function createFunctions() {
		var result = new Array();
		for(var i = 0; i < 10; i++) {
			result[i] = function() {
				return i;
			};
		}
		return result;
	}

可以通过创建另一个立即执行的匿名函数包裹闭包，并将`i`以参数的形式传入到该匿名函数中。

	function createFunctions() {
		var result = new Array();
		for(var i = 0; i < 10; i++) {
			result[i] = function() {
				return function(num) {
					return num;
				}
			}(i);
		}
		return result;
	}

###模拟块级作用域
用作块级作用域（通常称为私有作用域）的匿名函数的语法如下所示：

	// 1. 全局环境下使用
	（function() {
		// 这里是块级作用域
	}）();


	// 2. 函数中使用，形成了闭包，但该闭包会立即执行，而且没有指向该闭包的其它引用，一旦该闭包执行完，便会销毁其作用域链
	function outputNumbers(count) {
		(function() {
			for(var i = 0; i < count; i++) {
				console.log(i);
			}
		})();
		console.log(i);
	}

1. 这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。

2. 这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行完毕，就可以立即销毁其作用域链了。



