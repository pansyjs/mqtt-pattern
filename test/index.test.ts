import { matches, extract, exec, fill, clean } from '../src';

describe('matches', () => {
  it(`supports patterns with no wildcards`, () => {
    expect(matches('foo/bar/baz', 'foo/bar/baz')).toBe(true);
  });

  it(`doesn't match different topics`, () => {
    expect(matches('foo/bar/baz', 'baz/bar/foo')).toBe(false);
  });

  it(`supports patterns with # at the beginning`, () => {
    expect(matches('#', 'foo/bar/baz')).toBe(true);
  });

  it(`supports patterns with # at the end`, () => {
    expect(matches('foo/#', 'foo/bar/baz')).toBe(true);
  });

  it(`supports patterns with # at the end and topic has no children`, () => {
    expect(matches('foo/bar/#', 'foo/bar')).toBe(true);
  });

  it(`doesn't support # wildcards with more after them`, () => {
    expect(matches('#/bar/baz', 'foo/bar/baz')).toBe(false);
  });

  it(`supports patterns with + at the beginning`, () => {
    expect(matches('+/bar/baz', 'foo/bar/baz')).toBe(true);
  });

  it(`supports patterns with + in the middle`, () => {
    expect(matches('foo/+/baz', 'foo/bar/baz')).toBe(true);
  });

  it(`supports patterns multiple wildcards`, () => {
    expect(matches('foo/+/#', 'foo/bar/baz')).toBe(true);
  });

  it(`supports leading slashes`, () => {
    expect(matches('/foo/bar', '/foo/bar')).toBe(true);
    expect(matches('/foo/bar', '/bar/foo')).toBe(false);
  });
})

describe('extract', () => {
  it(`supports patterns with no wildcards`, () => {
    expect(extract('foo/bar/baz', 'foo/bar/baz')).toEqual({});
  });

  it(`returns empty object if wildcards don't have label`, () => {
    expect(extract('foo/+/#', 'foo/bar/baz')).toEqual({});
  });

  it(`returns object with an array for # wildcard`, () => {
    expect(extract('foo/#something', 'foo/bar/baz')).toEqual({
      something: ['bar', 'baz']
    });
  });

  it(`returns object with a string for + wildcard`, () => {
    expect(extract('foo/+hello/+world', 'foo/bar/baz')).toEqual({
      hello: 'bar',
      world: 'baz',
    });
  });

  it(`parses params from all wildcards`, () => {
    expect(extract('+hello/+world/#wow', 'foo/bar/baz/fizz')).toEqual({
      hello: 'foo',
      world: 'bar',
      wow: ['baz', 'fizz'],
    });
  });
})

describe('exec', () => {
  it(`returns null if it doesn't match`, () => {
    expect(exec('hello/world', 'foo/bar/baz')).toEqual(null);
  });

  it(`returns params if they can be parsed`, () => {
    expect(exec('foo/+hello/#world', 'foo/bar/baz')).toEqual({
      hello: 'bar',
      world: ['baz']
    });
  });
})

describe('fill', () => {
  it(`fills in pattern with both types of wildcards`, () => {
    const params = {
      hello: 'Hello',
      world: ['the', 'world', 'wow'],
    }
    expect(fill('foo/+hello/#world', params)).toEqual('foo/Hello/the/world/wow');
  });

  it(`fills missing + params with undefined`, () => {
    expect(fill('foo/+hello', {})).toEqual('foo/undefined');
  });

  it(`ignores empty # params`, () => {
    expect(fill('foo/#hello', {})).toEqual('foo');
  });

  it(`ignores non-named # params`, () => {
    expect(fill('foo/#', {})).toEqual('foo');
  });
})

describe('clean', () => {
  it(`removes parameter names`, () => {
    expect(clean('hello/+param1/world/#param2')).toEqual('hello/+/world/#');
  });

  it(`works when there aren't any parameter names`, () => {
    expect(clean('hello/+/world/#')).toEqual('hello/+/world/#');
  });
})
