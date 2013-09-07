# Kurry-Arrays

Kurry-Arrays is a JavaScript library providing a small collection of functions
for the purpose of creating, transforming, and processing regular JavaScript arrays.


# Documentation (work in progress)

This library explicitly depends on [Kurry.js](https://github.com/LiamGoodacre/Kurry).

All functions are wrapped with `Kurry.autopoly`.
The following is an example of what this means:

```js
var _f = function (a, b, c) { return a+b+c }
var f = Kurry.autopoly(_f)

_f(2, 3, 4) //= 9
f(2, 3, 4) //= 9
f(2, 3)(4) //= 9
f(2)(3)(4) //= 9
f(2)(3, 4) //= 9

_f(2, 3)(4) //# Error, number is not a function
```


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

Arrays.bindOn(sqrt, [1, 4, 9, 0, -42])
//= [1, -1, 2, -2, 3, -3, 0]
```


### Arrays.concat : [[a]] &rarr; [a]

Appends an array of arrays together:

```js
Arrays.concat([[1, 2], [3, 4], [[5], [6, 7]]])
//= [1, 2, 3, 4, [5], [6, 7]]
```


### Arrays.drop : Num &rarr; [a] &rarr; [a]

Returns an array that is the array passed in with a number of elements
removed from the beginning.

```js
Arrays.drop(2, [1, 2, 3, 4])
//= [3, 4]
```


### Arrays.foldl : (b &rarr; a &rarr; b) &rarr; b &rarr; [a] &rarr; b

Given a binary function `bin : b -> a -> b` and an initial accumulator
value `acc : b`, from the left of the array fold together each element
with the current accumulator, the result is the new accumulator.

```js
var add = function (a, b) { return a + b }
var sum = Arrays.foldl(add, 0)
sum([1, 2, 3, 4, 5])
//= foldl(+, 0, [1,2,3,4,5])
//= foldl(+, (0+1), [2,3,4,5])
//= foldl(+, (0+1+2), [3,4,5])
//= foldl(+, (0+1+2+3), [4,5])
//= foldl(+, (0+1+2+3+4), [5])
//= foldl(+, (0+1+2+3+4+5), [])
//= (0+1+2+3+4+5)
//= 15
```


### Arrays.foldl1 : (a &rarr; a &rarr; a) &rarr; [a] &rarr; a

Same as foldl, except the first value of the array is taken to be the
initial accumulator value.

```js
var multiply = function (a, b) { return a * b }
var product = Arrays.foldl1(multiply)

product([5, 4, 3])
//=foldl1(*, [5, 4, 3])
//=foldl(*, 5, [4, 3])
//=foldl(*, (5*4), [3])
//=foldl(*, (5*4*3), [])
//=(5*4*3)
//=60

product([])
//=foldl1(*, [])
//=foldl(*, undefined, [])
//=undefined
```


### Arrays.foldlBind : [? &rarr; [?]] &rarr; [?] &rarr; [?]

Folded monadic bind, for sequencing binds.

```js
var f = function (x) { return [x * 10, x * x] }
var g = function (x) { return [-x, x] }
Arrays.foldlBind([f, g], [1, 2])
//= foldlBind([g], [10, 1, 20, 4])
//= foldlBind([], [-10, 10, -1, 1, -20, 20, -4, 4])
//= [-10, 10, -1, 1, -20, 20, -4, 4]
```


### Arrays.foldr : (b &rarr; a &rarr; b) &rarr; b &rarr; [a] &rarr; b

Same as foldl except folds from the right instead of the left.

Given a binary function `bin : b -> a -> b` and an initial accumulator
value `acc : b`, from the right of the array fold together each element
with the current accumulator, the result is the new accumulator.

```js
var add = function (a, b) { return a + b }
var sum = Arrays.foldr(add, 0)
sum([1, 2, 3, 4, 5])
//= foldr(+, 0, [1,2,3,4,5])
//= foldr(+, (5+0), [1,2,3,4])
//= foldr(+, (4+5+0), [1,2,3])
//= foldr(+, (3+4+5+0), [1,2])
//= foldr(+, (2+3+4+5+0), [1])
//= foldr(+, (1+2+3+4+5+0), [])
//= (1+2+3+4+5+0)
//= 15
```


### Arrays.foldr1 : (a &rarr; a &rarr; a) &rarr; [a] &rarr; a

Same as foldr, except the last value of the array is taken to be the
initial accumulator value.

```js
var multiply = function (a, b) { return a * b }
var product = Arrays.foldr1(multiply)

product([5, 4, 3])
//=foldr1(*, [5, 4, 3])
//=foldr(*, 3, [5, 4])
//=foldr(*, (4*3), [5])
//=foldr(*, (5*4*3), [])
//=(5*4*3)
//=60

product([])
//=foldr1(*, [])
//=foldr(*, undefined, [])
//=undefined
```


### Arrays.foldrBind : [? &rarr; [?]] &rarr; [?] &rarr; [?]

Same as foldlBind, except folds from the right instead of the left.

Folded monadic bind, for sequencing binds.

```js
var f = function (x) { return [x * 10, x * x] }
var g = function (x) { return [-x, x] }
Arrays.foldrBind([f, g], [1, 2])
//= foldrBind([f], [-1, 1, -2, 2])
//= foldrBind([], [-10, 1, 10, 1, -20, 4, 20, 4])
//= [-10, 1, 10, 1, -20, 4, 20, 4]
```


### Arrays.lift : (a &rarr; b) &rarr; [a] &rarr; [b]

Apply a function to every element in the array.  The result is an array of the output of each call:

```js
Arrays.lift(function (v) { return v * 10 }, [0, 1, 2, 3, 4])
//= [0, 10, 20, 30, 40]
```


### Arrays.mapIndexed : ((a, Num) &rarr; b) &rarr; [a] &rarr; [b]

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
Arrays.some(function (v) { return v > 4; }, [5, 7, 9])
Arrays.some(function (v) { return v > 4; }, [6, 1, 5])
//= true

Arrays.some(function (v) { return v > 4; }, [])
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
