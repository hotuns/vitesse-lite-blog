---
title: 基础 typescript
date: 2021-11-26T16:00:00Z
lang: zh
duration: 10min
description: 基础typescript
---

## 前言

不同于JavaScript弱类型、无约束的语言风格，TypeScript需要对数据进行类型注解，更加严谨和规范，ts中有以下几种基本数据类型可供选择：

* 布尔值（Boolean）
* 数值（Number）
* 字符串（String）
* 数组（Array）
* 元组（Tuple）
* 枚举（menu）
* 任意值（Any）
* 空值（Void）
* Null 和 Undefined
* Never
* 接口（Interfaces）

## 布尔值（Boolean）

在 TypeScript 中，使用 **boolean** 定义布尔值类型：

``` ts
let flag: boolean = true;
```

## 数值（Number）

使用 **number** 定义数值类型

```ts
let num: number = 12;
// ES6中的二进制表示法
let binaryNum: number = 0b1100;
// ES6中的八进制表示法
let octalNum: number = 130;
// 16进制字面量表示法
let hexNum: number = 0x12d;
// 定义NaN
let nonNum: number = NaN;
```

## 字符串（String）

使用 **string** 定义字符串类型：

```ts
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

## 数组（Array）

数组有两种声明类型的方式，第一种是在类型后面加上方括号 **[]**，表示该数组由此种类型的元素构成。

```ts
let dataArr: number[] = [12, 67, 3, 7, 199];
```

第二种是使用数组泛型 **Array<元素类型>** 来声明数组的类型。

```ts
let dataArr: Array<number> = [99, 65, 2, 8, 11];
```

## 元组（Tuple）

元组是数组的一种，能够存储不同类型的元素。

```ts
let tupleArr: [number, string] = [22, 'tree'];
```

需要注意的是，元组中元素的类型、位置及个数应当与声明的类型、位置及个数保持一致。

## 枚举（menu）

枚举可用于表示某些特定场景下数据的取值类型，例如颜色包括"红橙黄绿青蓝紫"等，五行包括"金木水火土"五种物质。 枚举类型的定义方式如下：

```ts
enum 枚举名 { 
    标识符[=整型常数], 
    标识符[=整型常数], 
    ... 
    标识符[=整型常数]
};
```

用"五行"举例：

```ts
enum TheFiveElements { metal, wood, water, fire, earth }
let f: TheFiveElements = TheFiveElements.wood;
console.log(f) // 输出为1，如果标识符未赋值，则默认是从零开始的下标号
```

```ts
enum TheFiveElements { metal, wood = 2, water, fire, earth }
let f1: TheFiveElements = TheFiveElements.wood;
console.log(f1) // 输出为2，如果标识符已赋值，则为指定的值
let f2: TheFiveElements = TheFiveElements.water;
console.log(f2) // 输出为3，未赋值，则从已赋值的标号处递增
```

## 任意值（Any）

在开发过程中，有时候会碰到类型并不清楚的变量，此时可以将变量设置为any类型，any类型能够直接通过类型检查器的检查。any类型可用于声明DOM节点。

```ts
let value: any = 'Tom';
value = 99;
let container:any = document.getElementById('container');
```

## 空值（Void）

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 **void** 表示没有任何返回值的函数：

```ts
function alertName(): void {
    alert('My name is Tom');
}
```

## Null 和 Undefined

在 TypeScript 中，可以使用 **null** 和 **undefined** 来定义这两个原始数据类型：

```ts
let u: undefined = undefined;
let n: null = null;
```

## Never

**never**类型是任何类型的子类型，能够赋值给任何类型，而**never**类型没有子类型，因此声明为 **never**的变量只能被 **never** 类型所赋值。**never**类型可用于声明总会抛出异常或永远没有返回值的函数表达式以及箭头函数表达式的返回值类型。

```ts
let error: never;
error = (() => {
  throw new Error('ERROR');
})()
```

## 对象（Object）

Object类型表示除**number**，**string**，**boolean**，**symbol**，**null**或**undefined**之外的类型。

```ts
let person: object = {
    name: 'Lily',
    age: 16
}
```

## 接口（Interfaces）

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

下面的例子中，我们定义了一个接口 **Person**，接着定义了一个变量 **tom**，它的类型是 **Person**。这样，我们就约束了 **tom** 的形状必须和接口 **Person** 一致。有时我们希望不要完全匹配一个形状，那么可以使用 **?** 可选属性。有时候我们希望一个接口允许有任意的属性，可以使用 **[propName: string]** 定义了任意属性取 **string** 类型的值。有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 **readonly** 定义只读属性：

```ts
interface Person {
    readonly id: number; // 只读属性
    name: string;
    age?: number; // 可选属性
    [propName: string]: any; // 任意属性
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

需要注意的是，接口一般首字母大写。一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

## 类型断言（as）

我们需要在还不确定类型的时候就访问其中一个类型特有的属性或方法可以使用 **as**，比如：

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误。

当类之间有继承关系时，类型断言也是很常见的：

```ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

## 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。

ECMAScript 的内置对象
**Boolean**、**Error**、**Date**、**RegExp** 等。

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

DOM 和 BOM 的内置对象  
**Document**、**HTMLElement**、**Event**、**NodeList** 等。

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```
