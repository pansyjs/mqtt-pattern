<h1 align="center">
  @pansy/mqtt-pattern
</h1>

<div align="center">
  Fast library for matching MQTT patterns with named wildcards。
</div>

<br />

<div align="center">

[![npm version][npm-v-image]][npm-url] 
[![npm download][download-image]][download-url] 
[![stars-image][stars-image]][stars-url] 
[![forks-image][forks-image]][forks-url] 
  
</div> 

**约定：**

- `+` 约定单个变量使用
- `#` 约定多个变量使用

例如

```ts
const pattern = `/foo/+id/world/#paths`;

const topic = `/foo/1519699178931773441/world/test/channel`;

{
  id: '1519699178931773441',
  paths: ['test', 'channel'],
}
```

## 🏗 安装

```
// npm
npm install @pansy/mqtt-pattern --save

// yarn
yarn add @pansy/mqtt-pattern

// pnpm 
pnpm i @pansy/mqtt-pattern
```

## API

### fill

回填 `pattern` 中的指定变量，获取通道。

```ts
function fill(pattern: string, params: Record<string, string | string[]>): string;
```

例如：

```ts
fill('foo/+hello/#world', {
  hello: 'Hello',
  world: ['the', 'world', 'wow'],
});

// 'foo/Hello/the/world/wow'
```

### exec

验证并解析通道

```ts
function exec(pattern: string, topic: string): Record<string, string | string[]> | null;
```

例如：

```ts
exec('foo/+hello/#world', 'foo/Hello/the/world/wow');

// {
//   hello: 'Hello',
//   world: ['the', 'world', 'wow'],
// }
```

### matches

验证通道

```ts
function matches(pattern: string, topic: string): boolean;
```


```ts
matches('foo/+hello/#world', 'foo/Hello/the/world/wow');

// true
```

### extract

解析通道

```ts
function extract(pattern: string, topic: string): Record<string, string | string[]>;
```

例如：

```ts
extract('foo/+hello/#world', 'foo/Hello/the/world/wow');

// {
//   hello: 'Hello',
//   world: ['the', 'world', 'wow'],
// }
```

### clean

清除变量中的名称

```ts
function clean(pattern: string): string;
```

例如：

```ts
exec('foo/+hello/#world');

// 'foo/+/#'
```

[npm-v-image]: https://img.shields.io/npm/v/@pansy/mqtt-pattern.svg
[npm-url]: http://npmjs.org/package/@pansy/mqtt-pattern
[forks-image]: https://img.shields.io/github/forks/pansyjs/mqtt-pattern.svg
[forks-url]: https://github.com/pansyjs/mqtt-pattern/network/members
[stars-image]: https://img.shields.io/github/stars/pansyjs/mqtt-pattern.svg
[stars-url]: https://github.com/pansyjs/mqtt-pattern/stargazers
[download-image]: https://img.shields.io/npm/dm/@pansy/mqtt-pattern
[download-url]: https://npmjs.org/package/@pansy/mqtt-pattern
