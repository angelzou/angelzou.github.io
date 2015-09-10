---
layout: post
title: 【译】Git基础-检查仓库
comments: true
categories: [翻译, git]
tags:
- git
---
![inspecting](/assets/img/git-inspecting-1.png)

###git status
`git status` 命令用于显示工作目录和暂存区的状态。它可以让你查看Git中，哪些内容已经暂存，哪些未暂存，还有哪些文件没有被追踪。`git status` 命令输出的状态没有展示任何有关提交项目的历史信息。对于这个，你需要使用 `git log` 命令。

####使用方法

	git status

列出哪些文件已经暂存，哪些未暂存还有哪些没有被跟踪<!--more-->

####讨论
`git status`是一个相对直接的命令。它简单的显示接下来你应该使用`git add`还是`git commit`命令。这些状态信息也包括有关暂存/未暂存文件的说明。`git status`命令显示的信息包括三个主要的种类，如下所示：

	# On branch master
	# Changes to be committed:
	# (use "git reset HEAD <file>..." to unstage)
	#
	#modified: hello.py
	#
	# Changes not staged for commit:
	# (use "git add <file>..." to update what will be committed)
	# (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#modified: main.py
	#
	# Untracked files:
	# (use "git add <file>..." to include in what will be committed)
	#
	#hello.pyc

####忽略文件
未被追踪的文件通常分为两种。它们也许是刚刚被添加到项目当中并且尚未提交的文件，或者是编译了的二进制文件，比如：.pyc, .obj, .exe等等。因此这是绝对有意义的事情：前者从`git status`的状态输出信息中可以看出来；后者则很难看出你的仓库中实际状况。

处于这个原因，Git允许你完全忽略这些文件，通过在`.gitignore`文件中所要忽略的文件规则。任何你想要忽略的文件被包含在单独的一行，而`*`符号可以用作通配符。例如：添加如下内容到你项目根目录中的`.gitignore`文件里，将会防止已经编译的Python模块文件出现在`git status`命令显示的信息中。

	*.pyc

####例子
在提交项目变化之前，检查你仓库中的状态是一个很好的实践，这使的你不会意外的提交了不想提交的文件。这个例子展示了暂存和提交一个快照之前和之后的仓库状态：

	# Edit hello.py
	git status
	# hello.py is listed under "Changes not staged for commit"
	git add hello.py
	git status
	# hello.py is listed under "Changes to be committed"
	git commit
	git status
	# nothing to commit (working directory clean)

第一个输出的状态展示了未暂存的文件。`git add` 操作将会被响应在第二个`git status`中，然后最后的状态输出将会告诉你已经没有需要提交的文件了——工作目录匹配大多数最近的提交。一些Git命令（例如：git merge）要求工作目录是干净的，因为这样你不会意外的重写变化的文件。

###git log
`git log`命令展示已经提交的快照信息。它让你列出项目的历史信息，过滤它，而且查找指定的改变版本。而`git status` 能够让你检查工作目录和暂存区，`git log`只是操作提交的历史。

![git status & git log](/assets/img/git-inspecting-2.png)

能够用几种方式自定义日志的输出，从简单的过滤提交到以用户定义的格式完整的展示日志。一些常用的`git log`命令的配置接下来会介绍。

####使用方法

	git log

以默认的格式来显示完整的提交历史信息。如果输出的信息不止一屏，你可以使用`Space`键来滚动查看，使用`q`退出。

	git log -n <limit>

通过&lt;limit&gt;来限制展示的提交的个数。例如：` git log -n 3` 将会显示3个提交的信息。

	git log --oneline

浓缩每一个提交信息到一行。这将会对得到一个项目历史信息的高级别的概览分非常有用。

	git log --stat

会展示原始`git log`命令的信息，包括哪些文件已经更改了和每一个文件添加或者删除的相对行数。

	git log -p

展示代表每一个提交的补丁。这会显示每一个提交完整的差异（diff），即更加详细的查看你的项目的历史信息。

	git log --author="<pattern>"

查找一个特殊作者的提交信息。&lt;pattern&gt;参数可以是字符串或者一个正则表达式。

	git log --grep="<pattern>"

查找匹配&lt;pattern&gt;信息的提交信息。&lt;pattern&gt;可以是字符串或者一个正则表达式。

	git log <since>..<until>

只显示发生在&lt;since&gt;和&lt;until&gt;之间的提交信息。这两个参数可以是一个提交ID，一个分支名，HEAD，或者任何“版本引用（revision reference）”的种类。

	git log <file>

只展示包括特殊文件的提交信息。这是一个简单的方式，用于查看一个特殊文件的历史。

	git log --graph --decorate --oneline

一些需要考虑的有用选项。`--graph`标志会在提交信息的左边画一个基于文本的提交图。`--decorate`添加一个提交信息的分支或者标签的名称用于显示。`--oneline`用一行来显示提交信息，使其更容易的浏览提交信息。

####讨论
`git log` 命令是Git的基础工具，用于暴露出一个仓库的历史信息。当你需要查找一个项目的一个特殊版本或者弄清楚哪些改变将会在一个特征分支通过合并引入。

	commit 3157ee3718e180a9476bf2e5cab8e3f1e78a73b7
	Author: John Smith

其中大多数是非常直接的；然而，第一行需要一些解释。在`commit`之后的40字符的字符串是一个提交内容的SHA-1校验。这是服务于两个目的的。第一，它确保提交的完整性——如果它从没损坏，这个提交会生成一个不同的校验。第二，作为一个提交的特别ID。

这个ID能够被用来在`git log <since>..<until>`命令中，指向一个指定的提交。例如， `git log 3157e..5ab91`将会展示ID为3157e和5ab91之间的任何信息。除了校验之外，分支名称（在[分支模块](https://www.atlassian.com/git/tutorials/using-branches)讨论）和HEAD关键字是用于指向个别提交的引用其它的方法。HEAD总是指向当前提交，无论是一个分支或者一个特殊的提交。

`~` 字符是很有用的，用于指向一个提交的父级的相对引用。例如：`3157e~1`指向`3157e`提交的前面，而`HEAD~3`是当前提交的祖祖父级。

提到的所有这些定义的方法的思想是让你基于一个特殊的提交执行一个操作。`git log`命令对于这些交互是一个典型的开始点，因为它让你找到你想要操作的提交。

####例子
在使用方法的部分是提交`git log`的例子，但是，请记住那些选项是可以结合到一个单个的命令中的：

	git log --author="John Smith" -p hello.py

这将会展示John Smith作者已经对hello.py文件操作过的所有改变的差异信息。

``..``语法是一个非常有用的工具用于比较分支。接下来的例子展示`some-feature`分支而不是`master`分支中的所有提交的简要概览。

	git log --oneline master..some-feature


####原文地址：
[Inspecting a repository](https://www.atlassian.com/git/tutorials/inspecting-a-repository)
