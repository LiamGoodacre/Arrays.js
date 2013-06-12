# Arrays.js

Arrays.js is a JavaScript library providing a small collection of functions for the purpose of creating, transforming, and processing regular JavaScript arrays.

This library explicitly depends on [Kurry.js](https://github.com/LiamGoodacre/Kurry).

All functions are wrapped with `Kurry.autopoly`.


# Documentation (unfinished)

```js
//+ [a] -> [a] -> [a]
Arrays.append

//+ (b -> a -> b) -> b -> [a] -> b
Arrays.foldl

//+ (a -> b -> b) -> b -> [a] -> b
Arrays.foldr

Arrays.slice

Arrays.drop

Arrays.take

Arrays.tail

Arrays.foldl1

Arrays.foldr1

//+ [[a]] -> [a]
Arrays.concat

Arrays.mapIndexed

//+ (a -> b) -> [a] -> [b]
Arrays.lift

//+ a -> [a]
Arrays.unit

//+ [a] -> (a -> [b]) -> [b]
Arrays.bind

//+ [* -> [*]] -> [*] -> [*]
Arrays.foldlBind

//+ [* -> [*]] -> [*] -> [*]
Arrays.foldrBind

//+ Num -> Num -> Num -> [Num]
Arrays.stepRange

//+ Num -> Num -> [Num]
Arrays.range
```
