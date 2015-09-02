---
layout: post
title: 【转】CSS-Block Formatting Contexts
comments: true
categories: [web, css]
tags: [bfc]
---

> 译文原文：[HaoCn](http://segmentfault.com/a/1190000003068557)    
> 英文原文：[Ritesh Kumar](http://www.sitepoint.com/understanding-block-formatting-contexts-in-css/)

块级格式化上下文是网页CSS视觉渲染的一部分，并用于决定块盒子的布局。在定位体系（Positioning Scheme）中它属于常规流（Normal Flow）。根据W3C所言：

> 浮动、绝对定位元素（`position` 为 `absolute` 或 `fixed`）、行内块元素 `display:inline-block` 、表格单元格 `display:table-cell` 、表格标题 `display:table-caption` 以及`overflow` 属性值部位`visible` 的元素（除了该值被传播到视点`viewport`的情况）将创建一个新的块级格式化上下文。

上面的引言差不多总结了一个BFC是如何形成的。但让俺们用另外一种更通俗易懂的方式来重新定义它。一个BFC就是一个HTML盒子，它至少满足以下条件之一：

1. `float` 的值不为 `none`
2. `position` 的值不为 `static` 或 `relative`
3. `display` 的值为 `table-cell` 、 `table-caption` 、 `inline-block` 、 `flex` 或 `inline-flex`
4. `overflow` 的值不为 `visible`

###创建一个块级格式化上下文
一个BFC可以显示触发。如果我们想创建之，我们只需要给它添加上面提到的任何一个CSS样式。

比如，看下面的HTML：

	<div class="container">
		some content here
	</div>

一个新的BFC可以通过给容器添加任意一个必要的CSS样式来创建（如上面所列出的）。尽管上述条件都可以创建BFC，但也会产生一些其他效果，如：

1. `display: table` 可能引发响应性问题
2. `overflow: scroll` 可能产生多余的滚动条
3. `float: left` 将把元素移至左侧，并被其他元素环绕
4. `overflow: hidden` 将裁切溢出元素

所以无论何时，当要创建一个BFC时，我们要基于需求选择最恰当的样式。为了保持一致性，我在本文的所有例子中均使用 `overflow: hidden`。

	.container {
		overflow: hidden;
	}
<!--more-->
###BFC中的盒子的对齐
W3C规范道：

> 在BFC上下文中，每个盒子的左外侧紧贴包含块的左侧（从右到左的格式里，则为盒子右外侧紧贴包含块右侧），甚至有浮动也是如此（尽管盒子里的行盒子Line Box可能由于浮动而变窄），除非盒子创建了一个新的BFC（在这种情况下盒子本身可能由于浮动而变窄）。

![bfc](/img/20150902/bfc-1.jpg)

简单来说，如上图所示，所以属于BFC的盒子都是左对齐（在从左到右的格式下）并且他们的左外侧紧贴包含块的左侧。在最后一个盒子中我们可以看到，尽管左侧存在一个浮动元素（棕色），另外一个元素（绿色）仍然紧贴包含块的左侧。该情况的产生原理将在下文关于文字环绕的部分中讨论。


###外边距折叠

在常规流中，盒子从包含块的顶部开始一个个地垂直摆放。两个同胞盒子间的垂直距离由两个盒子各自的外边距所决定，但不是二者外边距之和。

为便于理解，我们看个例子 。

![外边距折叠](/img/20150902/bfc-2.jpg)

在上图中，一个红盒子包含着两个同胞绿元素，一个BFC已经创建了出来。

	<div class="container">
		<p>sibling 1</p>
		<p>sibling 2</p>
	</div>

相应的CSS是：
	
	.container {
		background-color: red;
		overflow: hidden;
	}
	p {
		background-color: lightgreen;
		margin: 10px 0;
	}

理论上两个同胞元素间的外边距应当是二者外边距之和（20px），但实际上却是10px。这就是众所周知的外边距折叠（Collapsing Margins）。如果同胞元素外边距不同，将应用最大的那个。

###使用BFC避免外边距折叠

在讨论了上面BFC折叠外边距的情况后，现在说避免折叠可能有点让人摸不着头脑。但我们必须牢记于心的一件事是，**相邻块级盒子（同胞）之间的垂直外边距只有在它们处于同一个BFC时才会发生折叠。如果它们分属于不同的BFC，就不会折叠了。**所以，通过创建新的BFC我们可以避免外边距折叠。	

让我们在早前的例子中添加第三个同胞元素，现在HTML是：

	<div class="container">
	    <p>Sibling 1</p>
	    <p>Sibling 2</p>
	    <p>Sibling 3</p>
	</div>

CSS是：

	.container {
	    background-color: red;
	    overflow: hidden; /* creates a block formatting context */
	}
	p {
	    background-color: lightgreen;
	    margin: 10px 0;
	}

结果和上面一样，即是说，折叠还是会发生并且三个同胞间分隔的垂直距离是10px。这是因为三个 p 标签都从属于同一个BFC。

现在我们修改第三个同胞元素，使之成为一个新的BFC的一部分。现在的HTML变成了：

	<div class="container">
	    <p>Sibling 1</p>
	    <p>Sibling 2</p>
	    <div class="newBFC">
	        <p>Sibling 3</p>
	    </div>
	</div>

	.container {
	    background-color: red;
	    overflow: hidden; /* creates a block formatting context */
	}
	p {
	    margin: 10px 0;
	    background-color: lightgreen;
	}
	.newBFC {
	    overflow: hidden;  /* creates new block formatting context */
	}

现在输出的结果就有所不同了：

![外边距折叠](/img/20150902/bfc-3.jpg)

因为第二个和第三个同胞元素现在分属于不同的BFC，它们之间就不会发生外边距折叠了。

###使用BFC包含浮动

BFC可以包含浮动。我们经常遇到容器中含有浮动元素的情况。这种情况下容器元素没有高度并且其浮动子元素脱离了网页的常规流。我们通常用清除浮动解决这个问题，最普遍的做法就是使用伪元素。但我们也可以通过创建一个BFC来解决问题。

![外边距折叠](/img/20150902/bfc-4.jpg)

看个例子：

	<div class="container">
	    <div>Sibling</div>
	    <div>Sibling</div>
	</div>

	.container {
	    background-color: green;
	}
	.container div {
	    float: left;
	    background-color: lightgreen;
	    margin: 10px;
	}

在上面这个例子中，容器没有任何高度，并且它包不住浮动子元素。为解决此问题，我们通过添加 overflow: hidden 来在容器中创建一个新的BFC。修改后的CSS成了：

	.container {
	    overflow: hidden; /* creates block formatting context */
	    background-color: green;
	}
	 
	.container div {
	    float: left;
	    background-color: lightgreen;
	    margin: 10px;
	}

现在容器可以包住浮动子元素，并且其高度会扩展至包住其子元素，在这个新的BFC中浮动元素又回归到页面的常规流之中了。

###使用BFC避免文字环绕

有时候浮动DIV旁边的文本会环绕它（如下图1所示）而这种情况有时候并不如我们所愿，我们想要下图2的效果。要解决这个问题，我们可以用外边距，但也可以用BFC。

![外边距折叠](/img/20150902/bfc-5.jpg)

首先让我们弄明白为何文字会环绕。要理解这个我们必须明白，当存在元素浮动的时候，盒模型如何工作。这就是我早先讨论BFC中对齐时候的遗留问题。我们通过下图来看图1到底发生了什么。

![外边距折叠](/img/20150902/bfc-6.jpg)

假设HTML是：
	
	<div class="container">
	    <div class="floated">
	        Floated div
	    </div>
	    <p>
	        Quae hic ut ab perferendis sit quod architecto, 
	        dolor debitis quam rem provident aspernatur tempora
	        expedita.
	    </p>
	</div>

上图整个黑色区域表示 `p` 元素，如我们所见，`p` 元素没有移位但它叠在了浮动元素之下，而p元素的行盒子（即文本行）却移位了，行盒子水平变窄来给浮动元素腾出了空间。

随着文本的增加，最后文本将环绕在浮动元素之下，因为那时候行盒子不再需要移位，也就成了图1的样子。这就是为什么即便有浮动元素，段落仍紧贴包含块的左侧，而行盒子会变窄来给浮动元素腾位子。

如果我们能位移整个 `p` 元素，这个环绕问题也就迎刃而解了。

在说解决方案之前，我们再回顾下W3C规范：

> 在BFC上下文中，每个盒子的左外侧紧贴包含块的左侧（从右到左的格式里，则为盒子右外侧紧贴包含块右侧），甚至有浮动也是如此（尽管盒子里的行盒子 Line Box 可能由于浮动而变窄），除非盒子创建了一个新的BFC（在这种情况下盒子本身可能由于浮动而变窄）。

据此，如果 `p` 元素创建一个新的BFC那它就不会再紧贴包含块的左侧了。给 `p` 元素添加 `overflow: hidden` 就能轻而易举地办到。这解决了文本环绕浮动对象的问题。

###在多列布局中使用BFC

如果我们创建一个占满整个容器宽度的多列布局，在某些浏览器中最后一列有时候会掉到下一行。这可能是因为浏览器四舍五入了列宽从而所有列的总宽度会超出容器。但如果我们在多列布局中的最后一列里创建一个新的BFC，它将总是占据其他列先占位完毕后剩下的空间。

我们来举个三列布局的例子：

这是HTML:

	<div class="container">
	    <div class="column">column 1</div>
	    <div class="column">column 2</div>
	    <div class="column">column 3</div>
	</div>

	.column {
	    width: 31.33%;
	    background-color: green;
	    float: left;
	    margin: 0 1%;
	}
	/*  Establishing a new block formatting 
	    context in the last column */
	.column:last-child {
	    float: none;
	overflow: hidden; 
	}

现在尽管盒子的宽度稍有改变，但布局不会打破。当然，对多列布局来说这不一定是个好办法，但能避免最后一列下掉。这个问题上弹性盒或许是个更好的解决方案，但这个办法可以用来说明元素在这些环境下的行为。

###总结：
我希望本文已经向你展示了BFC的特性以及BFC是如何影响页面上的元素的视图定位的。展示其用法的例子应该有让BFC显得更透彻一些。

如果你有任何想要补充的，请在评论里留言。如果你想更深入了解的话，一定得去回顾W3C对这个话题的详述。


####转载者注：
1. 关于BFC的多栏布局可以看一下张鑫旭的一篇文章：[CSS深入理解流体特性和BFC特性下多栏自适应布局](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

2. 可以看看W3C相关介绍：[Block formaatting contexts](http://www.w3.org/TR/CSS2/visuren.html#block-formatting)
