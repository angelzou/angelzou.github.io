---
layout: post
title: 块元素，行内元素，置换元素
comments: true
categories: [web, html]
tags: [块元素, 行内元素]
---

###定义
1. 块元素   
   什么是块元素？块元素是`diaplay`属性值为`block`的元素。块元素会产生换行。

2. 行内元素    
   行内元素是`display`属性值为`inline-block`的元素。

3. 置换元素    
   置换元素是：一个`内容`不收CSS视觉格式化模型控制，CSS渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素。 （除置换元素之外的元素是非置换元素）

> 不是所有的行内元素都不能设置宽高的，**行内置换元素**是可以设置的，比如`img`， `input`，`button`，`select`，`textarea`；而行内非置换元素是不可以设置的。
<!--more-->
####补充

* 块级元素：块级元素是那些视觉上会被格式化成块状的元素，通俗一点来说就是那些会换新行的元素。`display` 属性的：`block`, `list-item`, `table`, `flex`, `grid` 值都可以将一个元素设置成块级元素。

	> 块级元素包含块元素

* 行内级元素：行内级元素是那些不会为自身内容形成新的块，而让内容分布在多行中的元素。`display` 属性的：`inline`, `inline-table`, `inline-block`, `inline-flex`, `inline-grid` 值都可以将一个元素设置成行内级元素。

	> 行内级元素包含行内元素


**强烈推荐大家看参考文献中的两篇文章，介绍的比较详细易懂**

###列举下下（MDN） 
1. [块元素列表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)     
![block elements](/img/block-elems.png)

2. [行内元素列表](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente)     
![inline elements](/img/inline-elem.png)



####参考

1. [置换元素和非置换元素](http://blog.doyoe.com/2015/03/15/css/%E7%BD%AE%E6%8D%A2%E5%92%8C%E9%9D%9E%E7%BD%AE%E6%8D%A2%E5%85%83%E7%B4%A0/)
2. [视觉格式化模型中的各种框](http://blog.doyoe.com/2015/03/09/css/%E8%A7%86%E8%A7%89%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%A8%A1%E5%9E%8B%E4%B8%AD%E7%9A%84%E5%90%84%E7%A7%8D%E6%A1%86/#block-level-element)

