---
title: 常用的Typescript 内置类型与自定义类型
description: 常用的Typescript 内置类型与自定义类型
date: 2022-04-24T08:26:01.420Z
---
## 背景

大家用过 `Typescript` 都清楚，很多时候我们需要提前声明一个类型，再将类型赋予变量。

例如在业务中，我们需要渲染一个表格，往往需要定义：

```typescript
interface Row {
  user: string
  email: string
  id: number
  vip: boolean
  // ...
}

const tableDatas: Row[] = []
// ...
```

有时候我们也需要表格对应的搜索表单，需要其中一两个搜索项，如果刚接触 typescript 的同学可能会立刻这样写：

```typescript
interface SearchModel {
  user?: string
  id?: number 
}  
const model: SearchModel = {
  user: '',
  id: undefined 
}
```

这样写会出现一个问题，如果后面id 类型要改成 `string`，我们需要改 2 处地方，不小心的话可能就会忘了改另外一处。所以，有些人会这样写：

```typescript
interface SearchModel {
  user?: Row['user']
  id?: Row['id']
} 
```

这固然是一个解决方法，但事实上，我们前面已经定义了 `Row` 类型，这其实是可以更优雅地复用的:

```typescript
const model: Partial<Row> = {
  user: '',
  id: undefined 
}
// 或者需要明确指定 key 的，可以
const model2: Partial<Pick<Row, 'user'|'id'>>
```

这样一来，很多情况下，我们可以尽量少地写重复的类型，复用已有类型，让代码更加优雅容易维护。

上面使用到的 `Partial` 和 `Pick` 都是 typescript 内置的类型别名。下面给大家介绍一下 typescript 常用的内置类型，以及自行拓展的类型。

## typescript 内置类型

### `Partial<T>`

将类型 T 的所有属性标记为可选属性

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

使用场景：

```typescript
// 账号属性
interface AccountInfo {
    name: string 
    email: string 
    age: number 
    vip: 0|1 // 1 是vip ，0 是非vip
}

// 当我们需要渲染一个账号表格时，我们需要定义
const accountList: AccountInfo[] = []

// 但当我们需要查询过滤账号信息，需要通过表单，
// 但明显我们可能并不一定需要用到所有属性进行搜索，此时可以定义
const model: Partial<AccountInfo> = {
  name: '',
  vip: undefind
}
```


## 总结

事实上，基于已有的类型别名，还有新推出的 `infer` 待推断类型，可以探索出各种各样的复杂组合玩法，这里不再多说，大家可以慢慢探索。