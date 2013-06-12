# Arrays.js

Arrays.js is a JavaScript library providing a small collection of functions for the purpose of creating, transforming, and processing regular JavaScript arrays.

This library explicitly depends on [Kurry.js](https://github.com/LiamGoodacre/Kurry).

All functions are wrapped with `Kurry.autopoly`.


# Documentation (unfinished)

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
Arrays.concat([[1, 2], [3, 4], [[5], [6, 7]]]);
//= [1, 2, 3, 4, [5], [6, 7]]
```


### Arrays.drop : Num &rarr; [a] &rarr; [a]

Returns an array that is the array passed in with a number of elements removed from the beginning.

```js
Arrays.drop(2, [1, 2, 3, 4])
//= [3, 4]
```


### Arrays.foldl


### Arrays.foldl1


### Arrays.foldlBind


### Arrays.foldr


### Arrays.foldr1


### Arrays.foldrBind


### Arrays.lift


### Arrays.mapIndexed


### Arrays.range


### Arrays.slice


### Arrays.stepRange


### Arrays.tail


### Arrays.take


### Arrays.unit



