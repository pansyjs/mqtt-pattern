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

```ts
function fill(pattern: string, params: Record<string, string | string[]>): string;
```

### exec

```ts
function exec(pattern: string, topic: string): Record<string, string | string[]> | null;
```

### matches

```ts
function matches(pattern: string, topic: string): boolean;
```

### extract

```ts
function extract(pattern: string, topic: string): Record<string, string | string[]>;
```

### clean

```ts
function clean(pattern: string): string;
```

[npm-v-image]: https://img.shields.io/npm/v/@pansy/mqtt-pattern.svg
[npm-url]: http://npmjs.org/package/@pansy/mqtt-pattern
[forks-image]: https://img.shields.io/github/forks/pansyjs/mqtt-pattern.svg
[forks-url]: https://github.com/pansyjs/mqtt-pattern/network/members
[stars-image]: https://img.shields.io/github/stars/pansyjs/mqtt-pattern.svg
[stars-url]: https://github.com/pansyjs/mqtt-pattern/stargazers
[download-image]: https://img.shields.io/npm/dm/@pansy/mqtt-pattern
[download-url]: https://npmjs.org/package/@pansy/mqtt-pattern
