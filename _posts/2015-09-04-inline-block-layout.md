---
layout: post
title: CSS-display:inline-block布局
comments: true
categories: [web, css]
tags: [inline-block]
---

> 《CSS权威指南》：     
>   行内块元素是一个混合产物，它是块级元素和行内元素的混合。    
>   在行内块元素内部，会像块级元素一样设置内容的格式。就像所有块级或行内替换元素一样，行内块元素也有属性width和height，如果比周围内容高，这些属性会使行高增加。

写在前面的话：IE6/7 是不支持 `display: inline-block` 的。因此如果我们要使用 `display:inline-block` 来取代 `float` 来实现列表的水平布局，需要考虑浏览器的兼容性。不仅如此，使用 `display: inline-block` 来实现水平布局还会产生**空白间距**的问题，关于这个问题可以看 大漠 写的一篇文章（文章最后有链接）。

对于`display: inline-block` 布局，张鑫旭写过文章详细介绍过（文章最后有链接）。所以本文算是自己的一个简单整理吧。

### IE6/7 下的 `display: inline-block`
IE6/7 本身是不支持 `display: inline-block` 的。

在IE6/7下使用`display: inline-block` 会触发 IE6/7的 **hasLayout** （IE8以后已经不在使用， IE6/7下的一些bug很多时候就是和这个有关的。这时就需要触发hasLayout，一般的触发方法和触发BFC（[Block Formatting Contexts](http://angelzou.github.io/09-02-2015-css-block-formatting-contexts.html)）是一样的。本人觉得最好使的方法就是使用 `zoom: 1;`）。

因此，在IE6/7下，将`inline`元素转化为`inline-block`元素，触发了hasLayout，从而使*内联元素*拥有了*行内块元素*的一些特性（可以像块元素一样设置内容的样式），呈现和其他浏览器一样的效果。    
而对于将`block`元素转化为`inline-block`元素，虽然也同样触发了hasLayout，可是对于*块级元素*，它本身就是**行布局**，所以触发后，依然是行布局，依旧会产生换行。

因此使用 `display: inline-block` 实现水平布局，在IE6/7下，我们需要考虑两种情况：   

-  `block` 元素 `inline-block` 化  
	
	在相应的元素中设置CSS： `display: inline-block; *display: inline;`	

	HTML代码：

		<div class="line">
			<div class="b-2-ib">fff</div>
			<div class="b-2-ib">fff</div>
			<div class="b-2-ib">fff</div>
			<div class="b-2-ib">dfgfddddddddggfdddddddddddddddddddddg</div>
		</div>

		
	CSS代码：

		.line {
			font-size: 0;
			word-break: break-all;
		}
		.line .b-2-ib {
			width: 100px;
			line-height: 1;
			display: inline-block;
			*display: inline;  /*使其可以呈现内联元素的特性*/
			border: 1px solid #000;
			font-size: 16px;
			vertical-align: top;
		}


-  `inline` 元素　`inline-block` 化

	在相应的元素中直接设置CSS：`display: inline-block;` 即可。

	HTML代码：

		<div class="line2">
			<span class="i-2-ib">1</span>
			<span class="i-2-ib">2</span>
			<span class="i-2-ib">3</span>
			<span class="i-2-ib">4dggggggggggggggggggggggggggggg</span>
		</div>

	CSS代码：

		.line2 {
			font-size: 0;
			word-break: break-all;
		}

		.line2 .i-2-ib {
			width: 100px;
			line-height: 1;
			display: inline-block;
			*margin-left: -1px; /*解决1px的问题*/
			border: 1px solid #000;
			font-size: 16px;
			vertical-align: top;
		}

在本文所列出的代码中，解决空白间距，使用的是将`font-size`属性设置为`0` （目前Google已支持）。细心的人，可以发现：对于`inline` 元素　`inline-block` 化时，CSS代码中多加了`*margin-left: -1px;`，是因为在IE6/7下面会产生 1 像素问题。因此在这里使用的是这个方法。目前在Google，Firefox，IE10（以及切换IE自带的文档模式切换IE9/8/7/5）下，测试上面代码没有问题。

不过遇到具体问题需要具体分析以及找到解决办法。可以看看下面的两篇文章。


###更详细的，请看下面的两篇
1. 张鑫旭：[拜拜了,浮动布局-基于display:inline-block的列表布局](http://www.zhangxinxu.com/wordpress/2010/11/%E6%8B%9C%E6%8B%9C%E4%BA%86%E6%B5%AE%E5%8A%A8%E5%B8%83%E5%B1%80-%E5%9F%BA%E4%BA%8Edisplayinline-block%E7%9A%84%E5%88%97%E8%A1%A8%E5%B8%83%E5%B1%80/)

2. 大漠： [如何解决inline-block元素的空白间距](http://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements)