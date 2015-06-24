---
layout: post
title: 学习AngularJS的第一个例子-数据绑定
comments: true
category: WEB
tags: 
- angularjs
---
> AngularJS 2都出来了，我还开始接触AngularJS 1.4.0       
> 《AngularJS权威教程》读书笔记

###AngularJS中的数据绑定
AngularJS创建实时模板来代替视图，而不是将数据合并进模板之后更新DOM。    
任何一个独立视图组件中的值都是动态替换的。这个功能可以说是AngularJS中最重要的功能之一。<!--more-->   

####下面是一个例子：   
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;!--ng-app告诉AngularJS处理HTML页面的引导应用--&gt;
&lt;html ng-app&gt;
&lt;head lang="en"&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;AngularJS-example1&lt;/title&gt;
    &lt;!--加载AngularJS脚本--&gt;
    &lt;script src="../dist/lib/angularjs/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;!--ng-model指令将内部数据模型对象（$scope）中的name属性绑定到了文本输入字段上--&gt;
	&lt;input type="text" ng-model="name" placeholder="Your name"/&gt;
	&lt;!-- { {...} } (注意两个中括号中是没有空格的) --&gt;
	&lt;h1&gt;hello { {name} }&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
效果如下图所示：    
![eg1](/img/angular-ex-1.png)

####第二个例子（使用控制器和模块）：    
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;!--ng-app 声明所有被它包含的元素都属于AngularJS 应用--&gt;
&lt;html ng-app="app"&gt;
&lt;head lang="en"&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;AngularJS-example1&lt;/title&gt;
    &lt;!--加载AngularJS脚本--&gt;
    &lt;script src="../dist/lib/angularjs/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
	&lt;!--ng-controller声明所有被它包含的元素都属于某个控制器--&gt;
	&lt;div ng-controller="MyController"&gt;
	&lt;!-- { {...} } (注意两个中括号中是没有空格的) --&gt;
	&lt;h1&gt;hello { { clock.now } }&lt;/h1&gt;
	&lt;script src="js/app.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>

<pre><code class="javascript">// app.js中代码
angular.module('app', []) // 声明模块
 .controller("MyController", function($scope){
    $scope.clock = {
        now: new Date()
    };
    var updateClock = function() {
        $scope.clock.now = new Date()
    };
    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});
</code></pre>
效果如下图所示：   
![eg1](/img/angular-ex-1-2.png)

在AngularJS中，模块是定义应用的最主要的方式。模块包含了主要的应用代码。一个应用可以包含多个模块，每一个模块都包含了定义具体功能的代码。    

AngularJS允许我们使用`angular.module()`方法来声明模块，这个方法能够接受两个参数，第一个是模块的名称，第二个是依赖列表，也就是可以被注入到模块中的对象列表。 如：`angular.module('app', []);`  

调用这个方法时如果只传递一个参数，就可以用它来引用模块。如：`angular.module('app');`

####`angular.module()`的参数列表具体如下:   
- param {string} name (字符串)    
	name是模块的名称
- param {array} requires (字符串数组)  
	requires包含了一个字符串变量组成的列表，每个元素都是一个模块名称，本模块依赖于这
些模块，依赖需要在本模块加载之前由注入器进行预加载。    

