---
layout: post
title: Git基础——保存改变的记录
comments: true
categories: [翻译, git]
tags: 
- git
---
![git-save](/img/git-save-1.png)


###git add
`git add`命令用于将工作目录中的改变添加到临时区域。它告诉Git，你想要在下一次的提交之前将更新的版本包括到一个特定的文件中。然而，`git add`没有真正影响到存储库中任何重要的地方——只到你运行`git commit`命令，改变才会真正的记录到版本库中。

在使用这些命令的同时，你需要使用`git status`命令去查看工作目录和临时区域的状态。
<!--more-->
####使用方法
<pre><code>git add &lt;file&gt;</code></pre>
为下一次的提交，添加现阶段&lt;file&gt;中所有的改变

	git add <directory>

为下一次的提交，添加现阶段&lt;directory&gt;中所有的改变

	git add -p

开始一个交互的临时会话，允许你选择添加一个文件的部分到下一次的提交。

这将为你呈现更改的数据块，并提示你输入命令。使用`y`暂存该数据块，`n`忽略该数据块，`s`将它分割成更小的块，`e`用于手动编辑块，`q`是退出。

####讨论
`git add`和`git commit`命令组合成基础的Git工作流。这两个命令是每一个Git用户都需要理解的，无论他们团队的协作模式怎样。这两个命令意味着记录一个项目的版本到仓库的历史记录里。

开发一个项目，涉及基本的编辑/保存（stage）/提交模式。首先，在工作目录中编辑你的文件。当你准备保存项目当前状态的一个副本，你使用`git add`保存当前的变化。之后，你使用`git commit`提交临时快照到项目的历史记录里。   

![stage](/img/git-save-2.png)

`git add`命令不应该和`svn add`命令混淆，`svn add`是提交一个文件到存储库。相反的，`git add`工作于更抽象级别的变化。这意味着`git add`命令在你改变一个文件的每一次都需要被唤醒，然而，`svn add`命令对于每一个文件只需要唤醒一次。`git add`这种方式听起来好像很冗余，但是这样的工作流使项目更容易被组织。

####临时区域（暂存区域）
临时区域是Git中更独特的功能之一，如果你是从SVN（或者Mercurial）使用者的身份来使用Git的，你可能需要用一些时间来消化这个知识。将它认为工作目录和项目历史版本之间的缓冲区会更加有助于理解这个概念。

代替自上次到现在提交你所做的所有的改变，临时区域在真正将这些改变提交到项目历史记录中之前，使你将相关的改变组合到高度集中的快照中。这意味着你可以对不相关的文件进行各种编辑，然后通过添加相关的变化到临时区域来回滚和将它们分隔到逻辑提交中，在一点一点的提交。对于任何一个版本控制系统来说，创建一个原子提交是很有必要的，因为这样可以很容易的跟踪Bugs和回复该项目中其它部分影响最下的改变。

####例子
当你开始一个新项目时, `git add`和`svn import`的功能一样。创建一个初始化的提交到当前的目录，使用下面的两个命令：

	git add
	git commit

当你的项目在运行，通过传递新文件的路劲给`git add`命令来添加文件

	git add hello.py
	git commit	

上面的命令，你也可以使用到已经存在的而且有记录改变的文件上。

###git commit
`git commit`命令提交临时区域快照到项目历史记录中。提交的快照可以理解为项目的一个“安全”的版本——Git将永远不会改变它们，除非你要求Git这么做。它和`git add`命令一起工作，是Git中最重要命令之一。

这个命令不同于`svn commit`，虽然它们共享一个相同的名字。快照被提交到本地仓库中，而且这个需求绝对不会和其它的Git仓库进行交互。

####使用方法

	git commit

提交临时区域的快照。这个启动一个文本编辑器提示你添加一个提交的信息。在你输入信息之后，保存文件，然后关闭编辑器来创建真正的提交。

	git commit -m "<message>"

提交临时区域快照，但是不会启动一个文本编辑器，使用&lt;message&gt;作为提交的信息。

	git commit -a

提交工作目录中所有改变的快照。这个只会包括所跟踪文件的改变（那些通过·`git add`添加的文件在其它历史点中）。

####讨论
快照总是提交到本地仓库。这个不同于SVN，SVN是将工作副本提交到中心仓库中。相反的，Git不会强制你和中心仓库进行交互，除非你准备好了。就如临时区域是工作目录和项目历史记录之间的缓冲区一样，每一个开发者的本地仓库是他们的贡献内容和中心仓库之间的缓冲区。

对于Git用户来说，这个改变是基本的开发模式。而不是直接处理改变和提交到中心仓库。Git开发者有机会再他们的本地仓库中积累提交历史。这相对于SVN类型的合作来说，有很多优势：

它更加容易分隔特征到原子提交；保持相关联提交组合在一起；在发布到中心仓库之前清理本地历史。而且，它允许开发者在一个隔离的环境中工作，延迟集成，除非他们在一个方便的时间点。

####快照，而不是差异

除了SVN和Git实际上的区别之外，其底层的实现也遵循完全不同的设计理念。不同于SVN跟踪文件的差异，Git版本控制模型是基于快照的。例如，一个SVN提交由和添加到仓库中原始文件进行比较组成。Git，另一方面，记录在每次提交中，每一个文件的全部内容。

![svn](/img/git-save-4.png)    

![git](/img/git-save-6.png)

这使得Git的很多操作比SVN要快很多，因为文件的特定版本不需要从它的不同分支中进行“组装”——在Git的内部数据库中，每个文件的完整版本是立即有效的。

Git的快照模式对它的版本控制模型的每一个方面有着深远的影响的， 从它的分支和合并工具到它的协作工作流。

####例子

	git add hello.py
	git commit

这个会打开一个文件编辑器（工作git config自定义的），要求添加提交信息，伴随着需要提交的列表信息：

	# Please enter the commit message for your changes. Lines starting
	# with '#' will be ignored, and an empty message aborts the commit.
	# On branch master
	# Changes to be committed:
	# (use "git reset HEAD <file>..." to unstage)
	#
	#modified: hello.py

Git不要求提交信息必须有着一定的指定格式约束，但是规范格式总结整个提交，第一行不多于50个字符，空一行，然后写入变化内容的相信解释，例如：

	Change the message displayed by hello.py

	- Update the sayHello() function to output the user's name
	- Change the sayGoodbye() function to a friendlier message

请注意，很多开发者也喜欢使用现在时提交信息。这使得它们读起来更像在操作仓库，使得很多历史重写的操作更加直观。


####原文地址
[Saving changes](https://www.atlassian.com/git/tutorials/saving-changes)

（本人英语水平有限，若翻译有误，请指出，谢谢！）
