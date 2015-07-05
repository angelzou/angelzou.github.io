---
layout: post
title: [译]Git基础——建立Git仓库
comments: true
categories: [翻译, git]
tags: 
- git
---
![git](/img/git-0.png)

这个练习提供了最重要的Git命令的简要概述。     

首先，建立一个仓库章节解释了你需要开始一个新的版本控制项目的所有工具。然后，接下来的章节介绍了你每天需要使用的Git命令。    
在这个模块的最后，你应该能够创建一个Git仓库，用于妥善保管你项目中的记录快照，而且可以查看你的项目历史状态。<!--more-->    
###git init  
`git init` 命令用于创建一个新的Git仓库。它可以将一个现有的、未受版本控制项目转换为Git仓库，或者初始化一个新的空仓库。在初始化仓库之前，大多数其它Git命令是不可用的，因此这个命令通常为你在运行一个新的项目之前的第一个命令。   
执行`git init`命令，在项目的根目录下面创建了一个`.git`子目录，它包含这个仓库的所有重要的元数据。除了`.git`目录，现有项目保持不变。（不同于SVN，Git不需要在每一个子目录下面都有一个`.git`文件）     
####使用方法
<pre><code>git init
</code></pre>
将当前目录转换为一个Git仓库。这个命令添加了一个`.git`文件在当前目录下面，并且这个文件将能够开始记录项目的每一个版本信息。    
<pre><code>git init directory
</code></pre>
在一个指定的目录下面创建一个空的Git仓库。运行这个命令将会创建一个名为`directory`的文件，只包含`.git`子目录。
<pre><code>git init --bare directory
</code></pre>
初始化一个空的Git仓库，但省略了工作目录（通常这个称为裸仓库）。创建共享仓库时应该总是使用`--bare`标志（具体请看下面的讨论）。按照惯例，使用`--bare`标志初始化的仓库目录名应该以`.git`结尾。例如，一个名为`my-project`的裸仓库应该存储在一个名为`my-project.git`目录里。     
####讨论
和SVN进行比较，`git init`命令是创建新的版本控制项目的一个非常简单的方式。Git不要求你创建存储库，包括文件，以及检查工作副本。你需要做的仅仅是使用`cd`命令进入你的项目根目录，然后运行`git init`命令，这样，你将会有一个功能齐全的Git仓库。     
然而，对于大多数的项目而说，`git init`仅仅只需要被执行一次用来创建一个中心仓库——典型的开发者不使用`git init`命令来创建他们的本地仓库。相反的，他们经常使用`git clone`命令来复制一个存在的仓库到他们的本地机器。    
####裸仓库
使用`--bare`标志创建的仓库不存在一个工作目录，因此在此仓库中，无法编辑文件和提交更改。中心仓库应该总是以裸仓库的方式来创建，因为，推送分支到一个非裸仓库存在覆盖变化的可能性。考虑使用`--bare`方式标记一个仓库作为一个存储设备，而不是一个开发环境。这意味着，对于所有的Git工作流，中心仓库应该是裸仓库，本地开发者仓库应该是非裸仓库。    
![bare/non-bare](/img/git-1.png)    
####例子
自从`git clone`是用于创建本地项目副本的一个更方便的方式， 使用`git init`创建一个中心仓库的一个更加常用的使用用例如下所示：<pre><code>ssh user@host
cd path/above/repo
git init --bare my-preject.git
</code></pre>
首先，使用SSH服务进入将会包含你中心仓库的服务器。然后进入到你想存储项目的位置。最后使用带有`--bare`标志的初始化命令来创建一个中心存储仓库。   

开发者将会使用：<pre><code>[clone] (/tutorials/setting-up-a-repository/git-clone) my-project.git
</code></pre>
在本地机器上面创建项目的副本。    
###git clone
`git clone`命令用于复制一个存在的Git仓库。这个有点像`svn checkout`，除了“工作副本”以外，是一个完整的Git仓库，有自己的历史版本，管理自己的文件，而且它是一个完全隔离于原始仓库的环境。       

为了方便，在克隆的时候，会自动的创建一个称为原点（origin pointing）指向原始仓库的远程连接。这使本地仓库和中心仓库进行交互变得容易。
####使用方法
<pre><code>git clone repo
</code></pre>
克隆位于`repo`的中心仓库到本地机器。原始仓库可以位于本地文件系统或者在一个通过HTTP或者SSH协议来访问的远程机器里。    
<pre><code>git clone repo directory
</code></pre>
克隆一个位于`repo`的中心仓库到本地机器一个名为`directory`的文件中。    
####讨论
如果一个项目已经是一个建立的中心仓库，`git clone`命令对于用户来说，是更常用的方式用于获取一个开发版本。就像`git init`，克隆通常是一次性操作——一旦开发者获取了一个工作副本，所有的版本控制操作和协作通过它们的本地仓库来进行管理。   
####仓库到仓库的协作
重要的是需要理解：Git关于“工作副本”的思想是非常不同于从SVN仓库中检出的代码的工作副本。不同于SVN，Git中的工作副本和中心仓库之间是没有区别的，它们都是完整的Git仓库。    
这使得使用Git进行项目协作和使用SVN是有着根本的区别的。相对于SVN依赖于中心仓库和工作副本的关系进行协作，Git的协作模型是基于仓库和仓库之间的交互。而不是检出一个工作副本到SVN的中心仓库，在Git中，使用`push`或者`pull`从一个仓库提交到另一个仓库。     
![svn](/img/git-2.png)
![git](/img/git-3.png)      

当然，没有什么可以阻止你指定特定的Git仓库特殊的意义。例如，对于一个简单的目的来说，一个Git仓库作为一个“中心”仓库，可以使用Git复制一个集中式工作流。关键是，这是通过约定完成的，而不是通过硬连接到VCS本身。 

####例子
下面的例子展示了怎样获取一个中心仓库的本地副本，中心仓库存储在服务器端，使用SSH协议的用户名为`john`访问`example.com`。
<pre><code>git clone ssh://john@example.com/path/to/my-project.git
cd my-project
# start working on the project
</code></pre>
第一个命令是初始化一个新的Git仓库到你本地及其的`my-project`文件中，而且拥有者中心仓库的内容。然后，使用`cd`命令进入项目目录，便可以开始编辑文件，提交快照，以及和其他仓库进行交互。同时需要注意，`.git`的扩展在克隆的仓库中被省略。这反映本地副本是非裸仓库状态。

###git config
`git config`命令允许你在命令行中配置你的Git安装信息（或者个人仓库）。这个命令能够定义一个仓库的每一个用户信息的偏好和行为。几个常用的配置选项一下列表所示。

####使用方法
`git config user.name name`       
在当前仓库定义所有提交时需要使用的作者姓名。典型的，你也许想要使用 `--global` 标志来设置当前用户的配置选项。
<pre><code>git config --global user.name name
</code></pre>
定义作者名字，将被用于当前用户的提交信息。
<pre><code>git config --global user.email email
</code></pre>
定义作者的邮箱，将被用户当前用户的提交信息。
<pre><code>git config --global alias.<alias-name> <git-command>
</code></pre>
创建Git命令的简写      
<pre><code>git config --system core.editor <editor>
</code></pre>
在当前机器上面定义文本编辑器给所有用户。<editor>参数应该是一个启动期望的编辑器的命令（例如：vi）。
<pre><code>git config --global --edit
</code></pre>
在编辑器中打开全局配置文件，用于手工编辑。

####讨论
所有的配置选项存储在一个纯文本文件中，因此`git config`命令只是一个方便的命令行交互命令。典型地，当你在一个新的开发机器上面开始工作时，你只需要配置Git安装信息一次，而且，对于所有用例，你将会想要使用`--global`标志。       
Git存储配置选项在三个独立的文件中，即允许你选择范围选项是：个人仓库、用户还是整个系统：    

- <repo>/.git/config - 特定仓库设置   
- ~/.gitconfig - 特定用户设置     
- $(prefix)/etc/gitconfig - 系统全局设置    

当这些文件产生冲突，本地设置会覆盖用户设置，用户设置覆盖系统全局设置。如果你打开任意这些文件，你将会看见下面的信息：
<pre><code>[user]
	name = John Smith
	email = john@example.com
[alias]
	st = status
	co = checkout
	br = branch
	up = rebase
	ci = commit
[core]
	editor = vim
</code></pre>
你可以手动编辑这些值，这和`git config`命令是完全相同的效果。
####例子
首先，在安装完Git之后，你将想要配置你的姓名/邮箱以及自定义一些默认的设置。一个典型的初始化配置也许看起来如下所示：
<pre><code># 告诉Git你是谁
git config --global user.name "John Smith"
git config --global user.email john@example.com
</code></pre>
<pre><code># 选择你爱好的编辑器
git config --global core.editor vim
</code></pre>
<pre><code># 添加一些SVN似的别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.up rebase
git config --global alias.ci commit
</code></pre>
这些配置会自动生成到`~/.gitconfig`文件中。


####原文地址
[Setting up a repository](https://www.atlassian.com/git/tutorials/setting-up-a-repository)

（本人英语水平有限，若翻译有误，请指出，谢谢！）
