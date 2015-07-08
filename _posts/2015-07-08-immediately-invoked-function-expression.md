---
layout: post
title: 立即调用函数表达式
comments: true
categories: [web, JavaScript]
tags:
- javascript
---
### 我的理解
立即调用的函数表达式， 就是函数外面用括号`()`包裹起来。（这里指的函数大多数是匿名函数），如下所示：

	(function() { ... })();  //1
	(function() { ... }());  //2

匿名函数使用括号包围起来之后，其实称为“函数表达式”。第一条语句可以理解为：组操作符环绕函数表达式不包含调用括号；第二条语句：组操作符环绕函数表达式和调用括号。它们都解释为：立即调用的函数表达式。

> ()，对于函数而言，放在函数的引用后面，可以理解为“函数调用操作符”； 而它的另一个用途便是“组操作符”，“组操作符”里面只能是表达式。

关于函数为什么要用括号围绕起来，请看：[ECMAScript：Question "about surrounding parentheses"](http://dmitrysoshnikov.com/ecmascript/chapter-5-functions/#question-about-surrounding-parentheses)

也可以使用，如下的方式来使用立即调用函数表达式：

	 !function(){}();
	 +function(){}();
	 -function(){}();
	 ~function(){}();
	 ~(function(){})();
	 void function(){}();

###注意
1. 圆括号（parentheses）在Javascript中有两种作用，一种表示调用函数，另一种表示不同的值的组合（grouping），即组操作符。

2. JavaScript里括号()里面不能包含语句，所以在这一点上，解析器在解析function关键字的时候，会将相应的代码解析成function表达式，而不是function声明。也因此立即调用函数表达式只有在程序执行到函数时它才能被访问。 所以，任何消除函数声明和函数表达式间歧义的方法，都可以被解析器正确识别（如上面给出的方法都是可以的）。

3. 这种方法能够有效的避免变量污染问题
<!--more-->

####参考：

1. 中文翻译：[立即调用的函数表达式](http://www.cnblogs.com/tomxu/archive/2011/12/31/2289423.html)

2. 英文原文：[Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

###番外
在查看别人的代码的时候遇到了在立即调用的函数表达式前面加分号的情况，不是很明白原因，因此便查查原因。主要原因是，它有如下用途：


* 防止多文件集成成一个文件后，压缩后出现语法错误。

	**想想**：立即调用的函数表达式是一个表达式，如果紧跟在一个函数后面，此时会产生错误的，如下代码所示： 

		var a = function () {
		    console.log("a");
		}(function() {
		    console.log("void");
		})();

	运行时，会报错：`Uncaught TypeError: (intermediate value)(...) is not a function(anonymous function)`

	如果加了分号，便能正确执行，下面的代码输出void：

		var a = function () {
		    console.log("a");
		};(function() {
		    console.log("void");
		})();


* 这是一个匿名函数，一般js库都采用这种立即调用的函数表达式来保护内部变量 (function(){})();

* 因为undefined是window的属性，声明为局部变量之后，在函数中如果再有变量与undefined作比较的话，程序就可以不用搜索undefined到window，可以提高程序性能 （这个有待研究）          


		(function($, undefined) {
		    ...
		})(jQuery, undefined); // 将全局变量作为一个参数传入匿名函数中

####参考
1. [为什么要在立即调用的函数表达式前面加分号](http://blog.pzy.me/2014/04/28/wei-shi-yao-zai-jszai-function-qian-mian-jia-fen-hao/)

