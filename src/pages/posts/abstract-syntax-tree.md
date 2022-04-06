---
title: AST 抽象语法树
date: 2021-11-30T16:00:00Z
lang: zh
duration: 10min
description: AST 抽象语法树
---

## 前言

作为一个前端同学，不管你是否知道AST是个什么东西，但一点也不影响你在工作中使用它。我们平时项目中用到的less、babel、eslint、代码压缩以及JavaScript代码能够运行在浏览器中等，都是建立在AST的基础上。在了解了AST相关知识后，你也可以自己折腾点东西出来，给单调无聊的工作找点乐趣。

## 什么叫AST抽象语法树？

AST（Abstract Syntax Tree），中文叫做抽象语法树，是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。但这个时候有人肯定会问了，什么叫抽象语法树？ 它为什么抽象了？

回答之前，我们先看一下代码组织结构。

```js
const a = 'hello world';
```

如上图，正是我们常写的JavaScript代码。细心的人可以观察到代码中是由符号 **=** 连接组成的。

在看一下转换后的AST抽象语法树代码

```json
{
  "type": "Program",
  "start": 0,
  "end": 23,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 23,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 23,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 7,
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "start": 10,
            "end": 23,
            "value": "hello world",
            "raw": "'hello world'"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}

```

对比转换前后的差别，就可以看出为什么抽象了。

简单理解就是原来我们写的代码有各种分隔符号组合而成，而转换后的代码没有了各种分隔符组织关联，使用的是JSON描述的。所以是抽象语法树，没有分隔符了那真是太抽象了...

什么叫AST抽象语法树简单的理解就是将字符串解析成JSON，整理成的JSON（清爽）比直接解析字符串简单的多[测试网站](https://astexplorer.net/)。

## JavaScript转换AST工具

对于`JavaScript`而言，可以通过`JS Parser`将`JS`代码转换成`AST`。目前比较常见的`JS Parser`如下：

* [esprima](https://link.juejin.cn/?target=https://github.com/jquery/esprima)（流行库）
* [Babylon](https://link.juejin.cn/?target=https://github.com/babel/babel/tree/master/packages/babel-parser)（babel中使用）
* [acorn](https://link.juejin.cn/?target=https://github.com/acornjs/acorn)（webpack中使用）
* [espree](https://link.juejin.cn/?target=https://github.com/eslint/espree)（在acorn基础上衍生而来，eslint中使用）
* [astexplorer](https://link.juejin.cn/?target=https://astexplorer.net/)（在线生成工具，可选不同的JS Parser实时查看）

本文中的例子均是使用`esprima`来实现。

## 如何将代码转换成AST

在将代码转换成`AST`的过程中，有两个重要的阶段：`词法分析（Lexical Analysis）`和`语法分析（Syntax Analysis）`。

#### 词法分析

也称为分词，是将字符串形式的代码转换为标记（token）序列的过程。这里的 **token** 是一个字符串，是构成源代码的最小单位，类似于英语中单词。词法分析也可以理解成将英文字母组合成单词的过程。词法分析过程中不会关心单词之间的关系。比如：词法分析过程中能够将括号标记成token，但并不会校验括号是否匹配。

`JavaScript`中的`token`主要包含以下几种：
    - 关键字：var、let、const等
    - 标识符：没有被引号括起来的连续字符，可能是一个变量，也可能是 if、else 这些关键字，又或者是 true、false 这些内置常量
    - 运算符： +、-、 *、/ 等
    - 数字：像十六进制，十进制，八进制以及科学表达式等
    - 字符串：变量的值等
    - 空格：连续的空格，换行，缩进等
    - 注释：行注释或块注释都是一个不可拆分的最小语法单元
    - 标点：大括号、小括号、分号、冒号等

上述`const a = 'hello world'`经过语法分析后生成的`AST`如下：

```json
[
    {
        "type": "Keyword",
        "value": "const"
    },
    {
        "type": "Identifier",
        "value": "a"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "String",
        "value": "'hello world'"
    }
]

```

#### 语法分析

也称为解析器，是将词法分析产生的`token`按照某种给定的形式文法转换成`AST`的过程。也就是把单词组合成句子的过程。在转换过程中会验证语法，语法如果有错的话，会抛出语法错误。

上述`const a = 'hello world'`经过语法分析后生成的`AST`如下：

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": "hello world",
            "raw": "'hello world'"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}

```

在拿到了`AST`后，我们就可以分析`AST`，在此基础上做一些自己的事情。比如最简单的将代码中的某一变量都替换成另一个名字。

## 实践

下面我们来实现将上述代码中定义的变量`a`替换成变量`b`。要实现这个需求，我们需要将源代码转换成`AST`，然后在此基础上进行一些操作，更改树的内容，之后再把`AST`转换成目标代码。也就是要经历`解析 -> 转换 -> 生成`的过程。

首先我们需要分析源代码生成的`AST`和目标代码生成的`AST`具体有何不同。 以下是`const b = 'hello world'`生成的AST：

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "b" // 这里不同
          },
          "init": {
            "type": "Literal",
            "value": "hello world",
            "raw": "'hello world'"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}

```

通过对比分析，发现唯一的不同就是`type`为`Identifier`的`id`的`name`属性值不一样。接下来就可以通过修改`AST`来实现我们的需求了。

我们需要安装[estraverse](https://link.juejin.cn/?target=https://github.com/estools/estraverse)（遍历AST）和[escodegen](https://link.juejin.cn/?target=https://github.com/estools/escodegen)（根据AST生成JS）这两个包。

```js
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

const program = "const a = 'hello world'";
const ASTree = esprima.parseScript(program);

function changeAToB(node) {
    if (node.type === 'Identifier') {
        node.name = 'b';
    }
}

estraverse.traverse(ASTree, {
    enter(node) {
        changeAToB(node);
    }
});

const ASTreeAfterChange = escodegen.generate(ASTree);
console.log(ASTreeAfterChange); // const b = 'hello world'

```

看，是不是很容易就可以实现。掌握了`AST`的知识后，我们能做很多事情，各种`babel`的插件也是这么产生的，只不过用的库不一样。

如何实现一个`babel`插件可以参考官方[Babel 插件手册](https://link.juejin.cn/?target=https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
