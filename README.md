# Arrays.js

Arrays.js is a JavaScript library providing a small collection of functions for the purpose of creating, transforming, and processing regular JavaScript arrays.

This library explicitly depends on [Kurry.js](https://github.com/LiamGoodacre/Kurry).

All functions are wrapped with `Kurry.autopoly`.


# Documentation (unfinished)

### Arrays.all : (a &rarr; Bool) &rarr; [a] &rarr; Bool

Returns truthy if all elements in an array satisfy some predicate.
Falsy otherwise.

```js
Arrays.all(function (v) { return v > 4; }, [])
Arrays.all(function (v) { return v > 4; }, [5, 7, 9])
//= true

Arrays.all(function (v) { return v > 4; }, [6, 1, 5])
//= false
```


### Arrays.append : [a] &rarr; [a] &rarr; [a]

Appends two arrays together:

```js
Arrays.append([1, 2, 3], [4, 5, 6])
//= [1, 2, 3, 4, 5, 6]

Arrays.append([1, 2])([3])
//= [1, 2, 3]
```


### Arrays.bind : [a] &rarr; (a &rarr; [b]) &rarr; [b]

Monadic bind:

```js
var sqrt = function (v) {
    var x = Math.abs(v);
    var r = Math.sqrt(x);
    return (
        ( v === 0 ? [0]
        : v > 0 ? [r, -r]
        : [] )
    );
};

Arrays.bind([1, 4, 9, 0, -42], sqrt)
//= [1, -1, 2, -2, 3, -3, 0]
```


### Arrays.bindOn : (a &rarr; [b]) &rarr; [a] &rarr; [b]

Flipped version of `Array.bind`:

```js
var sqrt = function (v) {
    var x = Math.abs(v);
    var r = Math.sqrt(x);
    return (
        ( v === 0 ? [0]
        : v > 0 ? [r, -r]
        : [] )
    );
};

Arrays.bind(sqrt, [1, 4, 9, 0, -42])
//= [1, -1, 2, -2, 3, -3, 0]
```


### Arrays.concat : [[a]] &rarr; [a]

Appends an array of arrays together:

```js
Arrays.concat([[1, 2], [3, 4], [[5], [6, 7]]])
//= [1, 2, 3, 4, [5], [6, 7]]
```


### Arrays.drop : Num &rarr; [a] &rarr; [a]

Returns an array that is the array passed in with a number of elements removed from the beginning.

```js
Arrays.drop(2, [1, 2, 3, 4])
//= [3, 4]
```


### Arrays.foldl : (b &rarr; a &rarr; b) &rarr; b &rarr; [a] &rarr; b


### Arrays.foldl1


### Arrays.foldlBind


### Arrays.foldr : (b &rarr; a &rarr; b) &rarr; b &rarr; [a] &rarr; b



### Arrays.foldr1


### Arrays.foldrBind


### Arrays.lift : (a &rarr; b) &rarr; [a] &rarr; [b]

Apply a function to every element in the array.  The result is an array of the output of each call:

```js
Arrays.lift(function (v) { return v * 10 }, [0, 1, 2, 3, 4])
//= [0, 10, 20, 30, 40]
```


### Arrays.mapIndexed : (a &rarr; Num &rarr; b) &rarr; [a] &rarr; [b]

Apply a function to every element + index pair in the array.  The result is an array of the output of each call:

```js
Arrays.mapIndexed(function (v, i) { return v * i }, [0, 1, 2, 3, 4])
//= [0, 1, 4, 9, 16]
```


### Arrays.range : Num &rarr; Num &rarr; [Num]

Computes a range given a `start` and an `end`:

```js
Arrays.range(3, 8)
//= [3, 4, 5, 6, 7]

Arrays.range(10, 1)
Arrays.range(0, Infinity)
Arrays.range(-Infinity, 0)
//= []
```


### Arrays.slice : Num &rarr; Num &rarr; [a] &rarr; [a]

Given a starting index `s`, an ending index `e`, and an array `a`, drop `s` and take `e - s`:

```js
Arrays.slice(2, 5, [1, 2, 3, 4, 5, 6, 7])
//= [3, 4, 5]
```


### Arrays.some : (a &rarr; Bool) &rarr; [a] &rarr; Bool

Returns truthy if at least one element in an array satisfies some predicate.
Falsy otherwise.

```js
Arrays.some(function (v) { return v > 4; }, [])
Arrays.some(function (v) { return v > 4; }, [5, 7, 9])
Arrays.some(function (v) { return v > 4; }, [6, 1, 5])
//= true

Arrays.some(function (v) { return v > 4; }, [2, 1, 3])
//= false
```


### Arrays.stepRange : Num &rarr; Num &rarr; Num &rarr; [Num]

Computes a range given an `interval step`, a `start` and an `end`:

```js
Arrays.stepRange(0.5, 3, 8)
//= [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]

Arrays.stepRange(0, 1, 10)
Arrays.stepRange(2, 10, 5)
Arrays.stepRange(1, 0, Infinity)
Arrays.stepRange(0, -Infinity, 0)
Arrays.stepRange(-1, 0, 5)
//= []
```


### Arrays.tail : [a] &rarr; [a]

Given an array, drop the head:

```js
Arrays.tail([5, 4, 3, 2, 1])
//= [4, 3, 2, 1]

Arrays.tail(Arrays.tail([3, 2, 1]))
//= [1]
```


### Arrays.take : Num &rarr; [a] &rarr; [a]

Given a number `n` and an array `xs`, returns a new array that is the first `n` elements in `xs`:

```js
Arrays.take(3, [5, 4, 3, 2, 1])
//= [5, 4, 3]
```


### Arrays.unit : a &rarr; [a]

Monadic unit (return):

```js
Arrays.unit(5)
//= [5]
```


