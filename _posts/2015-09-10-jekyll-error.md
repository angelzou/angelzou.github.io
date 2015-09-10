---
layout: post
title: Jekyll build error
comments: true
categories: [web]
tags: [jekyll]
---

今天将博客使用Gulp构建工具来进行管理。在使用的过程当中，总是在`jekyll build`这个命令的时候报错。错误如下图所示，提示`No such file or directory @ rb_sysopen ... `：     

![jekyll error](/assets/img/20150910/jekyll-error.png)

图中报错的原因是找不到该文件或者目录。   

最后发现这个原因是因为，`node_modules`目录下面安装的一些插件的目录路径过长，而Windows系统支持的文件目录路径的长度是有限制的，因此就会产生错误。

解决办法是：   
更改Jekyll的配置文件`_config.yml`，使用`exclude`将`node_modules`目录排除在外，这样jekyll在转换相应文件的时候就会排除`exclude`指定的文件、文件夹。即，添加如下一句话：

	exclude: ["node_modules"]

更改完成之后，便能正确执行了，如下图： 
![jekyll right](/assets/img/20150910/jekyll-right.png)
